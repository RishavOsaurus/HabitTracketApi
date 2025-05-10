import express from 'express'
import habitsRoutes from './routes/router.js'


const app = express()

app.use(express.json())
app.set('json spaces', 2)


const loggingMiddleware = (req,res,next)=>{
    console.log(`${req.method}- ${req.url}`)
    next()
}

app.use(loggingMiddleware)
app.use('/api', habitsRoutes)

export default app
