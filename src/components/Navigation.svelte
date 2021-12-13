<script>
    import {Link, navigate} from "svelte-routing";
    import {user} from '../stores/user'
    import netlifyIdentity from "netlify-identity-widget";

    import Avatar from "./Avatar.svelte";

    $: isLoggedIn = !!$user

    const onSignOut = () => {
        netlifyIdentity.logout()
        navigate('/')
    }
</script>

<nav class="flex items-center justify-between flex-wrap p-6">
    <!-- logo -->
    <div class="flex items-center flex-shrink-0">
        <Link to="/">
            <div class="flex-1 flex">
                <img src="/images/logo.svg" alt="dependefy logo" class="h-8 my-auto pr-2">
                <span class="font-thin text-xl text-purple-800">depen</span><span
                    class="text-xl text-purple-800">defy</span>
            </div>
        </Link>
    </div>

    <!-- Links -->
    <!-- User Section -->

    <div class="flex justify-center">
        {#if isLoggedIn}
            <Link to="project/new"
                  class="text-purple-800 my-auto p-1 border px-2 rounded-md border-purple-800 text-sm mr-2 hover:bg-purple-800 hover:text-white">
                + New
                Project
            </Link>
            <button on:click={onSignOut}
                    class="text-purple-800 my-auto p-1 border px-2 rounded-md border-purple-800 text-sm mr-2 hover:bg-purple-800 hover:text-white">
                Sign Out
            </button>
            <Avatar/>
        {/if}
    </div>
</nav>