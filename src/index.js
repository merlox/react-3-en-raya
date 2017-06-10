import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Square(props){
   return (
      <button className="square" onClick={() => props.onClick()}>
         {props.value}
      </button>
   )
}

class Board extends React.Component{

   renderSquare(i){
      return (
         <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
         />
      )
   }

   render(){
      return (
         <div>
            <div className="board-row">
               {this.renderSquare(0)}
               {this.renderSquare(1)}
               {this.renderSquare(2)}
            </div>
            <div className="board-row">
               {this.renderSquare(3)}
               {this.renderSquare(4)}
               {this.renderSquare(5)}
            </div>
            <div className="board-row">
               {this.renderSquare(6)}
               {this.renderSquare(7)}
               {this.renderSquare(8)}
            </div>
         </div>
      )
   }
}

class Game extends React.Component{
   constructor(){
      super()
      this.state = {
         history: [{
            squares: Array(9).fill(null),
            stepPosition: null,
         }],
         xIsNext: true,
         stepNumber: 0,
      }
   }

   jumpTo(step){
      this.setState({
         stepNumber: step,
         xIsNext: (step % 2) ? false : true,
      })
   }

   handleClick(i){
      const history = this.state.history.slice(0, this.state.stepNumber + 1)
      const current = history[history.length - 1]

      // Copy the array
      const squares = current.squares.slice()

      if(calculateWinner(squares) || squares[i])
         return

      squares[i] = this.state.xIsNext ? 'X' : 'O'
      this.setState({
         history: history.concat([{
            squares: squares,
            stepPosition: i,
         }]),
         stepNumber: history.length,
         xIsNext: !this.state.xIsNext,
      })
   }

   render(){
      const history = this.state.history
      const current = history[this.state.stepNumber]
      let status
      let winner = calculateWinner(current.squares)

      const moves = history.map((step, moveIndex) => {
         let message

         if(moveIndex){
            if(moveIndex + 1 === history.length)
               message = <b>Move {convertMove(step.stepPosition)}</b>
            else
               message = <span>Move {convertMove(step.stepPosition)}</span>
         }else
            message = 'Game Start'

         return (
            <li key={moveIndex}>
               <a onClick={() => this.jumpTo(moveIndex)}>
                  {message}
               </a>
            </li>
         )
      })

      if(winner){
         status = `Winner: ${winner.type}. Line ${winner.line}`
      }else
         status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`

      return (
         <div className="game">
            <div className="game-board">
               <Board
                  squares={current.squares}
                  onClick={(i) => this.handleClick(i)}
               />
            </div>
            <div className="game-info">
               <div>{status}</div>
               <ol>{moves}</ol>
            </div>
         </div>
      )
   }
}

function calculateWinner(squares){
   const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
   ]
   for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
         return {
            type: squares[a],
            line: lines[i],
         }
      }
   }
   return null
}

function convertMove(i){
   switch(i){
      case 0: return '(1, 1)'
      case 1: return '(2, 1)'
      case 2: return '(3, 1)'
      case 3: return '(1, 2)'
      case 4: return '(2, 2)'
      case 5: return '(3, 2)'
      case 6: return '(1, 3)'
      case 7: return '(2, 3)'
      case 8: return '(3, 3)'
      default: return '(0, 0)'
   }
}

ReactDOM.render(
   <Game/>,
   document.getElementById('root')
)
