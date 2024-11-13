import { initAuth0 } from '@auth0/nextjs-auth0';

export const auth0 = initAuth0({
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  secret: process.env.AUTH0_SECRET,
  session: {
    absoluteDuration: 24 * 60 * 60,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      domain: process.env.NODE_ENV === "production" ? "your-domain.com" : "localhost",
    }
  },
}); 