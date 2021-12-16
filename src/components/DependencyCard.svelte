<script>
    import {navigate} from "svelte-routing";

    export let name
    export let description
    export let id
    export let dependencies = []

    $: total = dependencies.length + Math.floor(Math.random()*4)
    $: outOfDateTotal = dependencies.length + Math.min(total,Math.floor(Math.random()*4))
</script>

<div class="w-full h-full border rounded-md p-2 m-2 flex flex-col"
     on:click={() => navigate(`/projects/${id}`)}>
    <div class="flex text-purple-800 border-b border-purple-800">
        <h1 class="text-2xl w-full">{name}</h1>
    </div>
    <div class="text-gray-500 text-sm">
        {description}
    </div>
    <div class="flex ml-auto">
        <div class="text-purple-800 border border-purple-800 bg-purple-200 mr-2 text-sm rounded-md py-1 px-2 block my-auto">
            {total} {total === 1 ? 'Dependency' : 'Dependencies' }
        </div>
        {#if outOfDateTotal}
            <div class="text-red-800 border border-red-800 bg-red-200 mr-2 text-sm rounded-md py-1 px-2 block my-auto">
                {outOfDateTotal} Outdated Dependencies
            </div>
        {/if}
    </div>
</div>