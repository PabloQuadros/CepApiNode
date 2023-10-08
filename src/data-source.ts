import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from "typeorm";

const postgres_port = process.env.POSTGRES_PORT as (number | undefined)

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: postgres_port,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    name: process.env.POSTGRES_NAME,
    entities: [`${__dirname}/**/Entities/Domain/*.{ts,js}`],
    migrations: [`${__dirname}/**/Migrations/*.{ts,js}`],
})