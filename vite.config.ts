import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),

		Components({
			resolvers: [PrimeVueResolver()],
		}),

		VitePWA({
			registerType: 'autoUpdate',
			outDir: 'dist',
			manifest: {
				name: 'Успеваемость',
				short_name: 'Успеваемость',
				description: 'Приложение для учета успеваемости. Московский Политех.',
				theme_color: '#333',
				icons: [
					{
						src: 'favicon.png',
						sizes: '150x150',
						type: 'image/png',
					},
				],
			},
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
				find: '@stores',
				replacement: fileURLToPath(new URL('./src/stores', import.meta.url)),
			},
			{
				find: '@',
				replacement: fileURLToPath(new URL('./src/', import.meta.url)),
			},
		],
	},
})
