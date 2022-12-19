import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			'/api': {
				target: 'https://shoplineart-api.onrender.com',
				changeOrigin: true,
				secure: false
			}
		},
		rewrites: [
			{
				source: '(.*)',
				destination: '/index.html'
			}
		]
	},
	plugins: [react()]
});
