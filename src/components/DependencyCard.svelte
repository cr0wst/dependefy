<script>
    import {user} from "../stores/user";
    import {navigate} from "svelte-routing";

    let addDependencyType = ''
    let addDependencyName = ''
    let addDependencyVersion = ''
    let addDependencyError = ''

    async function onAddDependency() {
        const res = await fetch("/.netlify/functions/addProjectDependency", {
            method: "POST",
            body: JSON.stringify({
                type: addDependencyType,
                name: addDependencyName,
                version: addDependencyVersion,
                project: ref
            }),
            headers: {
                Authorization: 'Bearer ' + $user.token.access_token,
            }
        })

        if (res.status === 200) {
            navigate('/')
        } else {
            let body = await res.json()
            addDependencyError = body.error
        }
    }

    function onCancelAdding() {
        addDependencyType = ''
        addDependencyName = ''
        addDependencyVersion = ''
        addDependencyError = ''
        isAddingDependency = false
    }

    export let ref
    export let name
    export let description
    export let dependencies
    // Organize dependency by type
    $: reducedDependencies = dependencies.reduce((r, a) => {
        r[a.type] = r[a.type] || []
        r[a.type].push(a)
        return r
    }, Object.create(null))

    let isAddingDependency = false
</script>

<div class="max-w-md mx-auto bg-white rounded-xl border overflow-hidden md:max-w-2xl p-4 mb-2">
    <div class="flex flex-row">
        <div class="text-lg text-purple-800 font-bold w-full">{name}</div>
        {#if dependencies.length > 0}
            {#each Object.keys(reducedDependencies) as type}
                <img src="images/logos/{type}.svg" class="h-4 pr-2 my-auto" alt="{type} logo">
            {/each}
        {/if}
    </div>
    <div class="tracking-wide text-sm flex flex-row">
        {description}
    </div>
    <!-- expanded info -->
    {#if dependencies.length > 0}
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
                        <th>Latest</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each dependencies as dependency}
                        <tr class="border-b">
                            <td><img src="images/logos/{dependency.type}.svg" class="h-2 pr-2 my-auto"
                                     alt="{dependency.type} logo"></td>
                            <td>{dependency.name}</td>
                            <td>{dependency.version}</td>
                            <td>{dependency.latest}</td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            </div>
        </div>
    {/if}
    <div class="pt-2 flex">
        {#if isAddingDependency !== true}
            <button on:click={() => isAddingDependency = true}
                    class="rounded-md text-white bg-purple-800 text-xs font-bold py-1 px-2 mr-auto">
                Add Dependency
            </button>
        {/if}
    </div>
    {#if isAddingDependency}
        <form class="space-y-4" on:submit|preventDefault={onAddDependency}>
            <div class="rounded-md border space-y-px p-2">
                <div class="grid gap-6">
                    {#if addDependencyError}
                        <div class="col-span-12 text-red-500">{addDependencyError}</div>
                    {/if}
                    <div class="col-span-12">
                        <label for="dependency_type" class="block text-sm font-medium text-purple-800">Type</label>
                        <input name="dependency_type" id="dependency_type" bind:value={addDependencyType}
                               class="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"/>
                    </div>
                    <div class="col-span-12">
                        <label for="dependency_name" class="block text-sm font-medium text-purple-800">Name</label>
                        <input name="dependency_name" id="dependency_name" bind:value={addDependencyName}
                               class="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"/>
                    </div>
                    <div class="col-span-12">
                        <label for="dependency_version"
                               class="block text-sm font-medium text-purple-800">Version</label>
                        <input name="dependency_version" id="dependency_version" bind:value={addDependencyVersion}
                               class="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"/>
                    </div>
                </div>
            </div>
            <div>
                <button type="submit"
                        class="group relative justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-800 hover:bg-purple-900">
                    Add
                </button>
                <button on:click={onCancelAdding}
                        class="group relative justify-center py-2 px-4 border border-purple-800 text-sm font-medium rounded-md text-purple-800 bg-white-800">
                    Cancel
                </button>
            </div>
        </form>
    {/if}
</div>