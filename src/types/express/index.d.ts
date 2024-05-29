export {};

declare global {
  namespace Express {
    export interface Response {
      success(httpStatusCode: number, message: string, data?: any): Response;
    }
  }
}
