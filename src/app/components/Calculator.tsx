'use client';

import { useState } from 'react';
import Button from './Button';
import Display from './Display';

export default function Calculator() {
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setCurrentValue(num);
      setWaitingForOperand(false);
    } else {
      setCurrentValue(currentValue === '0' ? num : currentValue + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setCurrentValue('0.');
      setWaitingForOperand(false);
    } else if (!currentValue.includes('.')) {
      setCurrentValue(currentValue + '.');
    }
  };

  const clear = () => {
    setCurrentValue('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(currentValue);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operator) {
      const currentPrevious = parseFloat(previousValue);
      const newValue = calculate(currentPrevious, inputValue, operator);
      
      setCurrentValue(String(newValue));
      setPreviousValue(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (first: number, second: number, op: string): number => {
    switch (op) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '×':
        return first * second;
      case '÷':
        return second !== 0 ? first / second : 0;
      default:
        return second;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(currentValue);

    if (previousValue !== null && operator) {
      const currentPrevious = parseFloat(previousValue);
      const newValue = calculate(currentPrevious, inputValue, operator);
      
      setCurrentValue(String(newValue));
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const toggleSign = () => {
    const newValue = parseFloat(currentValue) * -1;
    setCurrentValue(String(newValue));
  };

  const percentage = () => {
    const current = parseFloat(currentValue);
    if (current === 0) return;
    setCurrentValue(String(current / 100));
  };

  return (
    <div className="bg-gray-800 p-6 rounded-3xl shadow-2xl w-full max-w-sm">
      <Display 
        currentValue={currentValue} 
        previousValue={previousValue} 
        operator={operator} 
      />
      
      <div className="grid grid-cols-4 gap-3">
        <Button label="C" onClick={clear} variant="clear" />
        <Button label="+/-" onClick={toggleSign} variant="default" />
        <Button label="%" onClick={percentage} variant="default" />
        <Button label="÷" onClick={() => performOperation('÷')} variant="operator" />
        
        <Button label="7" onClick={() => inputNumber('7')} />
        <Button label="8" onClick={() => inputNumber('8')} />
        <Button label="9" onClick={() => inputNumber('9')} />
        <Button label="×" onClick={() => performOperation('×')} variant="operator" />
        
        <Button label="4" onClick={() => inputNumber('4')} />
        <Button label="5" onClick={() => inputNumber('5')} />
        <Button label="6" onClick={() => inputNumber('6')} />
        <Button label="-" onClick={() => performOperation('-')} variant="operator" />
        
        <Button label="1" onClick={() => inputNumber('1')} />
        <Button label="2" onClick={() => inputNumber('2')} />
        <Button label="3" onClick={() => inputNumber('3')} />
        <Button label="+" onClick={() => performOperation('+')} variant="operator" />
        
        <Button label="0" onClick={() => inputNumber('0')} className="col-span-2" />
        <Button label="." onClick={inputDecimal} />
        <Button label="=" onClick={performCalculation} variant="equals" />
      </div>
    </div>
  );
}