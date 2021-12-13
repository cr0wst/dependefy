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
        <div class="text-2xl text-purple-800 font-bold w-full">{name}</div>
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
                            <td>{dependency.latest_version}</td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            </div>
        </div>
    {/if}
</div>