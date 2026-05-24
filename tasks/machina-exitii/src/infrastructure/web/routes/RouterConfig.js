const express = require('express');
module.exports = (controller) => {
  const router = express.Router();
  router.post('/api/v1/enterprise/validate', (req, res) => controller.handle(req, res));
  return router;
};
