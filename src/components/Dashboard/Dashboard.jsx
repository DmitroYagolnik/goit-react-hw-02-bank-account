import React, { Component } from 'react';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import createTransaction from '../../applications/createTransaction';
import 'react-toastify/dist/ReactToastify.css';
import style from './Dashboard.module.css';

class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
  };

  handleControlsBtn = (amount, type) => {
    const newTransaction = createTransaction(amount, type);
    this.setState(prevState => ({
      balance:
        type === 'deposit'
          ? prevState.balance + amount
          : prevState.balance - amount,
      transactions: [...prevState.transactions, newTransaction],
    }));
  };

  totalTransactions = () => {
    let income = 0;
    let expenses = 0;
    this.state.transactions.forEach(elem => {
      if (elem.type === 'deposit') {
        income += elem.amount;
      }

      if (elem.type === 'withdrawal') {
        expenses += elem.amount;
      }
    });
    return { income, expenses };
  };

  render() {
    const { balance, transactions } = this.state;
    const { income, expenses } = this.totalTransactions();

    return (
      <div className={style.dashboard}>
        <Controls onBotonClick={this.handleControlsBtn} balance={balance} />
        <Balance balance={balance} income={income} expenses={expenses} />
        <TransactionHistory items={transactions} />
      </div>
    );
  }
}

export default Dashboard;
