<script>
    import {Route, Router} from "svelte-routing";
    import Main from "./routes/Dashboard.svelte";

    // Used for SSR. A falsy value is ignored by the Router.
    export let url = "";
</script>

<Router url="{url}">
    <!-- component -->
    <nav class="flex w-screen py-2 items-center max-w-5xl mx-auto">
        <!-- logo -->
        <div class="flex-1 flex justify-center mr-auto">
            <img src="images/logo.svg" alt="dependefy logo" class="h-8 my-auto pr-2">
            <span class="font-thin text-xl text-purple-800">depen</span><span class="text-xl text-purple-800">defy</span>
        </div>
        <!-- nav -->
        <div class="flex-1 flex justify-center ml-auto">
            <a href="#" class="bg-purple-800 text-white px-3 py-2 rounded-md text-sm font-medium"
               aria-current="page">New Project</a>
        </div>
    </nav>
    <div class="container pt-2">
        <Route path="/">
            <Main/>
        </Route>
    </div>
    <footer class="items-center mx-auto max-w-5xl text-center w-full p-4 text-sm font-thin">
        <div>Manage dependencies with ease using <span class="font-thin text-purple-800">depen</span><span class="text-purple-800 font-medium">defy</span>.</div>
        <div class="font-thin">Copyright <a class="font-medium" href="https://smcrow.com">Steve Crow</a> {new Date().getFullYear()}</div>
    </footer></Router>

<style global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>