import "reflect-metadata";
import express from 'express'
import "./Shared/Container";
import { AppDataSource } from './data-source'

AppDataSource.initialize().then(() => {
    const app = express()

    app.use(express.json())

    return app.listen(process.env.PORT)
})