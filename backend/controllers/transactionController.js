const httpStatusCode  = require('../constants/httpStatusCode');
const Transaction = require('../models/Transaction');
const helper = require('../helper/util');
const HttpError = require("../models/httpError");


const getAllTransactions = async(req, res, next) => {
    const userId = req.userData.userId;
    const transactions = await Transaction.findAll({where: {userId}})
    if (!transactions || transactions?.length === 0) return next( new HttpError('No transactions found !!', httpStatusCode.NOT_FOUND));
    res.status(httpStatusCode.OK).json({transactions});
};

const getTransactionById = async(req, res, next) => {
    const transactionId =  req.params.transactionId;
    const transaction = await Transaction.findOne({ where: { id: transactionId}});
    if(!transaction) return next(new HttpError('Transaction not found', httpStatusCode.NOT_FOUND));
    res.status(httpStatusCode.OK).json({transaction});
}

const getSummaryTransactions = async(req, res, next) =>{
    const userId = req.userData.userId;
    let totalIncomes = 0;
    let totalExpenses = 0;

    const inComes = await Transaction.findAll({ where: {userId, isIncome: true}});
    const expenses = await Transaction.findAll({ where: {userId, isIncome: false}});

    if(!inComes || inComes.length !== 0) totalIncomes = inComes.reduce((accumulator, item) => accumulator + item.amount, 0);
    if(!expenses || expenses.length !== 0) totalExpenses = expenses.reduce((accumulator, item) => accumulator + item.amount, 0);

    res.status(httpStatusCode.OK).json({ InComes: totalIncomes, Expenses: totalExpenses, Balance: totalIncomes - totalExpenses});
}

const createTransaction = async (req, res, next ) => {
    const {description, amount, isIncome} = req.body;
    const userId = req.userData.userId;
    if(!helper.isNumber(amount)) return next(new HttpError('the amount field must be a number', httpStatusCode.UNPROCESSABLED ))
    try {
        const transaction = await Transaction.create({ description, amount, isIncome, userId});  
        res.status(httpStatusCode.OK).json({transaction});
    } catch (error) {
        return next(new HttpError('error creating transaction', httpStatusCode.INTERNAL_SERVER_ERROR));
    }
    
}

const updateTransaction = async (req, res, next) => {
    const {description, amount, isIncome} = req.body;
    const transactionId = req.params.transactionId;

    if(!helper.isNumber(amount)) return next(new HttpError('the amount field must be a number', httpStatusCode.UNPROCESSABLED ))
    
    const transaction = await Transaction.findOne({where: {id: transactionId}});

    if (!transaction) return next(new HttpError('Transaction to update not found !!', httpStatusCode.NOT_FOUND));

    transaction.description = description;
    transaction.amount = amount;
    transaction.isIncome = isIncome;

    try {
        await transaction.save();    
        res.status(httpStatusCode.OK).json({transaction});
    } catch (error) {
        return next(new HttpError('error updating transaction', httpStatusCode.INTERNAL_SERVER_ERROR));
    }

}

const deleteTransaction = async (req, res, next) => {
    const transactionId = req.params.transactionId;
    if(!helper.isNumber(transactionId)) return next(new HttpError('the transaction id must be a number', httpStatusCode.UNPROCESSABLED ))

    const transaction = await Transaction.findOne({where: {id: transactionId}});
    if (!transaction) return next(new HttpError('Transaction to delete not found !!', httpStatusCode.NOT_FOUND));

    try{
        await transaction.destroy();
        res.status(httpStatusCode.OK).json({message: `Transaction No. ${transactionId} deleted !`});
    }catch(error){
        return next(new HttpError('Error deleting transaction', httpStatusCode.INTERNAL_SERVER_ERROR));
    }
}

module.exports = { getAllTransactions, getTransactionById, getSummaryTransactions ,createTransaction, updateTransaction, deleteTransaction };