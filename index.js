import express from 'express'
import dotenv from 'dotenv'
import { recipesRoutes } from './routes/recipesRouter.js'
import { ingredientsRoutes } from './routes/ingredientsRouter.js'
import { categoriesRoutes } from './routes/categoriesRouter.js'
import { quantityRoutes } from './routes/quantityRouter.js'
import { usersRoutes } from './routes/usersRouter.js'
import { authRoutes } from './routes/authRouter.js'
import errorHandler from './middlewares/errorHandler.js'
import cors from 'cors'
import { expressjwt as jwt } from 'express-jwt'
dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors({
  origin: '*'
}))

app.use(
  jwt({
    secret: process.env.SECRET_KEY,
    algorithms: ['HS256']
  }).unless({ path: ['/api/auth/login', '/api/auth/refresh', '/api/auth/register'] })
)

app.use('/api', authRoutes(), recipesRoutes(), ingredientsRoutes(), categoriesRoutes(), quantityRoutes(), usersRoutes())

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})
