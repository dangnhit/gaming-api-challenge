declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_DB: string;
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
    STORAGE_BUCKET: string;
    REGION: string;
  }
}
