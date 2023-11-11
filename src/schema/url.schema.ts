import { TypeOf, object, string } from "zod";
import config from "config";

export const createURLSchema = object({
  body: object({
    API_KEY: string({
      required_error: "API_KEY is required in order to shorten the URL",
    }),
    URL: string({
      required_error: "URL is Required",
    })
      .url({
        message: "This URL is Invalid",
      })
      .max(
        config.get<number>("URL_MAX_LENGTH"),
        "This Length of URL is Invalid",
      ),
  }),
});

export const getURLSchema = object({
  params: object({
    SHORT_URL: string({
      required_error: "URL is Required",
    }).max(
      config.get<number>("SHORT_URL_MAX_LENGTH"),
      "This Length of URL is Invalid",
    ),
  }),
});

export type CreateURLInput = TypeOf<typeof createURLSchema>["body"];
export type GetURLInput = TypeOf<typeof getURLSchema>["params"];
