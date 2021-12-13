const faunadb = require('faunadb')

const {Map, Paginate, Match, Get, Lambda, Index} = faunadb.query

const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
})

/**
 * This function queries the dependencies collection to get all dependencies by type. The dependencies collection always
 * gives the latest dependency.
 *
 * @param event
 * @param context
 * @returns {Promise<{body: string, statusCode: number}>}
 */
exports.handler = async function (event, context) {
    const type = event.queryStringParameters.type
    if (type) {
        let dependenciesRef = await client.query(
            Map(
                Paginate(
                    Match(Index("dependencies_by_type"), type)
                ),
                Lambda(ref => Get(ref))
            )
        )

        const dependencies = dependenciesRef.data.map(p => p.data)

        return {
            statusCode: 200,
            body: JSON.stringify(dependencies)
        }
    } else {
        return {
            statusCode: 400,
            body: "Type is required"
        }
    }
}