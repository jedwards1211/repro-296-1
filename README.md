# Bug repro

For https://github.com/openai/openai-node/issues/296 and https://github.com/openai/openai-node/issues/297

Repro steps:

1. `yarn`
1. `yarn deploy` (accept all default prompts)
1. add the `OPENAI_API_KEY` env var to your vercel project's settings
1. visit the provided URL in a browser, enter text in textbox, press enter
1. check logs in Vercel, observe… no error…
1. but when you hit `/api/route` in a browser:
```
Error: Cannot find module '/var/task/node_modules/openai/_shims/agent-node.js'
    at createEsmNotFoundErr (node:internal/modules/cjs/loader:1098:15)
    at finalizeEsmResolution (node:internal/modules/cjs/loader:1091:15)
    at trySelf (node:internal/modules/cjs/loader:543:12)
    at Module._resolveFilename (node:internal/modules/cjs/loader:1054:24)
    at /var/task/node_modules/next/dist/server/require-hook.js:110:36
    at Module._load (node:internal/modules/cjs/loader:922:27)
    at Module.require (node:internal/modules/cjs/loader:1143:19)
    at Hook._require.Module.require (/var/task/___vc/__launcher.js:2147:38)
    at require (node:internal/modules/cjs/helpers:121:18)
    at Object.<anonymous> (/var/task/node_modules/openai/core.js:63:17) {
  code: 'MODULE_NOT_FOUND',
  path: '/var/task/node_modules/openai/package.json'
}
Error: Cannot find module '/var/task/node_modules/openai/_shims/agent-node.js'
    at createEsmNotFoundErr (node:internal/modules/cjs/loader:1098:15)
    at finalizeEsmResolution (node:internal/modules/cjs/loader:1091:15)
    at trySelf (node:internal/modules/cjs/loader:543:12)
    at Module._resolveFilename (node:internal/modules/cjs/loader:1054:24)
    at /var/task/node_modules/next/dist/server/require-hook.js:110:36
    at Module._load (node:internal/modules/cjs/loader:922:27)
    at Module.require (node:internal/modules/cjs/loader:1143:19)
    at Hook._require.Module.require (/var/task/___vc/__launcher.js:2147:38)
    at require (node:internal/modules/cjs/helpers:121:18)
    at Object.<anonymous> (/var/task/node_modules/openai/core.js:63:17) {
  code: 'MODULE_NOT_FOUND',
  path: '/var/task/node_modules/openai/package.json'
}
RequestId: 75c4da57-a2ca-4e49-be57-77069f06fea9 Error: Runtime exited with error: exit status 1
Runtime.ExitError
```
