const {query} = require('./utils/db')
const {jsonResponse, notAuthorizedResponse, notFoundResponse} = require('./utils/response')

exports.handler = async function (event, context) {
    const {user} = context.clientContext
    if (user) {
        return authenticatedHandler(event, context, user)
    }

    return nonAuthenticatedHandler(event, context)

}

async function authenticatedHandler(event, context, user) {
    let results = await query("SELECT * FROM users WHERE id = ? LIMIT 1", [user.sub])

    if (results.length) {
        return jsonResponse(200, results[0])
    }

    return notFoundResponse()
}

async function nonAuthenticatedHandler(event, context) {
    return notAuthorizedResponse()
}