<script>
    import {onMount} from "svelte";
    import {auth} from "../stores/user";

    export let id

    let error
    let projectPromise = fetchProjectData()

    async function fetchProjectData() {
        const res = await fetch(`/api/getProject?id=${id}`, {
            headers: {
                Authorization: 'Bearer ' + $auth.token.access_token,
            }
        })
        const body = await res.json()
        if (res.ok) {
            return body
        }

        throw new Error(`Unable to fetch project ${id}`)
    }
</script>

{#await projectPromise then project}
    <div class="w-full h-full border rounded-md p-2 m-2 flex flex-col">
        <div class="flex text-purple-800 border-b border-purple-800">
            <h1 class="text-2xl w-full">{project.name}</h1>
            <div class="flex ml-auto">
                <button class="text-red-800 border border-red-800 bg-red-200 mr-2 text-sm rounded-md py-1 px-2 mb-2 block my-auto">Delete</button>
            </div>
        </div>
        <div class="text-gray-500 text-sm">
            {project.description}
        </div>
        <div class="flex flex-col pt-2">
            <h1 class="text-xl w-full">Dependencies</h1>
            <table class="table-auto">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Version</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                    <td>Malcolm Lockyer</td>
                    <td>1961</td>
                </tr>
                <tr>
                    <td>Witchy Woman</td>
                    <td>The Eagles</td>
                    <td>1972</td>
                </tr>
                <tr>
                    <td>Shining Star</td>
                    <td>Earth, Wind, and Fire</td>
                    <td>1975</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
{:catch error}
    <div class="bg-red-200 border-red-500 border rounded-md w-3/4 p-2 text-red-500 text-center mx-auto">
    {error.message}
    </div>
{/await}