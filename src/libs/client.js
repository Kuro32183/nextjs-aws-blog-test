import { createClient } from 'microcms-js-sdk';

export const client = createClient({
	serviceDomain: "nextjs-aws-app-runner",
    apiKey: process.env.X_MICROCMS_API_KEY,
});