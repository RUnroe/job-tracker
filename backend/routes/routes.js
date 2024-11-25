const clerk = require('@clerk/express');


const signInUrl = "https://natural-tick-28.accounts.dev/sign-in";

const configure = (app) => {
  app.get('/application/list', clerk.requireAuth({ signInUrl }), async (req, res) => {
    const { userId } = req.auth;
    const user = await clerk.clerkClient.users.getUser(userId);
    return res.json({ user });
  });

  app.get('/application/:id', clerk.requireAuth({ signInUrl }), async (req, res) => {
    const { userId } = req.auth;
    const user = await clerk.clerkClient.users.getUser(userId);
    return res.json({ user });
  });

  app.post('/application/new', clerk.requireAuth({ signInUrl }), async (req, res) => {
    const { userId } = req.auth;
    const user = await clerk.clerkClient.users.getUser(userId);
    return res.json({ user });
  });

  app.get('/options/technology', clerk.requireAuth({ signInUrl }), async (req, res) => {
    const { userId } = req.auth;
    const user = await clerk.clerkClient.users.getUser(userId);
    return res.json({ user });
  });

  app.get('/application/statistics', clerk.requireAuth({ signInUrl }), async (req, res) => {
    const { userId } = req.auth;
    const user = await clerk.clerkClient.users.getUser(userId);
    return res.json({ user });
  });

  
}

module.exports = { configure };