---
title: Maintenance
description: Maintainer documentation
tags:
  - Development
sidebar_position: 2
---

# Maintenance

## How to release

Running `npm version v2.0.1` will produce a release commit and tag it as `v2.0.1`, following this step, you need to push branch HEAD and tag directly to `master` (not using PR). Don't forget to manually tag the `en` branch after master has been automerged to it, pull its latest state and tag `git tag v2.0.1-en`, then push tag upstream as well. Pushing tags should automatically build docker image for each tag and publish them in registry.

