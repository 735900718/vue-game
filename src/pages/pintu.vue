<template>
  <div>
    <h2>拼图</h2>
    <center>
      <img ref="img" src="../assets/pintu/hanzo.jpg" alt="">
      <canvas ref="canvas" width="300" height="300"></canvas>
    </center>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        view: 'todoList',
        did: 0,
        trueArr: [
          [0,0],
          [100,0],
          [200,0],
          [0,100],
          [100,100],
          [200,100],
          [0,200],
          [100,200],
          [200,200],
        ],
        userArr: [
          [],[],[]
        ],
        move: [200, 200],   // 将要用来挪动的模块的位置
        picLength: 9,  //  一共分解为多少个模块
        ctx: null,
        img: null,   // 图片
        gameON: false
      }
    },
    methods: {
      draw: function(x, y) {
        var _x = this.move[0] + x * 100,
            _y = this.move[1] + y * 100;
        if (_x > 200 || _x < 0 || _y > 200 || _y < 0) return;


        // 替换两张图片的位置
        [this.userArr[this.move[0]/100][this.move[1]/100], this.userArr[_x/100][_y/100]] = [this.userArr[_x/100][_y/100], this.userArr[this.move[0]/100][this.move[1]/100]];
        this.move = [_x, _y];

        this.ctx.clearRect(0,0,300,300);

        var userArr = [].concat(...this.userArr);

        while (userArr.length) {
          var x = ~~((this.picLength - userArr.length) / 3);
          var y = (this.picLength - userArr.length) % 3;

          var t = userArr.splice(0,1)[0]; // 图片坐标
          if (x*100 == _x && y*100 == _y) {

          } else {
            this.ctx.drawImage(this.img, ...t, 100, 100, x * 100, y * 100, 100, 100);
          }
        }

        this.checkGame();
        
      },
      checkGame: function() { //  查看游戏是否结束
        if (this.gameON) {
          var userArr = [].concat(...this.userArr);
          var gameON = userArr.every(function(item, key) {
            return item[0] == this.trueArr[key][1] && item[1] == this.trueArr[key][0];
          }.bind(this));

          if (gameON) {
            setTimeout(function() {
              alert('游戏结束');
            }, 0);
          }
        }
      }
    },
    mounted: function() {
      var img = new Image();
      this.img = img;
      var canvas = this.$refs.canvas;
      var ctx = canvas.getContext('2d');
      this.ctx = ctx;

      var trueArr = [...this.trueArr];

      img.onload = function() {
        while (trueArr.length > 1) {
          var x = (this.picLength - trueArr.length) % 3;
          var y = ~~((this.picLength - trueArr.length) / 3);
          var t = trueArr.splice(0,1)[0]; // 图片坐标
          ctx.drawImage(img, ...t, 100, 100, x * 100, y * 100, 100, 100);
          this.userArr[x].push(t);
        }
        this.userArr[2].push(trueArr[0]);

        document.onkeydown = function(e) {
          switch (e.keyCode) {
            case 37:  //  left
              this.draw(1, 0);
              break;
            case 38:  //  up
              this.draw(0, 1);
              break;
            case 39:  //  right
              this.draw(-1, 0);
              break;
            case 40:  //  down
              this.draw(0, -1);
              break;
            default:
              break;
          }
        }.bind(this)

        var i = 100;
        while (i > 0) {
          this.draw((Math.round(Math.random()) ? 1: -1) * Math.round(Math.random()), (Math.round(Math.random()) ? 1: -1) * Math.round(Math.random()));
          i--;
        }

        this.gameON = true;
      }.bind(this)
      img.src = this.$refs.img.src;
    }
  }
</script>