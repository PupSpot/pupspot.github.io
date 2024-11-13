import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  login: handleLogin({
    returnTo: '/',
    authorizationParams: {
      prompt: 'select_account',
      max_age: 0,
    }
  }),
  logout: handleLogout({
    logoutParams: {
      returnTo: process.env.AUTH0_BASE_URL,
      federated: true,
    }
  })
}); 