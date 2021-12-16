const {query} = require('./utils/db')
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
    let userExists = await query("select * from users where id = ? limit 1", [user.sub])

    if (!userExists.length) {
        let results = await query ("insert into users (id, email) values (?, ?)", [user.sub, user.email])
        return jsonResponse(200, results)
    }

    return badRequestResponse("User already exists.")
}

async function nonAuthenticatedHandler(event, context) {
    return notAuthorizedResponse()
}