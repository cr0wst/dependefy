const mysql = require('mysql')

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'dependefy',
    ssl: true
})


module.exports = {
    query: (query, params) => {
        return new Promise((resolve, reject) => {
            pool.query(query, params, (error, elements) => {
                if (error) {
                    return reject(error)
                }

                return resolve(elements)
            })
        })
    }
}