<div class="max-w-md mx-auto bg-white overflow-hidden md:max-w-2xl p-4 mb-2">
    <form class="space-y-4">
        <div class="rounded-md shadow-sm space-y-px">
            <div class="grid gap-6">
                <div class="col-span-12">
                    <label for="project_name" class="block text-sm font-medium text-purple-800">Project Name</label>
                    <input type="text" name="project_name" id="project_name"
                           class="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                </div>
                <div class="col-span-12">
                    <label for="project_name" class="block text-sm font-medium text-purple-800">Project
                        Description</label>
                    <textarea name="project_name" id="project_description"
                              class="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
                </div>
            </div>
        </div>
        <div>
            <button type="submit"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-800 hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Save
            </button>
        </div>
    </form>
</div>