<script>
    import {fade} from 'svelte/transition'

    export let name
    export let description
    export let dependencies
    let expanded = false
    // Organize dependency by type
    $: reducedDependencies = dependencies.reduce((r, a) => {
        r[a.type] = r[a.type] || []
        r[a.type].push(a)
        return r
    }, Object.create(null))
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
    {#if expanded}
        <!-- expanded info -->
        {#if dependencies.length > 0}
            <div class="text-lg text-purple-800 font-bold w-full tracking-wide flex">
                Dependencies
            </div>
            <div class="pt-2" in:fade={{ duration: 500}}>
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
            <button class="rounded-md text-white bg-purple-800 text-xs font-bold py-1 px-2 mr-auto">
                Add Dependency
            </button>
            <button class="rounded-md text-red-500 border-red-500 border text-xs font-bold py-1 px-2 ml-auto">
                Delete Project
            </button>
        </div>

        <div class="mx-auto w-full pt-2">
            <button on:click={() => expanded = false}
                    class="rounded-full text-purple-800 bg-white border border-purple-800 text-xs py-1 px-2 mx-auto w-full">
                Collapse More Info
            </button>
        </div>
    {:else}
        <div class="mx-auto w-full pt-2">
            <button on:click={() => expanded = true}
                    class="rounded-full text-white bg-purple-800 text-xs py-1 px-2 mx-auto w-full">More Info
            </button>
        </div>
    {/if}
</div>