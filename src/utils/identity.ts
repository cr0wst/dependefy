import netlifyIdentity from 'netlify-identity-widget'

import {user} from '../stores/user'

netlifyIdentity.on('init', u => {
    user.set(u)
})

netlifyIdentity.on('logout', () => {
    user.set(null)
})

netlifyIdentity.on('login', u => {
    user.set(u)
    netlifyIdentity.close()
})

netlifyIdentity.init()