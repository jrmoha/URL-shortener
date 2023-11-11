import UrlModel, { URL_ } from "../models/url.model";

export const createURL = function (
  shortUrl: string,
  longUrl: string,
  user: string,
): Promise<URL_> {
  return UrlModel.create({
    shortUrl,
    longUrl,
    user,
  });
};

export const getOriginalURL = function (
  SHORT_URL: string,
): Promise<URL_ | null> {
  return UrlModel.findOne({ shortUrl: SHORT_URL });
};
