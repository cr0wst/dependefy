const jsonResponse = (code, body) => {
    return {
        statusCode: code,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
    }
}

const badRequestResponse = (message) => {
    return jsonResponse(400, {
        message
    })
}

const notFoundResponse = () => {
    return jsonResponse(404, {
        message: "The requested resource was not found."
    })
}

const notAuthorizedResponse = () => {
    return jsonResponse(401, {
        message: "You are not authorized to access this resource."
    })
}

const unsupportedMethodResponse = (method) => {
    return jsonResponse(405, {
        message: `This endpoint does not support ${method}.`
    })
}

module.exports = {jsonResponse, notAuthorizedResponse, unsupportedMethodResponse, badRequestResponse, notFoundResponse}