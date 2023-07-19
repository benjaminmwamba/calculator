import React from 'react';

import useCalculator from '../customHooks/useCalculator';


function Index() {

  const { handleNumber, handleFunctionKeys, handleSign, displayText, handleEqual } = useCalculator()

  return (
    <section className='page-wrapper'>
      <main className='calculator-wrapper'>
        <div className='screen'>
          {displayText}
        </div>
        <div className='touchpad'>
          <button onClick={() => handleFunctionKeys("AC")} className='functionKey' data-color='light-grey'>AC</button>
          <button onClick={() => handleFunctionKeys("+/-")} className='functionKey' data-color='light-grey'>+/-</button>
          <button onClick={() => handleFunctionKeys("%")} className='functionKey' data-color='light-grey'>%</button>
          <button onClick={() => handleSign("/")} className='sign' data-color='yellow'>&#xF7;</button>
          <button onClick={() => handleNumber("7")} className='number' data-color='grey'>7</button>
          <button onClick={() => handleNumber("8")} className='number' data-color='grey'>8</button>
          <button onClick={() => handleNumber("9")} className='number' data-color='grey'>9</button>
          <button onClick={() => handleSign("x")} className='sign' data-color='yellow'>&times;</button>
          <button onClick={() => handleNumber("4")} className='number' data-color='grey'>4</button>
          <button onClick={() => handleNumber("5")} className='number' data-color='grey'>5</button>
          <button onClick={() => handleNumber("6")} className='number' data-color='grey'>6</button>
          <button onClick={() => handleSign("-")} className='sign' data-color='yellow'>&minus;</button>
          <button onClick={() => handleNumber("1")} className='number' data-color='grey'>1</button>
          <button onClick={() => handleNumber("2")} className='number' data-color='grey'>2</button>
          <button onClick={() => handleNumber("3")} className='number' data-color='grey'>3</button>
          <button onClick={() => handleSign("+")} className='sign' data-color='yellow'>+</button>
          <button onClick={() => handleNumber("0")} id='zero' className='number' data-color='grey'>0</button>
          <button onClick={() => handleNumber(".")} className='number' data-color='grey'>.</button>
          <button onClick={() => handleEqual()} className='sign' data-color='yellow'>=</button>
        </div>
      </main>
    </section>
  );
}

export default Index;
