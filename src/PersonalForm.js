import React, {PureComponent} from 'react';
import Title from './Title';
import './PersonalForm.css';

export class PersonalForm extends PureComponent {
  handleChangeForm = e => {
    const {onChangeForm} = this.props;
    const {name, value} = e.target;

    onChangeForm(name, value);
  }

  render() {
    const {firstName, lastName, email} = this.props;

    return (
      <div className="PersonalForm personal-form">
        <Title>Персональная информация</Title>
        <div className="PersonalForm__field">
          <input 
            className="App__textfield"
            placeholder="Имя"
            name="firstName"
            onChange={this.handleChangeForm}
            value={firstName}
          />
        </div>
        <div className="PersonalForm__field">
          <input 
            className="App__textfield"
            placeholder="Фамилия"
            name="lastName"
            onChange={this.handleChangeForm}
            value={lastName}
          />
        </div>
        <div className="PersonalForm__field">
          <input 
            className="App__textfield"
            placeholder="E-mail"
            name="email"
            onChange={this.handleChangeForm}
            value={email}
          />
        </div>
      </div>
    );
  }
}

export default PersonalForm;
