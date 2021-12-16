<script>
    import DependencyCard from "./DependencyCard.svelte";
    import {auth} from '../stores/user'
    import {projects} from "../stores/projects";
    import {onMount} from "svelte";

    onMount(async () => {
        const response = await fetch('/api/listProjects', {
            headers: {
                Authorization: 'Bearer ' + $auth.token.access_token,
            }
        })

        projects.set(await response.json())
    })
</script>

<h1 class="text-2xl">Your Projects</h1>
<div class="flex flex-col">
    {#each $projects as project}
        <DependencyCard name="{project.name}" description="{project.description}" id="{project.id}"/>
    {/each}
</div>