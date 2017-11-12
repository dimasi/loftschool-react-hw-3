import React, {Component} from 'react';
import Title from './Title';
import './CardForm.css';

export class CardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leftTime: 120
    };
    props.onChangeTimeOver(false);
  }

  componentDidMount() {
    this.id = setInterval(() => {
      const leftTime = Math.max(this.state.leftTime - 1, 0);
      this.setState({leftTime});
      if (leftTime === 0 && this.state.leftTime === 1) {
        this.props.onChangeTimeOver(true);
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.id);
  }

  handleChangeForm = e => {
    const {onChangeForm} = this.props;
    onChangeForm(e.target.name, e.target.value.replace(/\s/g, '').substring(0, 16));
  }

  pretifyCardNumber = () => {
    let cardNumber = '';
    // Чтобы не падали тесты
    if (this.props.cardNumber !== undefined) {
      cardNumber = this.props.cardNumber.replace(/(.{4})/g, '$1 ');
      if (cardNumber.lastIndexOf(' ') === cardNumber.length - 1) cardNumber = cardNumber.substring(0, cardNumber.length - 1);
    }
    return cardNumber;
  }

  render() {
    const {leftTime} = this.state;

    return (
      <div className="CardForm card-form">
        <Title>Номер карты</Title>
        <p className="CardForm__left-time left-time">Осталось {leftTime} секунд</p>
        <div className="CardForm__field">
          <input 
            className="App__textfield"
            placeholder="0000-0000-0000-0000"
            name="cardNumber"
            onChange={this.handleChangeForm}
            value={this.pretifyCardNumber()}
          />
        </div>
      </div>
    );
  }
}

export default CardForm;
