import React, { Component } from 'react';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import createTransaction from '../../applications/createTransaction';
import style from './Dashboard.module.css';

class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
  };

  handleDeposit = amount => {
    const newTransaction = createTransaction(amount, 'deposit');
    this.setState(prevState => ({
      balance: prevState.balance + amount,
      transactions: [...prevState.transactions, newTransaction],
    }));
  };

  handleWithdraw = amount => {
    console.log('amount Withdraw', amount);
    const newTransaction = createTransaction(amount, 'withdrawal');
    this.setState(prevState => ({
      balance: prevState.balance - amount,
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
        <Controls
          onDeposit={this.handleDeposit}
          onWithdraw={this.handleWithdraw}
          balance={balance}
        />
        <Balance balance={balance} income={income} expenses={expenses} />
        <TransactionHistory items={transactions} />
      </div>
    );
  }
}

export default Dashboard;
