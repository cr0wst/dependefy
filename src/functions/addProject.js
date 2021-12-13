const db = require('./utils/db')
const uuid = require('uuid')
exports.handler = async function (event, context) {
    const {user} = context.clientContext

    if (user) {
        console.log(user.email)
        const request = JSON.parse(event.body)
        // Get Owner
        let ownerResult = await db.query("SELECT id FROM users WHERE email = $1", [user.email])
        console.table(ownerResult)
        if (ownerResult.rowCount > 0) {
            let owner = ownerResult.rows[0].id
            console.log("OWNER: " + owner)
            // Insert Project
            let projectId = uuid.v4()
            console.log(projectId)
            db.query("INSERT INTO projects(id, name, description, owner) VALUES ($1, $2, $3, $4)", [
                    projectId, request.name, request.description, owner
                ]
            )

            // Insert Project Dependencies
            for (let dependency of request.dependencies) {
                const results = await db.query("INSERT INTO project_dependencies (project, name, version, type) VALUES ($1, $2, $3, $4)",
                    [
                        projectId,
                        dependency.name,
                        dependency.version,
                        dependency.type,
                    ])
            }
        }

        return {
            statusCode: 200,
            body: ""
        }
    } else {
        return {
            statusCode: 403,
            body: "Not authorized"
        }
    }
}