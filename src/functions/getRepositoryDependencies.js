const axios = require("axios");
exports.handler = async function (event, context) {
    // url = https://github.com/sveltejs/svelte
    const githubUrl = event.queryStringParameters.url

    let [owner, repo] = githubUrl.replace("http://github.com/", "").replace("https://github.com/", "").split('/')

    const url = `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/package-lock.json`

    try {
        let response = await axios.get(url)
        switch (response.data.lockfileVersion) {
            case 1: {
                let dependencies = Object.keys(response.data.dependencies).filter(x => x !== "").map((key) => {
                    let dependency = response.data.dependencies[key]
                    if (dependency.version) {
                        return {
                            name: key,
                            version: dependency.version,
                            type: 'npm'
                        }
                    }
                })

                return {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    statusCode: 200,
                    body: JSON.stringify(dependencies)
                }
            }
            case 2: {
                let dependencyKeys = []
                if (response.data.packages[""] && response.data.packages[""].dependencies) {
                    dependencyKeys.push(...Object.keys(response.data.packages[""].dependencies))
                }

                if (response.data.packages[""] && response.data.packages[""].devDependencies) {
                    dependencyKeys.push(...Object.keys(response.data.packages[""].devDependencies))
                }

                console.table(dependencyKeys)
                let dependencies = dependencyKeys.map((key) => {
                    let dependency = response.data.packages[`node_modules/${key}`]
                    if (dependency.version) {
                        return {
                            name: key,
                            version: dependency.version,
                            type: 'npm'
                        }
                    }
                }).filter(x => x !== null)

                return {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    statusCode: 200,
                    body: JSON.stringify(dependencies)
                }
            }
            default: {
                return {
                    statusCode: 400,
                    body: `Package Lock version ${response.data.lockfileVersion} is not supported. Supported versions: 1,2`
                }
            }
        }

    } catch (err) {
        if (err.response && err.response.status > 0) {
            return {
                statusCode: err.response.status,
                body: "Problem fetching package-lock.json."
            }
        }

        return {
            statusCode: 500,
            body: err
        }
    }
}