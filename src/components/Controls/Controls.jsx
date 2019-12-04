import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import notification from '../../applications/notification';
import style from './Controls.module.css';

class Controls extends Component {
  static propTypes = {
    onDeposit: PropTypes.func.isRequired,
    onWithdraw: PropTypes.func.isRequired,
    balance: PropTypes.number.isRequired,
  };

  state = {
    amount: '',
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ amount: value });
  };

  handleDeposite = () => {
    if (this.state.amount === '') {
      toast.dismiss();
      toast.error(notification.enterAmount, {
        className: style.errorToast,
      });
      return;
    }

    if (this.state.amount <= 0) {
      toast.dismiss();
      toast.error(notification.negativeValues, {
        className: style.errorToast,
      });
      this.reset();
      return;
    }
    toast.dismiss();
    this.props.onDeposit(Number(this.state.amount));
    this.reset();
  };

  handleWithdraw = () => {
    if (this.state.amount === '') {
      toast.dismiss();
      toast.error(notification.enterAmount, {
        className: style.errorToast,
      });
      return;
    }

    if (this.state.amount <= 0) {
      toast.dismiss();
      toast.error(notification.negativeValues);
      this.reset();
      return;
    }

    if (this.state.amount > this.props.balance) {
      toast.dismiss();
      toast.error(notification.notEnoughMoney);
      this.reset();
      return;
    }
    toast.dismiss();
    this.props.onWithdraw(Number(this.state.amount));
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
        <button type="button" onClick={this.handleDeposite}>
          Deposit
        </button>
        <button type="button" onClick={this.handleWithdraw}>
          Withdraw
        </button>
      </section>
    );
  }
}

export default Controls;
