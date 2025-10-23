declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      NODE_ENV: 'development' | 'production';
      CLOUDFLARE_API_TOKEN: string;
      CLOUDFLARE_ACCOUNT_ID: string;
    }
  }
}