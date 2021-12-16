const {query} = require('./utils/db')
const {v4} = require('uuid')
const {jsonResponse, notAuthorizedResponse, unsupportedMethodResponse, badRequestResponse, notFoundResponse} = require('./utils/response')

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
    console.log("Here")
    if (event.queryStringParameters.id) {
        let results = await query("select id,owner,name,description from projects where id = ? and owner = ?", [event.queryStringParameters.id, user.sub])

        if (results.length > 0) {
            return jsonResponse(200, results[0])
        }
        return notFoundResponse()
    }

    return badRequestResponse("id is required.")
}

async function nonAuthenticatedHandler(event, context) {
    return notAuthorizedResponse()
}