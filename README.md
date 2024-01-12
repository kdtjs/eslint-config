# @kdtjs/eslint-config

> My personal ESLint config

## Installation

```bash
pnpm install -D @kdtjs/eslint-config
```

## Usage

### Create an ESLint configuration file:

With `"type": "module"` in your `package.json` (recommended):

```javascript
// eslint.config.js
import { defineFlatConfig } from '@kdtjs/eslint-config'

export default defineFlatConfig()
```

With CJS:

```javascript
// eslint.config.js
const { defineFlatConfig } = require('@kdtjs/eslint-config')

module.exports = defineFlatConfig()
```

## Contributing

If you have suggestions for improving this package or have found a bug,
please [check the contributing guidelines](https://github.com/kdtjs/.github/blob/main/CONTRIBUTING.md) before opening
an issue.

## Credit

This ESLint configuration is inspired by the
excellent [`@antfu/eslint-config`](https://www.npmjs.com/package/@antfu/eslint-config) package. Special thanks to its
contributors!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
