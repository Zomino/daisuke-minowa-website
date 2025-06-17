# Strapi S3 Backend Server

This is a Strapi backend server configured to use Amazon S3 for file uploads.
TS types for the API are auto-generated using `strapi-plugin-gen-types` and output directly into the client folder.

## Environment Variables
Set the following environment variables in the `.env` file or deployment environment:

|Variable|Required|Description|
|-|-|-|
|AWS_ACCESS_KEY_ID|Yes|AWS access key for S3|
|AWS_SECRET_ACCESS_KEY|Yes|AWS secret key for S3|
|AWS_REGION|Yes|AWS region where the S3 bucket is located|
|AWS_BUCKET|Yes|Name of S3 bucket|

**Where these are used:**
- All AWS variables are used in `plugins.ts` to configure the S3 upload provider.
- The CSP is set in `middlewares.ts` to allow the S3 bucket as an image/media source.

**Note**
- Make sure your environment variables are set before starting the server.
- Make sure that your S3 bucket’s CORS and permissions are configured to allow Strapi to upload and fetch files.
- The same bucket will be used for development and production. This is not ideal but the additional setup is not worth it for such a simple app.

## Type Generation
- The `strapi-plugin-gen-types` plugin is enabled.
- It outputs generated TypeScript types to `../client/src/genTypes` (relative to the server folder).
