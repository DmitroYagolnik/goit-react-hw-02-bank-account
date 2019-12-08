import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import notification from '../../applications/notification';
import style from './Controls.module.css';

class Controls extends Component {
  static propTypes = {
    onBotonClick: PropTypes.func.isRequired,
    balance: PropTypes.number.isRequired,
  };

  state = {
    amount: '',
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ amount: value });
  };

  handleBtn = evt => {
    toast.dismiss();
    if (this.state.amount === '') {
      toast.error(notification.enterAmount, {
        className: style.errorToast,
      });
      return;
    }

    if (this.state.amount <= 0) {
      toast.error(notification.negativeValues);
      this.reset();
      return;
    }

    if (evt.target.name === 'withdrawBtn') {
      if (this.state.amount > this.props.balance) {
        toast.error(notification.notEnoughMoney);
        this.reset();
        return;
      }

      this.props.onBotonClick(Number(this.state.amount), 'withdrawal');
      this.reset();
      return;
    }

    this.props.onBotonClick(Number(this.state.amount), 'deposit');
    this.reset();
  };

  reset = () => {
    this.setState({ amount: '' });
  };

  render() {
    const { amount } = this.state;
    return (
      <section className={style.controls}>
        <ToastContainer className={style.ToastContainer} />
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={this.handleChange}
        />
        <button type="button" name="depositBtn" onClick={this.handleBtn}>
          Deposit
        </button>
        <button type="button" name="withdrawBtn" onClick={this.handleBtn}>
          Withdraw
        </button>
      </section>
    );
  }
}

export default Controls;
