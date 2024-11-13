import { handleAuth, handleLogout } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

export default handleAuth({
  logout: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handleLogout(req, res, {
        returnTo: process.env.AUTH0_BASE_URL,
        logoutParams: {
          federated: 'true'
        }
      });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).end('Internal Server Error');
    }
  },
});