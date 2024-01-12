export default import('./dist/index.js').then((m) => m.defineFlatConfig({}, {
    ignores: ['src/types/rules/**'],
}))
