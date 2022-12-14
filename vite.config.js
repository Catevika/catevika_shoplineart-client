import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	server: {
		proxy: {
			'/api': {
				target: 'https://shoplineart-api.onrender.com',
				changeOrigin: true
			}
		}
	},
	plugins: [react()]
});
