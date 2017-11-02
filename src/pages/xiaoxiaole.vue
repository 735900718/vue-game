<template lang="html">
  <div class="xiaoxiaole">
    <h2>开心消消乐</h2>
    <div class="canvas"
      :style="{width: lw * W + 'px'}"
      @click="clearGame">
      <div v-for="(i, iIndex) in game"
        :key="iIndex">
        <template v-for="(j, jIndex) in i">
          <div class="l"
            v-if="j != -1"
            :class="'l-'+j"
            :data-x="iIndex"
            :data-y="jIndex"
            :style="{
              width: lw + 'px',
              height: lw + 'px',
              lineHeight: lw + 'px'}"></div>
            <div class="l"
              v-else
              :data-x="iIndex"
              :data-y="jIndex"
              :style="{
                width: lw + 'px',
                height: lw + 'px',
                lineHeight: lw + 'px'}"></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lw: 50,
      W: 10,  //横向格数
      H: 10,  //纵向格数
      NUMBER: 5,  //一共几种图案
      game: [],
      GAMEOVER: false,  //游戏结束
    }
  },
  methods: {
    randomNum: function(num) {
      return Math.round(Math.random()*(num-1))
    },
    $: function(x, y) {
      return document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]')
    },
    //游戏基盘
    setGameBase: function () {
      let result = []
      //坐标基础
      for (let i = 1; i <= this.H; i++) {
        let a = []
        for (let j = 1; j <= this.W; j++) {
          a.push(this.randomNum(this.NUMBER))
        }
        result.push(a)
      }
      this.game = result
    },
    //重构的一个判断时候重复的方法
    trueORfalse: function (x, y, i, j, v) {
      let hasSame = 0
      for (let num = 1;x + 1 * i * num > 0 && x + 1 * i * num < this.W && y + 1 * j * num > 0 && y + 1 * j * num < this.H && this.game[x + 1 * i * num][y + 1 * j * num] == v; num++) {
        hasSame += 1
      }
      return hasSame
    },
    //判断是否消除
    clearBox: function (x, y, v) {
      if (this.trueORfalse(x, y , 1, 0, v) >= 2) {
        let num = this.trueORfalse(x, y , 1, 0, v)
        console.log(this.$(x, y),'我下面有'+num+'个');
        for (let i = 0;i <= num; i++) {
          this.game[x + 1 * i][y] = -1
          let dom = this.$(x + 1 * i, y)
          dom.className = dom.className.replace(/l-[0-9]*/g,'')
        }
      }
      if (this.trueORfalse(x, y , 0, 1, v) >= 2) {
        let num = this.trueORfalse(x, y , 0, 1, v)
        console.log(this.$(x, y),'我右面有'+num+'个');
        for (let i = 0;i <= num; i++) {
          this.game[x][y + 1 * i] = -1
          let dom = this.$(x, y + 1 * i)
          dom.className = dom.className.replace(/l-[0-9]*/g,'')
        }
      }
    },
    clearGame: function () {
      for (let x = 0;x < this.H;x++) {
        for (let y = 0;y < this.W;y++) {
          this.clearBox(x, y ,this.game[x][y])
        }
      }
    },
    //游戏初始化
    gameInit: function () {
      this.setGameBase()
      console.table(this.game)
    }
  },
  mounted () {
    this.gameInit()
  }
}
</script>

<style scoped>
  .canvas {
    margin: auto;
    text-align: center;
  }
  .l {
    box-sizing: border-box;
    float: left;
    border:1px solid;
    background-size: 90% 90%;
    background-repeat: no-repeat;
    background-position: center;
  }
  .l-0{background-image: url('../assets/xiaoxiaole/zhizhu.png');}
  .l-1{background-image: url('../assets/xiaoxiaole/leishen.png');}
  .l-2{background-image: url('../assets/xiaoxiaole/ironman.png');}
  .l-3{background-image: url('../assets/xiaoxiaole/lvjuren.png');}
  .l-4{background-image: url('../assets/xiaoxiaole/meidui.png');}
  .same {
    background-color: red;
  }
</style>
