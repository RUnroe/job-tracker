const clerk = require('@clerk/express');
const { applicationService } = require('../dal/applicationService');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const signInUrl = "https://natural-tick-28.accounts.dev/sign-in";

const configure = (app) => {
  app.get('/api/application/list', clerk.requireAuth({ signInUrl }), jsonParser, async (req, res) => {
    const { userId } = req.auth;
    const user = await clerk.clerkClient.users.getUser(userId);
    if(user) {
      const applicationList = await applicationService.getAllApplications(userId);
      if(applicationList) {
        return res.json(applicationList);
      }
      else {
        res.status(500).send();
      }
    }
  });

 

  app.post('/api/application/new', clerk.requireAuth({ signInUrl }), jsonParser, async (req, res) => {
    const { userId } = req.auth;
    const user = await clerk.clerkClient.users.getUser(userId);
    if(user) {
      const newApplicationId = await applicationService.createApplication(req.body?.application, userId);
      if(newApplicationId) {
        return res.json(newApplicationId);
      }
      else {
        res.status(500).send();
      }
    }
  });

  app.put('/api/application/:id', clerk.requireAuth({ signInUrl }), jsonParser, async (req, res) => {
    const { userId } = req.auth;
    const user = await clerk.clerkClient.users.getUser(userId);
    //Only allow updating applications the user owns
    if(user && userId === req.body?.application?.userId) {
      const newApplicationId = await applicationService.updateApplication(req.params.id, req.body?.application);
      if(newApplicationId) {
        return res.json(newApplicationId);
      }
      else {
        res.status(500).send();
      }
    }
  });

  

  app.get('/api/options/technology', async (req, res) => {
    
      let technologies = await applicationService.getAllTechnologies();
      if(technologies) {
        return res.json(technologies);
      }
      else {
        res.status(500).send();
      }
    
  });

  app.get('/api/application/statistics', clerk.requireAuth({ signInUrl }), jsonParser, async (req, res) => {

    const { userId } = req.auth;
    const user = await clerk.clerkClient.users.getUser(userId);
    if(user) {
      const applicationList = await applicationService.getAllApplications(userId);
      if(applicationList) {
        let statistics = {
          totalApplications: applicationList.length,
          currentMonth: applicationList.filter(app => {
            let dateCreated = new Date(app.dateApplied);
            let today = new Date();
            return ( dateCreated.getFullYear() === today.getFullYear()
                    && dateCreated.getMonth() === today.getMonth());
          }).length,
          lastMonth: applicationList.filter(app => {
            let dateCreated = new Date(app.dateApplied);
            let lastMonth = new Date();
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            console.log(( dateCreated.getFullYear(), lastMonth.getFullYear(), " |||||| ", dateCreated.getMonth(), (lastMonth.getMonth())))
            return ( dateCreated.getFullYear() === lastMonth.getFullYear()
                    && dateCreated.getMonth() === (lastMonth.getMonth()));
          }).length,
        }
        return res.json(statistics);
      }
      else {
        res.status(500).send();
      }
    }
  });


  app.get('/api/application/:id', clerk.requireAuth({ signInUrl }), jsonParser, async (req, res) => {
    const { userId } = req.auth;
    const user = await clerk.clerkClient.users.getUser(userId);
    if(user) {
      const application = await applicationService.getApplicationById(req.params.id, userId);
      if(application) {
        return res.json(application);
      }
      else {
        res.status(500).send();
      }
    }
  });

  
}

module.exports = { configure };