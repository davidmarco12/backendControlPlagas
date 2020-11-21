const express = require('express');
const router = express.Router();
const email = require('../components/emails/emailControllers');

router.post('/enviar/', email.enviarEmails);

module.exports = router;