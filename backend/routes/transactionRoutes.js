const authenticateUser = require('../middleware/authenticateUser');
const transactionController = require('../controllers/transactionController');
const express = require('express');
const router = express.Router();

router.use(authenticateUser);
router.get('/',transactionController.getAllTransactions);
router.get('/:transactionId',transactionController.getTransactionById);
router.get('/user/summary',transactionController.getSummaryTransactions);
router.post('/',transactionController.createTransaction);
router.patch('/:transactionId', transactionController.updateTransaction);
router.delete('/:transactionId', transactionController.deleteTransaction);

module.exports = router;
