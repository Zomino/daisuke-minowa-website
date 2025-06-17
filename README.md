# Daisuke Minowa Potfolio Website

This is a full stack web application that serves as a portfolio website for my father, Daisuke Minowa, enabling him to showcase his artwork and exhibitions.
It has been built with a Next.js frontend and a Strapi backend.

## Stack
- [![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
    - Chosen over Gatsby to allow for more dynamic features in the future.
    - The Vercel free tier makes deployment hassle-free and is more than sufficient for the scale of this application.
    - The Next Image component provides great image optimization.
- [![Strapi](https://img.shields.io/badge/Strapi-2E7EEA?logo=strapi&logoColor=white)](https://strapi.io/)
    - Allows my father to manage his own artwork and content through a user-friendly admin panel, without requiring me to make code changes for every update.
    - Strapi Cloud also has a generous free tier.
    - The Strapi upload plugin auto-generates optimized image sizes for different screen sizes, which can be used as placeholders when using Next.js image (for improved perceived loading speed).
    - Has great plugins such as `strapi-plugin-gen-types`, that can be used to output auto-generated API types directly into the client folder.
- [![Amazon S3](https://img.shields.io/badge/Amazon%20S3-569A31?logo=amazon-aws&logoColor=white)](https://aws.amazon.com/s3/)
    - Free storage for images.
- [![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
    - Probably overkill for such a small project, but I wanted to learn how to use it!
- [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
- [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## Environment Variables
Set the following environment variables in the `.env` file or deployment environment:

|Variable|FE requires|BE requires|Description|
|-|-|-|-|
|AWS_ACCESS_KEY_ID|No|Yes|AWS access key for S3|
|AWS_SECRET_ACCESS_KEY|No|Yes|AWS secret key for S3|
|AWS_REGION|Yes|Yes|AWS region where the S3 bucket is located|
|AWS_BUCKET|Yes|Yes|Name of S3 bucket|

**Note**
- Make sure your environment variables are set before starting the servers.
- Make sure that your S3 bucket’s CORS and permissions are configured to allow Strapi to upload and fetch files.
- The same S3 bucket will be used for development and production. This is not ideal but the additional setup is not worth it for such a simple application.

## Resources
- [Getting started with Strapi Client](https://docs.strapi.io/cms/api/client)
- [How to use `strapi-plugin-gen-types`](https://market.strapi.io/plugins/strapi-plugin-gen-types)
- [How to set up S3 as storage or Strapi](https://strapi.io/blog/how-to-set-up-amazon-s3-upload-provider-plugin-for-our-strapi-app)
- [How to use the Next.js Image component](https://www.youtube.com/watch?v=IU_qq_c_lKA)
- [Net Ninja's Framer Motion tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iHDnQfTHEVVceOEBsOf07i)
- [Next.js Image placeholder issue](https://github.com/vercel/next.js/issues/42140)
