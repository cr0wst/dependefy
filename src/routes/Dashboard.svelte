<script>
    import DependencyCard from "../components/DependencyCard.svelte";
    import {user} from '../stores/user'
    import {onMount} from "svelte";

    let projects = []
    onMount(async () => {
        const response = await fetch('/.netlify/functions/getProjects', {
            headers: {
                Authorization: 'Bearer ' + $user.token.access_token,
            }
        })
        projects = await response.json()
    })
</script>

<div class="px-2 sm:px-6 lg:px-8">
    {#each projects as project}
        <DependencyCard name="{project.name}" description="{project.description}"
                        dependencies="{project.dependencies}" ref="{project.ref}"/>
    {/each}
</div>