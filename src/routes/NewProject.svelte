<script>
    import {auth} from "../stores/user";
    import {navigate} from "svelte-routing";

    let name
    let description
    let error

    $: canSubmit = name && description

    async function createProject() {
        if (name && description) {
            const res = await fetch("/api/createProject", {
                method: "POST",
                body: JSON.stringify({
                    name, description
                }),
                headers: {
                    Authorization: 'Bearer ' + $auth.token.access_token,
                }
            })
            if (res.status === 200) {
                navigate('/')
            } else {
                let body = await res.json()
                error = body.error
            }
        }
    }
</script>
<div class="max-w-md mx-auto bg-white overflow-hidden md:max-w-2xl p-4 mb-2">
        <div class="rounded-md shadow-sm space-y-px">
            <div class="grid gap-6">
                {#if error}
                    <div class="col-span-12 text-red-500">{error}</div>
                {/if}
                <div class="col-span-12">
                    <label for="project_name" class="block text-sm font-medium text-purple-800">Project Name</label>
                    <input type="text" name="project_name" id="project_name" bind:value={name}
                           class="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                </div>
                <div class="col-span-12">
                    <label for="project_description" class="block text-sm font-medium text-purple-800">Project
                        Description</label>
                    <textarea name="project_description" id="project_description" bind:value={description}
                              class="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
                </div>
            </div>
        </div>
        <div class="pt-2">
            <button type="submit" on:click|preventDefault={createProject}
                    class="{canSubmit ? 'border-transparent  text-white bg-purple-800 hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' : 'border bg-white text-gray-darkest cursor-not-allowed' } group relative w-full flex justify-center py-2 px-4 border text-sm font-medium rounded-md">
                Save
            </button>
        </div>
</div>