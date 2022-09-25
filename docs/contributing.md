---
id: contributing
title: Improve Docs
tags:
  - contributing
  - getting started
sidebar_position: 3
---

# Contributing to Docs

:::info
For contributing as developer, see [Developer resources](./dev/contributing).
:::

We welcome contributions to this documentation. Our documentation is built using [Docusaurus](https://docusarus.io), a powerful open source documentation project written in JavaScript. All development and communication for this documentation resources takes place in this [GitHub repository](https://github.com/pastvu/docs).

Contributors are expected to adhere to the [code of conduct](./dev/code-of-conduct).

If you are new to contributing to open source project, you may find [this
guide](https://docs.github.com/en/get-started/quickstart/contributing-to-projects)
useful.

## Get Involved

Anyone can get involved with, and add to, this documentation - you don't have to be a developer. Here are a few ideas to get started:

- Fix typos and grammatical errors
- Document PastVu functionality of your choice
- Check existing issues on GitHub
- Raise issues in GitHub for features which need to be documented.

## Development

It's easy to get your development environment set up and if you plan to contribute regularly to our documentation, then we recommend you setup a [local development environment](#local-installation) for the best results.

### Online setup

You can also try using the new github.dev feature. While you are browsing any file, changing the domain name from github.com to github.dev will turn your browser into an online editor. You can start making changes and send pull requests right away.

### Local installation

To set up a local development environment we recommend install [NVM](https://github.com/nvm-sh/nvm), and then running:

```console
nvm install
npm i -g yarn
yarn
```

To start development server run:

```console
yarn start
```

The start command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

