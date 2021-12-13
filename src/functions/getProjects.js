const db = require('./utils/db')

const GET_PROJECTS_FOR_USER_QUERY = "SELECT p.id, p.name, p.description FROM projects p JOIN users u ON p.owner = u.id WHERE u.email = $1"
const GET_DEPENDENCIES_FOR_PROJECT_QUERY = "SELECT pd.name, pd.version, pd.type, (SELECT ld.version from dependencies ld WHERE ld.name = pd.name ORDER BY ld.created_at DESC LIMIT 1) as latest_version FROM project_dependencies pd WHERE pd.project = $1"

exports.handler = async function (event, context) {
    const {user} = context.clientContext

    if (user) {
        const results = await db.query(GET_PROJECTS_FOR_USER_QUERY, [user.email])

        const projects = []
        // Iterate over projects to unpack dependencies
        for (let project of results.rows) {
            const dependencyResults = await db.query(GET_DEPENDENCIES_FOR_PROJECT_QUERY, [project.id])
            projects.push(
                {
                    id: project.id,
                    name: project.name,
                    description: project.description,
                    dependencies: dependencyResults.rows
                }
            )
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