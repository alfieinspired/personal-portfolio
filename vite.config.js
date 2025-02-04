import { sentrySvelteKit } from "@sentry/sveltekit";
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sentrySvelteKit({
        sourceMapsUploadOptions: {
            org: "thomass-projects",
            project: "personal-portfolio"
        }
    }), sveltekit()],
	server: {
		fs: {
			allow: ['..']
		}
	}
});