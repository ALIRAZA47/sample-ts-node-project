require('dotenv').config() // Load environment variables from .env file
require('./utils/logger') // Load logger
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
// const { passportRegistry } = require('./config/b2c/auth/registery')
import {connectDB} from './config/database'
import api from './controllers'
import {errorHandler, notFound} from './middlewares/exceptionHandler'
import authenticationMiddleware from './middlewares/authentication'
// import helmet from 'helmet'

const app = express()
// Setup Mongo
connectDB()

mongoose.connection.once('open', function () {
    // All OK - fire (emit) a ready event.
    app.emit('ready')
})

//Setup Swagger
const swaggerUi = require('swagger-ui-express')

const swaggerDocument = require('../swagger.json')

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'))
}
// app.use(helmet())
app.use(
    cors({
        origin: process.env.ALLOWED_ORIGINS,
    })
)
app.use(express.json())

// app.use((req, res, next) => {
//     let log
//     log = Logger.child({ req_at: Date.now() }, true)
//     res.on('finish', () => log.info({ req, res }))
//     next()
// })
// Passport registry

// app.use(passportRegistry.initialize())
// Auth Middleware before routes to check each route

//  app.use(authenticationMiddleware)
// Controllers
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api/v1', authenticationMiddleware, api)

// // End Controllers
// //Middlewares
app.use(notFound)
app.use(errorHandler)
//End Middlewares

if (process.env.NODE_ENV !== 'test') {
    const port = process.env.PORT || 3000
    app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Listening: http://localhost:${port}`)
    })
}

export default app
