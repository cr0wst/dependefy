<script>
    export let name
    export let description
    export let type
    export let dependencies
    let expanded = false
</script>

<div class="max-w-md mx-auto bg-white rounded-xl border overflow-hidden md:max-w-2xl p-4 mb-2">
    <div class="flex flex-row">
        <div class="text-lg text-purple-800 font-bold w-full">{name}</div>
        <img src="images/logos/{type}.svg" class="h-4 pr-2 my-auto" alt="{type} logo">
    </div>
    <div class="tracking-wide text-sm flex flex-row">
        {description}
    </div>
    {#if expanded}
        <!-- expanded info -->
        <div class="pt-2">
            <div class="text-lg text-purple-800 font-bold w-full tracking-wide">Dependencies</div>
            <div class="w-full">
                <table class="min-w-full divide-y divide-gray-200 font-mono text-xs">
                    <thead class="bg-purple-50 px-6 text-left text-xs font-medium tracking-wider">
                    <tr>
                        <th>Name</th>
                        <th>Version</th>
                        <th>Latest</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each dependencies as dependency}
                        <tr class="border-b">
                            <td>{dependency.name}</td>
                            <td>{dependency.version}</td>
                            <td>{dependency.latest}</td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            </div>
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
                    class="rounded-full text-white bg-purple-800 text-xs py-1 px-2 mx-auto w-full">More Info</button>
        </div>
    {/if}
</div>