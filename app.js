import express from 'express'
import habitsRoutes from './routes/router.js'


const app = express()

app.use(express.json())
app.set('json spaces', 2)

app.use('/api', habitsRoutes)

export default app
