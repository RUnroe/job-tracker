const clerk = require('@clerk/express');
const { applicationService } = require('../dal/applicationService');


const signInUrl = "https://natural-tick-28.accounts.dev/sign-in";

const configure = (app) => {
  app.get('/application/list', clerk.requireAuth({ signInUrl }), async (req, res) => {
    const { userId } = req.auth;
    const user = await clerk.clerkClient.users.getUser(userId);
    if(user) {
      const applicationList = await applicationService.getAllApplications();
      if(applicationList) {
        return res.json(applicationList);
      }
      else {
        res.status(500).send();
      }
    }
  });

  app.get('/application/:id', clerk.requireAuth({ signInUrl }), async (req, res) => {
    const { userId } = req.auth;
    const user = await clerk.clerkClient.users.getUser(userId);
    if(user) {
      const application = await applicationService.getApplicationById(req.params.id);
      if(application) {
        return res.json(application);
      }
      else {
        res.status(500).send();
      }
    }
  });

  app.post('/application/new', clerk.requireAuth({ signInUrl }), async (req, res) => {
    const { userId } = req.auth;
    const user = await clerk.clerkClient.users.getUser(userId);
    if(user) {
      const newApplicationId = await applicationService.createApplication(req.body, userId);
      if(newApplicationId) {
        return res.json(newApplicationId);
      }
      else {
        res.status(500).send();
      }
    }
  });

  // app.get('/options/technology', clerk.requireAuth({ signInUrl }), async (req, res) => {
  //   const { userId } = req.auth;
  //   const user = await clerk.clerkClient.users.getUser(userId);
    
  //   if(user) {
  //    let technologies = await applicationService.getAllTechnologies();
      // if(technologies) {
      //   return res.json(technologies);
      // }
  //   }
  //   res.status(500).send();
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
    //TODO
    const { userId } = req.auth;
    const user = await clerk.clerkClient.users.getUser(userId);
    return res.json({ user });
  });

  
}

module.exports = { configure };