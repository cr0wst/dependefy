<script>
    import {user} from "../stores/user";
    import {navigate} from "svelte-routing";

    let name = ''
    let description = ''
    let error = ''

    let githubRepo

    let importedDependencies = []

    $: canSubmit =
        name && description && importedDependencies.length > 0

    async function getRepositoryDependencies() {
            const res = await fetch("/.netlify/functions/getRepositoryDependencies?url=" + githubRepo, {
                method: "GET"
            })

            if (res.status === 200) {
                importedDependencies = await res.json()
            }
    }

    async function addProject() {
        if (name && description && importedDependencies.length > 0) {
            const res = await fetch("/.netlify/functions/addProject", {
                method: "POST",
                body: JSON.stringify({
                    name, description, dependencies: importedDependencies
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
                <div class="col-span-12">
                    <div class="flex flex-col">
                        <div >
                            <label for="github_repo" class="block text-sm font-medium text-purple-800">GitHub Repository</label>
                        </div>
                        <div class="flex flex-row">
                            <input type="text" name="github_repo" id="github_repo" bind:value={githubRepo}
                                   class="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            <button on:click={getRepositoryDependencies}
                                    class="ml-2 group relative px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-800 hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Import
                            </button>
                        </div>
                    </div>
                    {#if importedDependencies.length > 0}
                        <div class="text-lg text-purple-800 font-bold w-full tracking-wide flex">
                            Dependencies
                        </div>
                        <div class="pt-2">
                            <div class="w-full">
                                <table class="min-w-full divide-y divide-gray-200 font-mono text-xs">
                                    <thead class="bg-purple-50 px-6 text-left text-xs font-medium tracking-wider">
                                    <tr>
                                        <th>Type</th>
                                        <th>Name</th>
                                        <th>Version</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {#each importedDependencies as dependency}
                                        <tr class="border-b">
                                            <td><img src="/images/logos/{dependency.type}.svg" class="h-2 pr-2 my-auto"
                                                     alt="{dependency.type} logo"></td>
                                            <td>{dependency.name}</td>
                                            <td>{dependency.version}</td>
                                        </tr>
                                    {/each}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
        <div class="pt-2">
            <button type="submit" on:click|preventDefault={addProject}
                    class="{canSubmit ? 'border-transparent  text-white bg-purple-800 hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' : 'border bg-white text-gray-darkest cursor-not-allowed' } group relative w-full flex justify-center py-2 px-4 border text-sm font-medium rounded-md">
                Save
            </button>
        </div>
</div>