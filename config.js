import * as dotenv from 'dotenv';
dotenv.config({ path: `.env`, debug: true });

const server = process.env.AZURE_SQL_SERVER;
const database = process.env.AZURE_SQL_DATABASE;
const user = process.env.AZURE_SQL_USER;
const password = process.env.AZURE_SQL_PASSWORD;
const port = parseInt(process.env.AZURE_SQL_PORT);

export const config = {
    server: server,
    database: database,
    user: user,
    password: password,
    port: port,
    authentication: {
        type : 'default'
    },
    options: {
        encrypt: true,
    }
};