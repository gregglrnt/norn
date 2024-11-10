import eslintPluginSvelte from 'eslint-plugin-svelte';
export default [
  ...eslintPluginSvelte.configs['flat/recommended'],
  {
    rules: {
      // override/add rules settings here, such as:
      // 'svelte/rule-name': 'error'
    }
  }
];