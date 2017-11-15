import React, {PureComponent} from 'react';
import cx from 'classnames';
import Step from './Step';
import PersonalForm from './PersonalForm';
import CardForm from './CardForm';

import './App.css';

const stepTitles = ['Personal information', 'Card information', 'Finish'];

class App extends PureComponent {
  state = {
    step: 1,
    firstName: '',
    lastName: '',
    email: '',
    cardNumber: '',
    isTimeOver: false
  }

  isFormCommitable = () => {
    const {step} = this.state;
    
    if (step === 1) {
      const {firstName, lastName, email} = this.state;

      return firstName.length && lastName.length && email.length && email.includes('@');
    }

    else if (step === 2) {
      const {cardNumber} = this.state;

      return cardNumber.length === 16;
    }
  }

  handleTabClick = clickedStep => {
    this.setState({
      step: clickedStep
    });
  }

  handleChangeForm = (field, value) => {
    this.setState({
      [field]: value
    });
  }

  handleClickNextForm = () => {
    const {step} = this.state;

    this.setState({
      step: step + 1
    });
  }

  handleChangeTimeOver = (timeOver=false) => {
    this.setState({
      isTimeOver: timeOver
    });
  }

  renderForm = () => {
    const {step} = this.state;

    let content = '';
    
    if (step === 1) {
      const {firstName, lastName, email} = this.state;
      
      content = (
        <PersonalForm 
          firstName={firstName}
          lastName={lastName}
          email={email}
          onChangeForm={this.handleChangeForm}
        />
      );
    }
    
    else if (step === 2) {
      const {cardNumber} = this.state;
      
      content = (
        <CardForm 
          cardNumber={cardNumber}
          onChangeForm={this.handleChangeForm}
          onChangeTimeOver={this.handleChangeTimeOver}
        />
      );
    }

    else if (step === 3) {
      content = 'Поздравляем!';
    }

    return content;
  }
  
  render() {
    const {step, isTimeOver} = this.state;

    return (
      <div className="App">
        <div className="App__container container">
          <header className="App__tab-panel tab-panel">
            {stepTitles.map((stepTitle, index) => {
              let stepNumber = index + 1;

              return (
                <Step 
                  key={stepTitle} 
                  onClick={this.handleTabClick}
                  isSelected={step === stepNumber}
                  number={stepNumber}
                  isClickable={stepNumber < step}
                >
                {stepTitle}
                </Step>
              )
            })}
          </header>
          <div className="App__form-content form-content">
            {this.renderForm()}
          </div>
          <footer className="App__footer button-panel">
            <button 
              type="button" 
              className={cx('App__button-next', 'button-next', {'App__button-next_hidden': (step === 3)})}
              onClick={this.handleClickNextForm}
              disabled={!this.isFormCommitable() || isTimeOver}
            >Next</button>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
