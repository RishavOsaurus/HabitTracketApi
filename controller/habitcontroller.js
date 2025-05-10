import path from "path";
import { readJsonFile, writeJsonFile , sendError} from "../utils/utils.js";
const dataPath = path.resolve("data", "habits.json");

export const getHabits = async (req, res) => {
  try {
    const habits = await readJsonFile(dataPath);
    const { completed, frequency } = req.query;

    let filtered = habits;

    if (completed !== undefined) {
      filtered = filtered.filter((h) => String(h.completed) === completed);
    }

    if (frequency !== undefined) {
      filtered = filtered.filter(
        (h) => h.frequency.toLowerCase() === frequency.toLowerCase()
      );
    }

    res.status(200).json(filtered);
  } catch (err) {
    sendError(res, err);
  }
};

export const createHabits = async (req, res) => {
  try {
    const habits = await readJsonFile(dataPath);
    const { name, description, frequency, completed } = req.body;

    const newId = habits.length > 0 ? parseInt(habits[habits.length - 1].id) + 1 : 1;
    const newHabit = { id: newId, name, description, frequency, completed };

    habits.push(newHabit);
    await writeJsonFile(dataPath, habits);

    res.status(201).send({ habit: newHabit, msg: "Created Successfully" });
  } catch (err) {
    sendError(res, err);
  }
};

export const editHabits = async (req, res) => {
  try {
    const habits = await readJsonFile(dataPath);
    const { name, description, frequency, completed } = req.body;
    const { id } = req.params;

    const habitIndex = habits.findIndex((h) => h.id == parseInt(id));
    if (habitIndex === -1) {
      return sendError(res, new Error("Habit not found"), 404);
    }

    if (req.method === "PATCH") {
      habits[habitIndex] = {
        ...habits[habitIndex],
        name: name ?? habits[habitIndex].name,
        description: description ?? habits[habitIndex].description,
        frequency: frequency ?? habits[habitIndex].frequency,
        completed: completed ?? habits[habitIndex].completed,
      };
    } else if (req.method === "PUT") {
      habits[habitIndex] = {
        id: habits[habitIndex].id,
        name,
        description,
        frequency,
        completed,
      };
    }

    await writeJsonFile(dataPath, habits);
    res.status(200).json({ msg: "Successful", habit: habits[habitIndex] });
  } catch (err) {
    sendError(res, err);
  }
};
