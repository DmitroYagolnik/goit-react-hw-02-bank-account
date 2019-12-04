import React from 'react';
import PropTypes from 'prop-types';
import style from './Balance.module.css';

const Balance = ({ balance, income, expenses }) => (
  <section className={style.balance}>
    <p className={style.totalDeposit}>
      <span role="img" aria-label="up arrow">
        ⬆️
      </span>
      {income.toFixed(2)}$
    </p>
    <p className={style.totalWithdraw}>
      <span role="img" aria-label="down arrow">
        ⬇️
      </span>
      {expenses.toFixed(2)}$
    </p>
    <p>Balance: {balance.toFixed(2)}$</p>
  </section>
);

Balance.defaultProps = {
  balance: 0,
  income: 0,
  expenses: 0,
};

Balance.propTypes = {
  balance: PropTypes.number,
  income: PropTypes.number,
  expenses: PropTypes.number,
};

export default Balance;
