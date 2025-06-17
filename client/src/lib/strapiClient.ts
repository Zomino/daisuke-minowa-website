import { strapi } from '@strapi/client';

const client = strapi({ baseURL: `${process.env.STRAPI_BASE_URL || 'http://localhost:1337'}/api` });

export default client;
