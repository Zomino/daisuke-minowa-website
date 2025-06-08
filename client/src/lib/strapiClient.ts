import { strapi } from '@strapi/client';

import { STRAPI_BASE_URL } from '@config/env';

// The NEXT_PUBLIC prefix is used to expose the environment variable to the client-side code.
const client = strapi({ baseURL: `${STRAPI_BASE_URL}/api` });

export default client;
