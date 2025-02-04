import * as Sentry from '@sentry/sveltekit';
import { handleErrorWithSentry, browserTracingIntegration, replayIntegration } from '@sentry/sveltekit';
import { PUBLIC_SENTRY_DSN } from '$env/static/public';

Sentry.init({
    dsn: PUBLIC_SENTRY_DSN,
    tracesSampleRate: 1.0,
    environment: process.env.VERCEL_ENV || 'development',
    release: process.env.VERCEL_GIT_COMMIT_SHA || 'local-dev',
    
    integrations: [
        browserTracingIntegration(),
        replayIntegration({
            maskAllText: false,
            blockAllMedia: false,
        }),
    ],

    replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    replaysOnErrorSampleRate: 1.0,
});

export const handleError = handleErrorWithSentry();
