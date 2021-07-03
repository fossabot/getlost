# It's GetLost Codebase - Release guide

This document should guide you through releasing a new version of the API.

## Prerequisites

Before releasing the APP, make sure that the release's content is tested and in the `main` branch.

Also, wait for the continuous deployment to succeed before releasing it. If not, fix the bug before releasing it.

## Release with [_Vercel CLI_][vercel-cli]

Now, you should be able to release the APP by using the [_Vercel CLI_][vercel-cli]. To do so, run these commands in a
shell:

```shell
vercel login # Login to your Vercel account
vercel --prod # Release the APP
vercel logout # Logout from your account
```

[vercel-cli]: https://vercel.com/cli
