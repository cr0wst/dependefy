<script>
    import {user} from '../stores/user'
    import md5 from 'md5'

    $: avatarUrl = `https://www.gravatar.com/avatar/${md5($user.email)}`
</script>

{#if $user && $user.email}
    <img src="{avatarUrl}" alt="Your profile picture."
         class="my-auto rounded-full h-8 w-8 object-scale-down">
{/if}