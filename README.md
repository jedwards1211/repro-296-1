# Bug repro

For https://github.com/openai/openai-node/issues/296 and https://github.com/openai/openai-node/issues/297

Repro steps:

1. `yarn`
1. `yarn deploy` (accept all default prompts)
1. add the `OPENAI_API_KEY` env var to your vercel project's settings
1. visit the provided URL in a browser, enter text in textbox, press enter
1. check logs in Vercel, observe:

```
- info Loaded env from /var/task/.env
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/var/task/node_modules/openai/_shims/agent-node.mjs' imported from /var/task/node_modules/openai/core.mjs
    at new NodeError (node:internal/errors:405:5)
    at finalizeResolution (node:internal/modules/esm/resolve:329:11)
    at moduleResolve (node:internal/modules/esm/resolve:992:10)
    at moduleResolveWithNodePath (node:internal/modules/esm/resolve:936:12)
    at defaultResolve (node:internal/modules/esm/resolve:1178:79)
    at nextResolve (node:internal/modules/esm/loader:163:28)
    at ESMLoader.resolve (node:internal/modules/esm/loader:835:30)
    at ESMLoader.getModuleJob (node:internal/modules/esm/loader:424:18)
    at ModuleWrap.<anonymous> (node:internal/modules/esm/module_job:77:40)
    at link (node:internal/modules/esm/module_job:76:36) {
  code: 'ERR_MODULE_NOT_FOUND'
}
```
