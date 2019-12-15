const express = require('express'),
  router = express.Router(),
  constantsObj = require('../utils/constant'),
  Response = require('../utils/response'),
  messageApi = require('../api/messageApi');

router.post('/addmessage', (req, res, next) => {
  if (!req.body.body || !req.body.userId) {
    res.json(Response(constantsObj.statusCode.BadRequest, "failed", constantsObj.validationMessages.requiredFieldsMissing))
  } else {
    messageApi.addMessage(req.body, (err, response) => {
      if (err) {
        res.json(response)
      } else {
        res.json(response)
      }
    });
  }
});

router.post('/deleteMessage', (req, res, next) => {
  if (!req.body.messageId) {
    res.json(Response(constantsObj.statusCode.BadRequest, "failed", constantsObj.validationMessages.requiredFieldsMissing))
  } else {
    messageApi.deleteMessage(req.body, (err, response) => {
      console.log('response', response)
      if (err) {
        res.json(response)
      } else {
        res.json(response)
      }
    });
  }
});

router.post('/reply', (req, res, next) => {
  if (!req.body.from || !req.body.text || !req.body.messageId) {
    res.json(Response(constantsObj.statusCode.BadRequest, "failed", constantsObj.validationMessages.requiredFieldsMissing))
  } else {
    messageApi.addReply(req.body, (err, response) => {
      if (err) {
        res.json(response)
      } else {
        res.json(response)
      }
    });
  }
});

router.get('/showMessage/:userId', (req, res, next) => {
  if (!req.params.userId) {
    res.json(Response(constantsObj.statusCode.BadRequest, "failed", constantsObj.validationMessages.requiredFieldsMissing))
  } else {
    messageApi.showMessage(req.params, (err, response) => {
      if (err) {
        res.json(response)
      } else {
        res.json(response)
      }
    });
  }
});

router.get('/showMessageAdmin', (req, res, next) => {
  messageApi.showMessageAdmin('', (err, response) => {
    if (err) {
      res.json(response)
    } else {
      res.json(response)
    }
  });
});

router.post('/deleteMessagebyAdmin', (req, res, next) => {
  if (!req.body.messageId) {
    res.json(Response(constantsObj.statusCode.BadRequest, "failed", constantsObj.validationMessages.requiredFieldsMissing))
  } else {
    messageApi.deleteMessagebyAdmin(req.body, (err, response) => {
      if (err) {
        res.json(response)
      } else {
        res.json(response)
      }
    });
  }
});

module.exports = router;