<script>
    import DependencyCard from "../components/DependencyCard.svelte";

    const projects = [
        {
            name: "Steve's Gradle Project",
            description: "A sample project for working with gradle.",
            dependencies: [
                {
                    "type": "gradle",
                    "name": "com.nexmo:nexmo-spring-boot-starter",
                    "version": "1.0.0",
                    "latest": "1.1.0"
                },
                {
                    "type": "gradle",
                    "name": "com.nexmo:client",
                    "version": "4.4.0",
                    "latest": "5.6.0"
                }
                ]
        },
        {
            name: "New Project",
            description: "One without dependencies that needs some added",
            dependencies: [
            ]
        },
        {
            name: "Multi-type project",
            description: "Combine multiple types?",
            dependencies: [
                {
                    "type": "gradle",
                    "name": "com.nexmo:nexmo-spring-boot-starter",
                    "version": "1.0.0",
                    "latest": "1.1.0"
                },
                {
                    "type": "gradle",
                    "name": "com.nexmo:client",
                    "version": "4.4.0",
                    "latest": "5.6.0"
                },
                {
                    "type": "npm",
                    "name": "express",
                    "version": "4.17.0",
                    "latest": "4.17.1"
                },
                {
                    "type": "npm",
                    "name": "mongoose",
                    "version": "4.4.10",
                    "latest": "5.1.0"
                },
            ]
        },
        {
            name: "Steve's Node Project",
            description: "A sample project for working with node.",
            dependencies: [
                {
                    "type": "npm",
                    "name": "express",
                    "version": "4.17.0",
                    "latest": "4.17.1"
                },
                {
                    "type": "npm",
                    "name": "mongoose",
                    "version": "4.4.10",
                    "latest": "5.1.0"
                },
                {
                    "type": "npm",
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