
class APIError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}


export const createCustomError = function (msg: string, code: number) {
  return new APIError(msg, code);
};

export default APIError;
