const clerk = require('@clerk/express');
const { applicationService } = require('../dal/applicationService');


const signInUrl = "https://natural-tick-28.accounts.dev/sign-in";

const configure = (app, dbClient) => {
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

  // app.get('/options/technology', clerk.requireAuth({ signInUrl }), async (req, res) => {
  //   const { userId } = req.auth;
  //   const user = await clerk.clerkClient.users.getUser(userId);
    
  //   if(user) {
  //     let technologies = await applicationService.getAllTechnologies();
  //     return res.json(technologies);
  //   }
  //   return res.status(404).send();
  // });

  app.get('/options/technology', async (req, res) => {
    
      let technologies = await applicationService.getAllTechnologies();
      if(technologies) {
        return res.json(technologies);
      }
      else {
        res.status(500).send();
      }
    
  });

  app.get('/application/statistics', clerk.requireAuth({ signInUrl }), async (req, res) => {
    const { userId } = req.auth;
    const user = await clerk.clerkClient.users.getUser(userId);
    return res.json({ user });
  });

  
}

module.exports = { configure };