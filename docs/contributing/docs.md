---
title: Improve Docs
tags:
  - contributing
  - getting started
---

# Improve Docs

We welcome contributions to this documentation. Our documentation is built using [Docusaurus](https://docusaurus.io), a powerful open source documentation project written in JavaScript. All development and communication for this documentation resources takes place in this [GitHub repository](https://github.com/pastvu/docs).

Contributors are expected to adhere to the [code of conduct](./code-of-conduct).

If you are new to contributing to open source project, you may find [this
guide](https://docs.github.com/en/get-started/quickstart/contributing-to-projects)
useful.

By contributing to this documentation, you agree that your contributions will be licensed under a [Creative Commons Attribution 4.0 International license](https://creativecommons.org/licenses/by/4.0/) (CC-BY 4.0).

## Get Involved

Anyone can get involved with, and add to, this documentation - you don't have to be a developer. Here are a few ideas to get started:

- Fix typos, grammatical errors or improve anything that sounds confusing or incomplete. You can click "Edit this page" at the bottom of most docs, which takes you to the GitHub interface to make and propose changes
- Check existing documentation issues on GitHub
- Raise issues in GitHub for features which need to be documented.
- Document existing PastVu functionality as user manual or developer resource.
- Translate documentation

You may find useful information at Docusaurus [Markdown Features](https://docusaurus.io/docs/markdown-features) section.

## Development

It's easy to get your development environment set up and if you plan to contribute regularly to our documentation, then we recommend you setup a [local development environment](#local-installation) for the best results.

### Online setup

You can also try using the new `github.dev` feature. While you are browsing any file, changing the domain name from `github.com` to `github.dev` will turn your browser into an online editor. You can start making changes and send pull requests right away.

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

The start command builds your website locally and serves it through a development server, ready for you to view at `http://localhost:3000`.

## i18n

Docusarus is configured to support multiple locales. Currently Englsh and Russian languages are supported. English is the main language, documents in English are organised the standard way (as in single-language website), e.g. documents are located under the subroute `docs/` and pages are at subroute `src/pages/`.

Russian translations are located at locale subdirs, for documents
this will be `i18n/ru/docusaurus-plugin-content-docs/current` and for pages `i18n/ru/docusaurus-plugin-content-pages`.

:::info
Organising documents this way allows to fallback to English version of the page when
Russian translation is missing.
:::

In order to make document appear in the page sidebar, the file should be added at default location (`docs/`). In this case the same document will be shown at both `en` and `ru` locales. To add the Russian translation, copy it to the matching destination at `i18n/ru/docusaurus-plugin-content-docs/current` and translate. For example, to translate `docs/dev/setup.md`, one need to make a copy:
```
cp docs/dev/setup.md i18n/ru/docusaurus-plugin-content-docs/current/dev/setup.md
```

:::caution
We only copy .md and .mdx files, as React pages are translated through JSON translation files.
:::

### Starting dev server for specific locale

Use `--locale` param with start script, i.e. to start server using Russian
locale run:

```
yarn start --locale ru
```

or for English:

```
yarn start --locale en
```
:::info
Starting server without locale param will run server in default locale per `defaultLocale` configuration setting - this is currently `ru`.
:::

## Pull Requests

Please make sure the following is done when submitting a pull request:

1. **Keep your PR small** - make sure the PR changes belong to the same scope, otherwise please split them.
2. **Use descriptive titles** - you may use [commit message style](#semantic-commit-messages) for PR titles too.
3. **Test your changes** - unless this is something trivial or changes existing text, makes sure you tested it in local dev server.

All pull requests should be opened against the `main` branch.

When PR is created, our integration systems will run automated tests to guard against mistakes. The maintainers will review your code, once PR is merged CI system will deploy them to documentation resources website.

### Semantic Commit Messages

Please follow commit messages format:

`<scope> (<locale>): <subject>`


`<locale>` is optional. `<scope>` reflects the area of chnage, e.g. `style`, `docs`, `pages`, `config`, etc. For example:

```
docs en: Add information about multilanguage support
```

