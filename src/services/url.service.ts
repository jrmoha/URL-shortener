import UrlModel, { URL } from "../models/url.model";

export const createURL = function (
  shortUrl: string,
  longUrl: string,
  user: string,
): Promise<URL> {
  return UrlModel.create({
    shortUrl,
    longUrl,
    user,
  });
};

export const getOriginalURL = function (
  SHORT_URL: string,
): Promise<URL | null> {
  return UrlModel.findOne({ shortUrl: SHORT_URL });
};
