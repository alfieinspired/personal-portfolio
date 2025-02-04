import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { sentryVitePlugin } from '@sentry/vite-plugin';

export default defineConfig({
    plugins: [
        sveltekit(),
        sentryVitePlugin({
            org: "thomass-projects",
            project: "personal-portfolio",
            authToken: process.env.SENTRY_AUTH_TOKEN,
            sourcemaps: {
                assets: "./build/**",
            },
            release: {
                name: process.env.VERCEL_GIT_COMMIT_SHA || 'local-dev',
                create: true,
            }
        })
    ]
});
