import shortid from 'shortid';
import createDate from './createDate';

const createTransaction = (amountTransaction, typeTransaction) => {
  return {
    id: shortid.generate(),
    date: createDate(),
    amount: amountTransaction,
    type: typeTransaction,
  };
};

export default createTransaction;
