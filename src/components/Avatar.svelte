<script>
    import {auth} from '../stores/user'
    import md5 from 'md5'

    let avatarUrl

    $: if($auth && $auth.email) {
        avatarUrl =  `https://www.gravatar.com/avatar/${md5($auth.email)}`
    }
</script>

{#if avatarUrl}
    <img src="{avatarUrl}" alt="Your profile picture." class="my-auto rounded-full h-8 w-8 object-scale-down">
{/if}