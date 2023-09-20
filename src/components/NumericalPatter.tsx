"use client"
import React, { Component } from 'react';

interface numericalState {
    pattern: (number | string)[],
    userInput: number[],
    message: string,
    currentInput: any
}

interface numericalProps {
    pattern: (number | string)[]
    answer: string[]
}
class NumericalPattern extends Component<numericalProps, numericalState> {
  constructor(props: numericalProps) {
    super(props);

    this.state = {
      pattern: this.props.pattern,
      userInput: [],
      message: 'Finish the Pattern!',
      currentInput: null
    };
  }


  handleUserInput() {
    const { userInput, currentInput} = this.state;
    const { pattern, answer} = this.props
    if (currentInput === answer[userInput.length]) {
        const newUserInput = [...userInput, currentInput];
        // indexes 4,5,6
        pattern[userInput.length + 4] = currentInput
        this.setState({ userInput: newUserInput, currentInput: "", pattern: pattern });
        this.setState({ message: 'Keep going, almost there!' });
        if (!pattern.includes("__")) {
            this.setState({ message: 'Great job! You completed the pattern.' });
        }
    } else {
        this.setState({ message: 'Oops! Try again.', currentInput: "" });
      }
  }

  renderCurrentPattern() {
    return this.props.pattern.map((number: number | string,  i: number) => (
        <button
        className={`font-bold  text-white py-2 px-4 rounded`}
        key={`userPattern-${i}`}
        disabled
        >{number}</button>
      ));
  }


  renderAnswerBox() {
    return (
        <input
        className='rounded bg-white'
        type='number'
        placeholder='Enter the next number'
        onChange={(val)=> {this.setState({currentInput: val.target.value})}}
        value={this.state.currentInput}>
        </input>
    )
  }

  renderCheckBtn() {
    return (
        <button
        className='font-extrabold rounded mx-2 text-blue-700'
        onClick={()=> this.handleUserInput()}>
            Check
        </button>
  )}

  render() {
    const { message } = this.state;

    return (
      <div className='flex flex-col mx-5 h-auto justify-between'>
        <h1 className='text-2xl shadow-orange-50'>Numeric Pattern Continuation</h1>
        <div className='flex flex-col'>
          <div>
            {this.renderCurrentPattern()}
          </div>
          <div className='flex flex-row items-center mt-5'>
          </div>
          <div className='flex flex-row justify-between'>
            {this.renderAnswerBox()}
            {this.renderCheckBtn()}
          </div>
        </div>
        <div className={`text-xl mt-5 self-center`}>{message}</div>
      </div>
    );
  }
}

export default NumericalPattern;