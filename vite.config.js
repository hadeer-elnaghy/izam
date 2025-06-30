import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import fs from 'fs';

const env = loadEnv('all', process.cwd());

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    // server: {
    //     host: true,
    //     port: env.VITE_ASSET_PORT,
    //     strictPort: true,
    //     hmr: {
    //         host: env.VITE_ASSET_HOST,
    //         port: env.VITE_ASSET_PORT,
    //     },
    //     https: {
    //         key: fs.readFileSync(env.VITE_PRIVKEY_PATH),
    //         cert: fs.readFileSync(env.VITE_CERT_PATH),
    //     },
    // }
    build: {
        outDir: 'public/build',
        emptyOutDir: true,
        manifest: true,
      },
      base: '/build/', // VERY IMPORTANT
});