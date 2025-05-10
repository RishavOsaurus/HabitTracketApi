import { validationResult } from 'express-validator';


export const expVal=  (req,res,next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).send({errors: errors.array()})
        }
        next()
    }

export const readJsonFile = async (filePath) => {
  try {
    let fileData = await fs.readFile(filePath, "utf-8");
    if (fileData.trim() === "") return [];
    return JSON.parse(fileData);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
};

export const writeJsonFile = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};


export const sendError = (res, err, statusCode = 500) => {
  res.status(statusCode).send({ error: [{ msg: err.message }] });
};
