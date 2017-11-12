import React, { PureComponent } from 'react';
import cx from 'classnames';

import './Step.css';

class Step extends PureComponent {
  handleClick = () => {
    const {isClickable, onClick, number} = this.props;
    if (isClickable) onClick(number);
  }

  render() {
    const { isSelected, isClickable, number } = this.props;

    return (
      <button
        type="button"
        className={
          cx(
            'Step', 
            'step', 
            {'step-selected': isSelected}, 
            {'Step_selected': isSelected}, 
            {'step-clickable': isClickable}, 
            {'Step_clickable': isClickable}
          )
        }
        onClick={this.handleClick}
      >
        <span className="Step__number step__number">{ number }</span>
        <span className="Step__title step__title">{ this.props.children }</span>
      </button>
    );
  }
}

export default Step;
