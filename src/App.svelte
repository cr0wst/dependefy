<script>
    import {Link, Route, Router} from "svelte-routing";
    import Main from "./routes/Dashboard.svelte";
    import NewProject from "./routes/NewProject.svelte";

    // Used for SSR. A falsy value is ignored by the Router.
    export let url = "";
</script>

<Router url="{url}">
    <!-- component -->
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
            <Link to="project/new"
                  class="text-purple-800 my-auto p-1 border px-2 rounded-md border-purple-800 text-sm mr-2 hover:bg-purple-800 hover:text-white">+ New
                Project
            </Link>
            <img src="/images/avatar-example.png" alt="Your profile picture."
                 class="my-auto rounded-full h-8 w-8 object-scale-down">
        </div>
    </nav>
    <div class="container pt-2">
        <Route path="/">
            <Main/>
        </Route>
        <Route path="project/new">
            <NewProject/>
        </Route>
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