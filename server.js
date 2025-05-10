import express from 'express'
import path from 'path'
import fs from 'fs/promises'

const app = express()
app.use(express.json())
app.set('json spaces', 2)
const PORT = process.env.PORT

app.listen(PORT,()=>{
console.log(`Working on Port 3000`)
})

const dataPath = path.resolve('data', 'habits.json');

app.get("/api/habits",async(req,res) =>{
    const fileData = await fs.readFile(dataPath,"utf-8")
    const habits = JSON.parse(fileData)
    const {completed,frequency}= req.query
    let filtered = habits
    
    if(completed!== undefined){
        filtered = filtered.filter(h=> String(h.completed)===completed)
    }
    if(frequency !== undefined){
        filtered = filtered.filter(h=>h.frequency.toLowerCase()===frequency.toLowerCase())
    }

    res.status(200).send(filtered)
})