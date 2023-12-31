import "reflect-metadata";
import express from 'express'
import "./Shared/Container";
import { AppDataSource } from './data-source'
import routes from './routes'

AppDataSource.initialize().then(() => {
    const app = express()

    app.use(express.json())

    app.use(routes)
    return app.listen(process.env.PORT)
})