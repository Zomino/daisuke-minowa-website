import { strapi } from '@strapi/client';

// This URL has been hardcoded as it had to be hardcoded in the Next JS config anyway.
const client = strapi({ baseURL: `https://graceful-peace-347db111aa.strapiapp.com/api` });

export default client;
