<template lang="html">
  <div>
    <h2>井字游戏</h2>
    <div class="game">
      <div class="game-board">
        <div class="board-row">
          <button class="square" @click="setSquares(0)">{{ history[stepNumber].squares[0] }}</button>
          <button class="square" @click="setSquares(1)">{{ history[stepNumber].squares[1] }}</button>
          <button class="square" @click="setSquares(2)">{{ history[stepNumber].squares[2] }}</button>
        </div>
        <div class="board-row">
          <button class="square" @click="setSquares(3)">{{ history[stepNumber].squares[3] }}</button>
          <button class="square" @click="setSquares(4)">{{ history[stepNumber].squares[4] }}</button>
          <button class="square" @click="setSquares(5)">{{ history[stepNumber].squares[5] }}</button>
        </div>
        <div class="board-row">
          <button class="square" @click="setSquares(6)">{{ history[stepNumber].squares[6] }}</button>
          <button class="square" @click="setSquares(7)">{{ history[stepNumber].squares[7] }}</button>
          <button class="square" @click="setSquares(8)">{{ history[stepNumber].squares[8] }}</button>
        </div>
      </div>
      <div class="game-info">
          <div>{{ status }}</div>
          <ol>
            <li
              v-for="(val,index) in history"
              @click="jumpTo(index)"
            >{{ index ? 'step #' + index : 'game start'}}</li>
          </ol>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      winner: '',
      xIsNext: true
    }
  },
  computed: {
    status: function() {
      if (this.winner === '') {
        return 'next player: '+ (this.xIsNext ? 'X': 'O')
      } else {
        return 'winner is '+ (this.xIsNext ? 'X': 'O')
      }
    }
  },
  methods: {
    // one step
    setSquares: function (index) {
      // 已经有赢家
      if (this.winner !== '') return;

      let squares = this.history[this.stepNumber].squares.slice();

      // 如果已经有旗子，返回
      if (squares[index]) {
        return;
      } else {
        squares[index] = this.xIsNext ? 'X' : 'O';
      }

      // 如果已经胜利，返回
      const WINNER = this.calculateWinner(squares);

      if (WINNER) {
        this.history = this.history.concat({squares: squares});
        this.stepNumber ++;
        this.winner = this.history[this.stepNumber].squares[WINNER[0]];
        return;
      }

      this.history = this.history.concat({squares: squares});

      this.stepNumber++;
      this.xIsNext = !this.xIsNext;
    },

    // 判断赢家
    calculateWinner: function (squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return lines[i];
        }
      }
      return null;
    },

    jumpTo: function(index) {
      const history = [].slice.apply(this.history, [0, index + 1]);
      if (history.length == this.history.length) return;

      this.stepNumber = index;
      this.winner = '';
      this.xIsNext = history.length % 2 ? true : false;
      this.history = history;
    }
  }
}
</script>

<style lang="css" scoped>
  ol, ul {
    padding-left: 30px;
  }

  .board-row:after {
    clear: both;
    content: "";
    display: table;
  }

  .status {
    margin-bottom: 10px;
  }

  .square {
    background: #fff;
    border: 1px solid #999;
    float: left;
    font-size: 24px;
    font-weight: bold;
    line-height: 34px;
    height: 34px;
    margin-right: -1px;
    margin-top: -1px;
    padding: 0;
    text-align: center;
    width: 34px;
  }

  .square:focus {
    outline: none;
  }

  .kbd-navigation .square:focus {
    background: #ddd;
  }

  .game {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .game-board {
    width: 102px;
  }

  .game-info {
    width: 120px;
    margin-left: 20px;
  }
</style>
