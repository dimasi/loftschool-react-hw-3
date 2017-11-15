import React, {PureComponent} from 'react';
import Title from './Title';
import './CardForm.css';

export class CardForm extends PureComponent {
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
    const {name, value} = e.target;
    const normalizedValue = value.replace(/\s/g, '').substring(0, 16);

    onChangeForm(name, normalizedValue);
  }

  pretifyCardNumber = () => {
    let cardNumber = '';

    if (this.props.cardNumber !== undefined) {
      cardNumber = this.props.cardNumber.replace(/(.{4})/g, '$1 ').trim();
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
