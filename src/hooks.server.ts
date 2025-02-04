import * as Sentry from '@sentry/sveltekit';
import { handleErrorWithSentry } from '@sentry/sveltekit';
import { SENTRY_DSN } from '$env/static/private';

Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 1.0,
    environment: process.env.VERCEL_ENV || 'development',
    release: process.env.VERCEL_GIT_COMMIT_SHA || 'local-dev',
});

export const handle = async ({ event, resolve }) => {
    try {
        return await resolve(event);
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const handleError = handleErrorWithSentry();
