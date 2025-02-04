import { sveltekit } from '@sveltejs/kit/vite';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        sveltekit(),
        process.env.NODE_ENV === 'production' &&
            sentryVitePlugin({
                org: "thomass-projects",
                project: "personal-portfolio",
                authToken: process.env.SENTRY_AUTH_TOKEN,
                sourcemaps: {
                    assets: "./build/**",
                }
            })
    ]
});
