import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_PUBLIC_CLIENT_ID, // Get this from tina.io
  token: process.env.TINA_TOKEN, // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "./",
  },
  media: {
    tina: {
      mediaRoot: "assets/img",
      publicFolder: "./",
    },
  },
  search: {
    tina: {
      indexerToken: process.env.SEARCH_TOKEN, // Get this from tina.io
      stopwordLanguages: ['eng']
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "_posts",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => {
              return new Date().toISOString().substr(0, 10) + "-" + `${values?.title
                ?.toLowerCase()
                .replace(/ /g, '-')}`
            }
          }
        },
        defaultItem: () => {
          return {
            comments: true,
            date: new Date().toISOString(),
            layout: "post",
          }
        },
        fields: [
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
             type: "string",
             name: "title",
             label: "Title",
             isTitle: true,
             required: true,
          },
          {
            // Short description for sharing/page previews
            type: "string",
            name: "description",
            label: "description"
          },
          {
             type: "rich-text",
             name: "body",
             label: "Body",
             isBody: true,
          },
          {
            type: "string",
            name: "categories",
            label: "categories",
            list: true,
          },
          {
            type: "string",
            name: "layout",
            label: "collection"
          }
          // See https://tina.io/docs/schema/
          // for help modelling your fields
        ],
      },
    ],
  },
});
