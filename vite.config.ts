import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),

		Components({
			resolvers: [PrimeVueResolver()],
		}),
	],
	resolve: {
		alias: [
			{
				find: '@models',
				replacement: fileURLToPath(new URL('./src/models', import.meta.url)),
			},
			{
				find: '@services',
				replacement: fileURLToPath(new URL('./src/services', import.meta.url)),
			},
			{
				find: '@components',
				replacement: fileURLToPath(
					new URL('./src/components', import.meta.url)
				),
			},
			{
				find: '@layouts',
				replacement: fileURLToPath(new URL('./src/layouts', import.meta.url)),
			},
			{
				find: '@assets',
				replacement: fileURLToPath(new URL('./src/assets', import.meta.url)),
			},
			{
				find: '@styles',
				replacement: fileURLToPath(new URL('./src/styles', import.meta.url)),
			},
			{
				find: '@',
				replacement: fileURLToPath(new URL('./src/', import.meta.url)),
			},
		],
	},
})
