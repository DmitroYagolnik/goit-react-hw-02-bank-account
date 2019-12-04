import React from 'react';
import PropTypes from 'prop-types';
import style from './TransactionHistory.module.css';

const TransactionHistory = ({ items }) => {
  return (
    <table className={style.history}>
      <thead>
        <tr>
          <th>Transaction</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      {items.length > 0 && (
        <tbody>
          {items.map(({ id, type, amount, date }) => {
            return (
              <tr key={id}>
                <td>{type}</td>
                <td>{amount.toFixed(2)}</td>
                <td>{date}</td>
              </tr>
            );
          })}
        </tbody>
      )}
    </table>
  );
};

TransactionHistory.defaultProps = {
  items: [],
};

TransactionHistory.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ),
};

export default TransactionHistory;
