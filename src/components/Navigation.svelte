<script>
    import {Link, navigate} from "svelte-routing";
    import {auth} from '../stores/user'
    import netlifyIdentity from "netlify-identity-widget";

    import Avatar from "./Avatar.svelte";

    $: isLoggedIn = !!$auth

    const onSignOut = () => {
        netlifyIdentity.logout()
        navigate('/')
    }
</script>

<nav class="flex items-center justify-between w-1/2 mx-auto py-6">
    <!-- logo -->
    <div class="flex items-center flex-shrink-0 w-1/4">
        <Link to="/">
            <div class="flex-1 flex">
                <img src="/images/logo.svg" alt="dependefy logo" class="h-8 my-auto pr-2">
                <span class="font-thin text-xl text-purple-800">depen</span><span
                    class="text-xl text-purple-800">defy</span>
            </div>
        </Link>
    </div>

    <!-- Links -->
    {#if isLoggedIn}
        <div class="flex flex-row w-1/2">
            <div class="flex flex-row w-3/4">
                <Link to="/"
                      class="text-purple-800 border-purple-800 hover:bg-purple-800 hover:text-white my-auto p-1 border-b px-2 text-sm mr-2">
                    Dashboard
                </Link>
                <Link to="/profile"
                      class="text-purple-800 my-auto p-1 border-b px-2 border-purple-800 text-sm mr-2 hover:bg-purple-800 hover:text-white">
                    Profile
                </Link>

            </div>
            <!-- Right Links -->
            <div class="flex flex-row w-1/4">
                <Link to="project/new"
                      class="text-purple-800 my-auto p-1 border px-2 rounded-md border-purple-800 text-sm mr-2 hover:bg-purple-800 hover:text-white">
                    New Project
                </Link>
            </div>
        </div>
    <!-- User Section -->
        <div class="flex flex-row w-1/4">
            <div class="text-gray-500 text-right p-1 my-auto text-sm flex flex-col">
                <div>
                    Hello <span class="font-bold">{$auth.user_metadata.full_name}</span>
                </div>
                <div class="text-xs font-thin">{$auth.email}</div>
            </div>

            <button on:click={onSignOut}
                    class="text-purple-800 my-auto p-1 border px-2 rounded-md border-transparent text-sm mr-2 hover:bg-purple-800 hover:text-white">
                Sign Out
            </button>
            <Avatar/>
        </div>
    {/if}
</nav>