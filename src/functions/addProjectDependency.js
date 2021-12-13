const faunadb = require('faunadb')

const {Create, Collection, Paginate, Map, Match, Index, Lambda, Get, Exists} = faunadb.query

const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = async function (event, context) {
    const {user} = context.clientContext

    if (user) {
        let dependency = JSON.parse(event.body)
        console.table(dependency)
        if (dependency.name && dependency.version && dependency.project && dependency.type) {
            // Check to see if user owns project
            let projectRef = await client.query(
                Paginate(Match(Index("projects_by_owner"), user.email))
            )
            let projectIds = projectRef.data.map(p => p.id)
            console.log(projectIds)
            if (!projectIds.includes(dependency.project)) {
                return {
                    statusCode: 403,
                    body: "Not authorized"
                }
            }
            console.table(projectRef.data)

            // Check to see if we need to fetch the latest
            let latest = await client.query(Exists(Match(Index("dependencies_by_name"), dependency.name)))

            if (!latest) {
                console.log()
                await client.query(Create(
                    Collection("dependencies"),
                    {
                        data: {
                            name: dependency.name,
                            version: dependency.version,
                            type: dependency.type
                        }
                    }
                ))
            }

            // Just a standard add
            let result = await client.query(Create(
                Collection("project_dependencies"),
                {
                    data: {
                        project: dependency.project,
                        name: dependency.name,
                        version: dependency.version
                    }
                }
            ))

            return {
                statusCode: 200,
                body: JSON.stringify(result)
            }
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({error: "All fields are required."})
            }
        }
    } else {
        return {
            statusCode: 403,
            body: "Not authorized"
        }
    }
}