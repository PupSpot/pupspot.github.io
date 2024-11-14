import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default handleAuth({
  login: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handleLogin(req, res, {
        returnTo: '/',
        authorizationParams: {
          prompt: 'login',
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  }
});

