---
title: Contributing
tags:
  - contributing
  - getting started
sidebar_position: 4
---

# Contributing

:::info
For contributing to this documentation, see [Improve docs](./contributing/docs).
:::

We are grateful to the PastVu users community for adding photos and discussing
them, helping to identify locations, improving information accuracy, taking
resposibility by moderating uploaded content.

The are many more ways one can get involved:

* [Discuss the project or share an idea](https://github.com/PastVu/pastvu/discussions)
* [Report a bug](https://github.com/PastVu/pastvu/issues/new?labels=Bug) or
  help to triage existing ones.
* [Propose a new feature](https://github.com/PastVu/pastvu/issues/new?labels=Feature%20Request)
* [Improve documentation](./contributing/docs)

Before reporting a bug or suggesting a feature, it might be a good idea to search if it has been
reported already.

If you think you have found a security issue, please email at support@pastvu.com.

## Code of Conduct

We expect all project participants to follow [code of conduct](./contributing/code-of-conduct)

## Development

We welcome any keen developer in helping us building the better PastVu! Any
contributions are welcome, no matter how big or small.

### Process

All development takes place in [PastVu GitHub repository](https://github.com/PastVu/pastvu), allowing the repository tools to be used for issue tracking, pull requests, testing and release management.

All pull requests are checked by the continuous integration system which has a range of unit tests, style and lint tests, build tests.

### Where to start

If you are new to Open Source contributions, you may find those guides
useful:

* [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
* [GitHub manual on contributing to projects](https://docs.github.com/en/get-started/quickstart/contributing-to-projects)

If you've not contributed to PastVu before and would like to do so, the good starting point is a list of [good first
issues](https://github.com/PastVu/pastvu/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22),
each of them is relatively simple and will help you to familiarise with a
code. If you have questions, you may ask them in the issue comments, or in
[discussion board](https://github.com/PastVu/pastvu/discussions).

### Local Setup

You will need a local development environment to start work on the project,
see [Getting started](/dev/setup) development manual for details.

### Pull Requests

Please make sure the following is done when submitting a pull request:

1. **Keep your PR small** - make sure the PR changes belong to the same scope, otherwise please split them.
2. **Use descriptive commit message subjects** - keep it short and focused, if more details needed write them in commit message body.
3. **Test your changes** - make sure you tested changes on local dev server.

All pull requests should be opened against the `master` branch.

When PR is created, our integration systems will run automated tests to guard against mistakes. The maintainers will review your code, once PR is merged CI system will deploy them to documentation resources website.

### Licensing

By contributing to PastVu, you agree that your contributions will be licensed under its [AGPLv3+](https://github.com/pastvu/pastvu/blob/master/COPYING) license. We are using simplified copyright header per Linux Foundation [guidelines](https://www.linuxfoundation.org/blog/blog/copyright-notices-in-open-source-software-projects) and single line license delcaration. The following header should be present in all code files (except third-party source code, e.g. libraries):

```js
/**
 * Copyright: The PastVu contributors.
 * GNU Affero General Public License v3.0+ (see COPYING or https://www.gnu.org/licenses/agpl.txt)
 */
```

