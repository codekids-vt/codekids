"use client"
import React, { Component } from 'react';

interface colorState {
    pattern: string[],
    userInput: string[],
    message: string
}

class ColorPattern extends Component<{}, colorState> {
  constructor(props: colorState) {
    super(props);

    this.state = {
      pattern: ['red', 'red', 'blue', 'blue'],
      userInput: [],
      message: 'Repeat the pattern!',
    };
  }

  handleColorSelection(color: string) {
    const { pattern, userInput } = this.state;

    if (color === pattern[userInput.length]) {
      const newUserInput = [...userInput, color];
      this.setState({ userInput: newUserInput });
  
      if (newUserInput.length === pattern.length) {
        this.setState({ message: 'Great job! You completed the pattern.' });
      }
    } else {
      this.setState({ message: 'Oops! Try again.', userInput: [] });
    }
  }

  renderCurrentPattern() {
    return this.state.userInput.map((color: string,  i: number) => (
        <button
        className={`font-bold  text-white py-2 px-4 rounded`}
        key={`userPattern-${i}`}
        disabled
        >{color}</button>
      ));
  }

  renderColorButtons() {
    const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple'];

    return colors.map((color: string,  i: number) => (
      <button
      className={`font-bold py-2 px-4 rounded text-${color}-500`}
      key={`color-${i}`}
      onClick={() => this.handleColorSelection(color)}
      >{color}</button>
    ));
  }

  renderResetSelection() {
    return (
        <button
        className='font-extrabold rounded mx-2'
        onClick={()=> this.setState({userInput: [], message: 'Repeat the pattern!'})}>
            Reset
        </button>
  )}

  render() {
    const { message } = this.state;

    return (
      <div className='flex flex-col outline-dashed'>
        <h1 className='text-2xl shadow-orange-50'>Color Pattern Matching</h1>
        <div className='flex flex-col'>
          <div>
            {this.renderCurrentPattern()}
          </div>
          <div className='flex flex-row items-center'>
            {this.renderColorButtons()}
          </div>
          <div className='flex'>
            {this.renderResetSelection()}
          </div>
        </div>
        <div className='text-xl'>{message}</div>
      </div>
    );
  }
}

export default ColorPattern;