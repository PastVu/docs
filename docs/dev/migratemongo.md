---
title: Database Migration
description: Making changes in the database
tags:
  - Development
  - mongodb
---

# Database Migration

We are using [`migrate-mongo`](https://github.com/seppevs/migrate-mongo) database migration tool. Its CLI commands have npm script aliases for convenience of running in docker environment:

* `migrate:create` - alias for `migrate-mongo create`
* `migrate:status` - alias for `migrate-mongo status`
* `migrate:up` - alias for `migrate-mongo up`
* `migrate:down` - alias for `migrate-mongo down`
* `migrate` - alias for `migrate:up` script

When upgrading manually in compose environment use:

```
docker compose run --rm app npm run migrate:status
```
This will bring up all app dependencies (mongoDb container) and execute
required command.

Worker instance applies all pending upgrades automatically when
starting.

In order to create new migration, run `migrate-mongo create
<name_of_migration>`, this will create a file in `./migrations` directory
which needs to be amended according to requirements. For examples please refer
to existing migrations or `migrate-mongo` documentation.

