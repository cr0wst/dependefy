import netlifyIdentity from 'netlify-identity-widget'

import {auth, user} from '../stores/user'

netlifyIdentity.on('logout', () => {
    auth.set(null)
    user.set(null)
})

netlifyIdentity.on('login', async u => {
    auth.set(u)
    user.set(await createOrRetrieveUser(u))
    netlifyIdentity.close()
})

netlifyIdentity.init()

async function createOrRetrieveUser(u) {
    let request = await fetch("/api/getUserInfo", {
        headers: {
            Authorization: 'Bearer ' + u.token.access_token,
        }
    })

    if (request.status == 404) {
        let createRequest = await fetch("/api/createUser", {
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + u.token.access_token,
            }
        })

        return await createRequest.json()
    } else {
        return await request.json()
    }
}