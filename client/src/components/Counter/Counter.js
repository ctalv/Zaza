import React from 'react'
import './counter.css'

function Counter({ setCounter, counter }) {

console.log(counter)

function decrement() {
  if (counter > 1) {
    setCounter(counter - 1 )
  }
}

function increment() {
  setCounter(counter + 1)

}
  return (
    <div className='counter'>
      <div style={{ cursor: counter === 1 ? 'not-allowed' : 'pointer', opacity: counter === 1 ? .4 : 1 }} 
      onClick={decrement}>
        <p>-</p>
        </div>
      <div className='line'></div>
      <div
        type="number"
        placeholder="1">
        <p>{counter}</p>
      </div>
      <div className='line'></div>
      <div onClick={increment}>
        <p>+</p>
        </div>

    </div>
  )
}

export default Counter