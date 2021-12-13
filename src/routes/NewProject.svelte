<script>
    import {user} from "../stores/user";
    import {navigate} from "svelte-routing";

    let name = ''
    let description = ''
    let error = ''

    async function onAddProject() {
        const res = await fetch("/.netlify/functions/addProject", {
            method: "POST",
            body: JSON.stringify({
                name, description
            }),
            headers: {
                Authorization: 'Bearer ' + $user.token.access_token,
            }
        })

        if (res.status === 200) {
            navigate('/')
        } else {
            let body = await res.json()
            error = body.error
        }
    }
</script>
<div class="max-w-md mx-auto bg-white overflow-hidden md:max-w-2xl p-4 mb-2">
    <form class="space-y-4" on:submit|preventDefault={onAddProject}>
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
                    <label for="project_name" class="block text-sm font-medium text-purple-800">Project
                        Description</label>
                    <textarea name="project_name" id="project_description" bind:value={description}
                              class="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
                </div>
            </div>
        </div>
        <div>
            <button type="submit"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-800 hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Save
            </button>
        </div>
    </form>
</div>