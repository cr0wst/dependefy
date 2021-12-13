const { Pool } = require('pg')

const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
}