'use strict';

const PLAYER_X = 'X';
const PLAYER_O = 'O';
const WINNING_PERMUTATIONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];


class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='square' onClick={() => this.props.onClickHandler()}>
        {this.props.value}
      </div>
    );
  }
}

//  create a Component
class TicTacToe extends React.Component {

  constructor(props) {
    super(props);

    // state takes an object
    this.state = {
      playerX: true,
      squares: Array(9).fill(null)
    };
  }

  // turn jsx into js
  renderSquare(i) {
    return (
      <Square value={this.state.squares[i]} onClickHandler={() => this.makeMove(i)} />
    );
  }

  getCurrentPlayer() {
    return this.state.playerX ? PLAYER_X : PLAYER_O;
  }

  makeMove(index) {
    // Using slice to copy the array
    let squares = this.state.squares.slice();
    if (this.checkIfWon() || squares[index]) {
      return;
    }

    squares[index] = this.getCurrentPlayer();
    this.setState({
      squares: squares,
      playerX: !this.state.playerX
    });
  }

  checkIfWon() {
    for (let i = 0; i < WINNING_PERMUTATIONS.length; i++) {
      let value0 = WINNING_PERMUTATIONS[i][0]; // 0, 3, 6 ...
      let value1 = WINNING_PERMUTATIONS[i][1]; // 1, 4, 7 ...
      let value2 = WINNING_PERMUTATIONS[i][2]; // 2, 5, 8 ...

      let square0 = this.state.squares[value0];
      let square1 = this.state.squares[value1];
      let square2 = this.state.squares[value2];

      if (square0 != null && square0 === square1 && square0 === square2) {
        return true;
      }
    }
    return false;
  }

  render() {
    let status;
    if (this.checkIfWon()) {
      status = 'You\'ve won!';
    } else {
      status = 'Next player: ' + this.getCurrentPlayer();
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<TicTacToe />, document.getElementById('container'));
