<script>
    import DependencyCard from "../components/DependencyCard.svelte";

    const projects = [
        {
            name: "Steve's Gradle Project",
            type: "gradle",
            description: "A sample project for working with gradle.",
            dependencies: [
                {
                    "name": "com.nexmo:nexmo-spring-boot-starter",
                    "version": "1.0.0",
                    "latest": "1.1.0"
                },
                {
                    "name": "com.nexmo:client",
                    "version": "4.4.0",
                    "latest": "5.6.0"
                }
                ]
        },
        {
            name: "Steve's Node Project",
            type: "npm",
            description: "A sample project for working with node.",
            dependencies: [
                {
                    "name": "express",
                    "version": "4.17.0",
                    "latest": "4.17.1"
                },
                {
                    "name": "mongoose",
                    "version": "4.4.10",
                    "latest": "5.1.0"
                },
                {
                    "name": "underscore",
                    "version": "1.8.3",
                    "latest": "1.8.3"
                }
            ]
        }
    ]
</script>

<div class="px-2 sm:px-6 lg:px-8">
    <!-- with dependencies open -->
    {#each projects as project}
        <DependencyCard name="{project.name}" description="{project.description}" type="{project.type}"
                        dependencies="{project.dependencies}"/>
    {/each}
</div>