import { sveltekit } from '@sveltejs/kit/vite';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: "jsdom",
		setupFiles: ["tests/setuptest.ts"],
		globals: true,
		exclude: [
			...configDefaults.exclude,
			'src/animation/*'
		]
	},
	// server: {
	// 	hmr: false
	// }
});
