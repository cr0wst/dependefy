const faunadb = require('faunadb')

const {Create, Collection} = faunadb.query

const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = async function (event, context) {
    const {user} = context.clientContext

    if (user) {
        let project = JSON.parse(event.body)
        if (project.name && project.description) {
        let result = await client.query(Create(
            Collection("projects"),
            {
                data: {
                    owner: user.email,
                    name: project.name,
                    description: project.description
                }
            }
        ))
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }} else {
            return {
                statusCode: 400,
                body: JSON.stringify({error: "Name and description are required."})
            }
        }
    } else {
        return {
            statusCode: 403,
            body: "Not authorized"
        }
    }
}