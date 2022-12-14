import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			'/api': {
				target: 'http://shoplineart-api/',
				changeOrigin: true,
				secure: false
			}
		}
	},
	plugins: [react()]
});
