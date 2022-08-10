# inalone neocities blog

This is the repository for the Hugo-generated inalone neocities blog.

## build + push
This will build and push to neocities as a git pre-push step. Requirements for this are hugo and neocities CLI (https://neocities.org/cli).

```sh
printf '#!/bin/sh\nneocities push public' >.git/hooks/pre-push && \
chmod u+x .git/hooks/pre-push
```
