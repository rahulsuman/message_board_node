const express = require('express'),
  router = express.Router(),
  constantsObj = require('../utils/constant'),
  utility = require('../utils/utility'),
  Response = require('../utils/response'),
  userApi = require('../api/usersApi');


router.post('/register', (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.json(Response(constantsObj.statusCode.BadRequest, "failed", constantsObj.validationMessages.requiredFieldsMissing))
  } else {
    userApi.userRegister(req.body, (err, userResponse) => {
      if (err) {
        res.json(userResponse)
      } else {
        res.json(userResponse)
      }
    });
  }
});

router.post('/login', (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.json(Response(constantsObj.statusCode.BadRequest, "failed", constantsObj.validationMessages.requiredFieldsMissing))
  } else {
    userApi.userLogin(req.body, (err, userResponse) => {
      if (err) {
        res.json(userResponse)
      }
      else {
        res.json(userResponse)
      }
    })
  }
});

router.post('/logout', (req, res, next) => {
  if (!req.body.userId) {
    res.json(Response(constantsObj.statusCode.BadRequest, "failed", constantsObj.validationMessages.requiredFieldsMissing))
  } else {
    userApi.userLogout(req.body, (err, userResponse) => {
      if (err) {
        res.json(userResponse)
      }
      else {
        res.json(userResponse)
      }
    })
  }
});

module.exports = router;
