<script>
    import './utils/identity'

    import {Route, Router} from "svelte-routing";
    import NewProject from "./routes/NewProject.svelte";
    import Navigation from "./components/Navigation.svelte";
    import {user} from "./stores/user";
    import netlifyIdentity from "netlify-identity-widget";
    import Home from "./routes/Home.svelte";
    import Project from "./routes/Project.svelte";

    // Used for SSR. A falsy value is ignored by the Router.
    export let url = "";

    const onSignIn = () => {
        netlifyIdentity.open('login')
    }

    $: isLoggedIn = !!$user
</script>

<Router url="{url}">
    <Navigation location="{location}"/>

    <div class="w-1/2 mx-auto">
        {#if isLoggedIn}
            <Route path="/" component="{Home}"/>
            <Route path="projects/:id" component="{Project}"/>
            <Route path="projects/new" component="{NewProject}"/>
        {:else}
            <div class="flex max-w-md flex-col mx-auto bg-white overflow-hidden md:max-w-2xl p-4 mb-2">
                <div class="font-thin text-4xl w-full text-center mx-auto content-center p-6">
                    Register or Sign In to Continue
                </div>

                <div class="flex flex-row w-full block items-center justify-center">
                    <button on:click={onSignIn}
                            class="text-purple-800 my-auto p-1 border px-2 rounded-md border-purple-800 text-sm mr-2 hover:bg-purple-800 hover:text-white">
                        Sign In
                    </button>
                    <button
                            class="text-purple-800 my-auto p-1 border px-2 rounded-md border-purple-800 text-sm mr-2 hover:bg-purple-800 hover:text-white">
                        Register
                    </button>
                </div>
            </div>
        {/if}
    </div>
    <footer class="items-center mx-auto max-w-5xl text-center w-full p-4 text-sm font-thin">
        <div>Manage dependencies with ease using <span class="font-thin text-purple-800">depen</span><span
                class="text-purple-800 font-medium">defy</span>.
        </div>
        <div class="font-thin">Copyright <a class="font-medium" href="https://smcrow.com">Steve
            Crow</a> {new Date().getFullYear()}</div>
    </footer>
</Router>

<style global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>