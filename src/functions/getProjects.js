const faunadb = require('faunadb')

const {Map, Paginate, Match, Get, Lambda, Index, Join} = faunadb.query

const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = async function (event, context) {
    const {user} = context.clientContext

    if (user) {
        // Get project refs by owner
        let projectDocuments = await client.query(
            Map(
                Paginate(
                    Match(Index("projects_by_owner"), user.email),
                ),
                Lambda(ref => Get(ref))
            )
        )

        const projects = []
        for (let project of projectDocuments.data) {
            // Get a project's dependencies
            // TODO: Figure out how to do this _in_ faunadb
            let projectDependencies = await client.query(
                Map(
                    Paginate(
                        Match(Index("project_dependencies_by_project_ref"), project.ref.id)
                    ),
                    Lambda(ref => Get(ref))
                )
            )
            // TODO: This too or we're going to blow through our query numbers
            const dependencies = []
            for (let dependency of projectDependencies.data) {
                let latest = await client.query(
                    Get(
                        Match(Index("dependencies_by_name"), dependency.data.name)
                    )
                )

                dependencies.push({
                    name: dependency.data.name,
                    version: dependency.data.version,
                    latest: latest.data.version,
                    type: latest.data.type
                })
            }
            let joinedProject = {
                ref: project.ref.id,
                name: project.data.name,
                description: project.data.description,
                dependencies: dependencies
            }

            projects.push(joinedProject)
        }

        return {
            statusCode: 200,
            body: JSON.stringify(projects)
        }
    } else {
        return {
            statusCode: 403,
            body: "Not authorized"
        }
    }
}