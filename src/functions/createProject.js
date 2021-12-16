const {query} = require('./utils/db')
const {v4} = require('uuid')
const {jsonResponse, notAuthorizedResponse, unsupportedMethodResponse, badRequestResponse} = require('./utils/response')

exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') {
        return unsupportedMethodResponse(event.httpMethod)
    }

    const {user} = context.clientContext
    if (user) {
        return authenticatedHandler(event, context, user)
    }

    return nonAuthenticatedHandler(event, context)
}

async function authenticatedHandler(event, context, user) {
    let body = JSON.parse(event.body)
    if (body && body.name && body.description) {
        let id = v4()

        await query("insert into projects (id, owner, name, description) values (?, ?, ?, ?)", [id, user.sub, body.name, body.description])

        return jsonResponse(200)
    }

    return badRequestResponse("Project name and description are required.")
}

async function nonAuthenticatedHandler(event, context) {
    return notAuthorizedResponse()
}