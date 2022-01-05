
const { Client } = require('pg')


const client = new Client({
    user: 'postgres',
    password: "durga123",
    host: 'localhost',
    port: 5432,
    database: "primaryDB"

})
async function dbconnector(fastify, options) {
    try {
        await client.connect()
        console.log("database connected")
        fastify.decorate('db', { client })

    } catch (err) {
        console.log(err)
    }
}
module.exports = dbconnector;