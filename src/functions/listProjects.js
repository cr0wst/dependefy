const {query} = require('./utils/db')
const {v4} = require('uuid')
const {jsonResponse, notAuthorizedResponse, unsupportedMethodResponse, badRequestResponse} = require('./utils/response')

exports.handler = async function (event, context) {
    if (event.httpMethod !== 'GET') {
        return unsupportedMethodResponse(event.httpMethod)
    }

    const {user} = context.clientContext
    if (user) {
        return authenticatedHandler(event, context, user)
    }

    return nonAuthenticatedHandler(event, context)
}

async function authenticatedHandler(event, context, user) {
    let results = await query("select id,owner,name,description from projects where owner = ?", [user.sub])

    return jsonResponse(200, results)
}

async function nonAuthenticatedHandler(event, context) {
    return notAuthorizedResponse()
}