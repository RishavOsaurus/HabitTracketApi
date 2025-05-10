import path from 'path'
import fs from 'fs/promises'
const dataPath = path.resolve('data', 'habits.json')
console.log(dataPath)
export const getHabits = async (req, res) => {
  try {
    const fileData = await fs.readFile(dataPath, 'utf-8')
    const habits = JSON.parse(fileData)

    const { completed, frequency } = req.query
    let filtered = habits

    if (completed !== undefined) {
      filtered = filtered.filter(h => String(h.completed) === completed)
    }

    if (frequency !== undefined) {
      filtered = filtered.filter(h => h.frequency.toLowerCase() === frequency.toLowerCase())
    }

    res.status(200).json(filtered)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: [{msg: err.message}] })
  }
}

export const createHabits = async(req,res)=>{
  try{
  let fileData = '[]'
  try{
  fileData = await fs.readFile(dataPath,"utf-8")
    if(fileData.trim()=== '')
      fileData= '[]'
}
catch(err){
    return res.status(500).send({error: [{msg: err.message}]})
}
let habits = JSON.parse(fileData)
const {name,description,frequency,completed} = req.body
const newId=habits.length>0 ? parseInt(habits[habits.length - 1].id)+1 : 1
console.log(newId)
const newHabit = {
    id:   newId,
    name,
    description,
    frequency,
    completed
}
habits.push(newHabit)
await fs.writeFile(dataPath,JSON.stringify(habits,null,2))
res.status(201).send({habit: newHabit,msg: "Created Successfully"})
  }
  catch(err){
    res.status(500).send({error: [{msg: err.message}]})
  }
}