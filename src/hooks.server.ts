import * as Sentry from '@sentry/node';
import { SENTRY_DSN } from '$env/static/private';

Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV
});

export const handle = async ({ event, resolve }) => {
    try {
        return await resolve(event);
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};
