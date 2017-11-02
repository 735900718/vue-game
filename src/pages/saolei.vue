<template lang="html">
  <div class="saolei">
    <h2>扫雷</h2>
    <div class="canvas" :style="{width: lW * gameWN + 'px', height: lH * gameHN + 'px'}">
      <div v-for="(i,iIndex) in game" :key="i">
        <template v-for="(v,vIndex) in i">
          <div class="l"
            v-if="v == -1"
            @contextmenu.prevent="flag($event)"
            @click="gameover"
            :data-x = 'iIndex'
            :data-y = 'vIndex'
            :data-set = '0'
            :style="{width: lW + 'px',lineHeight: lH + 'px', height: lH + 'px'}"></div>
          <div class="l"
            v-else
            @contextmenu.prevent="flag($event);doubleClick(iIndex, vIndex, v)"
            @click="showNum(iIndex, vIndex, v)"
            :data-x = 'iIndex'
            :data-y = 'vIndex'
            :data-set = '0'
            :style="{width: lW + 'px',lineHeight: lH + 'px', height: lH + 'px'}"></div>
        </template>
      </div>
    </div>
    <div style="width: 500px;margin: auto;">
      横向：<input type="text" name="" v-model="reset.gameWN"><br>
      纵向：<input type="text" name="" v-model="reset.gameHN"><br>
      炸弹：<input type="text" name="" v-model="reset.boom"><br>
      <button type="button" name="button" @click="gameInit">重新开始</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lW: 30,  //每个小格子的宽度
      lH: 30,  //每个小格子的高度
      gameWN: 20, //一行几个格子
      gameHN: 10, //一列几个格子
      boom: 25, //雷的个数
      game: [],
      set: 0,   //已经发现的雷的数量
      GAMEOVER: false,  //游戏结束
      reset: {
        gameWN: 20,
        gameHN: 10,
        boom: 25
      }
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
      for (let i = 1; i <= this.gameHN; i++) {
        let a = []
        for (let j = 1; j <= this.gameWN; j++) {
          a.push(0)
        }
        result.push(a)
      }
      this.game = result
    },
    //载入炸弹
    setBoom: function () {
      let result = this.game
      //随机雷坐标
      let boom = 0
      while (boom < this.boom) {
        let x = this.randomNum(this.gameHN),
            y = this.randomNum(this.gameWN)
        if (result[x][y] !== -1) {
          result[x][y] = -1
          boom++
        }
      }
      this.game = result
    },
    //根据炸弹书写数字
    setNumber: function () {
      let result = this.game
      //给其他位置添加数字
      for (let i = 0; i < this.gameHN; i++) {
        for (let j = 0; j < this.gameWN; j++) {
          if (result[i][j] == -1) {
            for (let x = i - 1;x <= i + 1;x++) {
              for (let y = j - 1;y <= j + 1;y++) {
                if (x >= 0 && x < this.gameHN && y >= 0 && y < this.gameWN && result[x][y] != -1) {
                  result[x][y] += 1
                }
              }
            }
          }
        }
      }
      this.game = result
    },
    //游戏初始化
    gameInit: function () {
      if (this.boom >= this.gameWN * this.gameHN) {
        alert('闹呢？！一共才几个格子你自己数数！')
        return
      }
      this.gameWN = this.reset.gameWN
      this.gameHN = this.reset.gameHN
      this.boom = this.reset.boom
      this.set = 0
      this.GAMEOVER = false
      this.setGameBase()
      this.setBoom()
      this.setNumber()
    },
    //游戏结束
    gameover: function () {
      if (this.GAMEOVER) {return}
      let time = 0
      for (let i = 0; i < this.gameHN; i++) {
        for (let j = 0; j < this.gameWN; j++) {
          if (this.game[i][j] == -1) {
            let dom = this.$(i, j)
            setTimeout(()=>{dom.className += ' boom'},time)
            time+=100
          }
        }
      }
      this.GAMEOVER = true
      alert('游戏结束')
    },
    //点击时的操作
    showNum: function (x,y,v) {
      if (this.GAMEOVER) {return}
      let dom = this.$(x, y)
      if (dom && dom.dataset.set == 1) {return}
      this.set +=1
      dom.className = dom.className.replace('flag','')
      if (v === 0) {
        dom.className += ' space'
      }else {
        dom.innerHTML = v
      }
      dom.dataset.set = 1
      //点击展开
      if (v === 0) {
        let i = x,
            j = y
        for (let x = i - 1;x <= i + 1;x++) {
          for (let y = j - 1;y <= j + 1;y++) {
            if (x >= 0 && x < this.gameHN && y >= 0 && y < this.gameWN && (x!=i || y!=j)) {
              this.showNum(x, y , this.game[x][y])
            }
          }
        }
      }
    },
    //高高立起FLAG
    flag: function ($event) {
      if (this.GAMEOVER) {return}
      if (/flag/.test($event.target.className)) {
        $event.target.className = $event.target.className.replace('flag','')
      }else if ($event.target.dataset.set !== '1') {
        $event.target.className = 'l flag'
      }
    },
    //模拟双击效果
    doubleClick: function (i, j, v) {
      if (this.GAMEOVER) {return}
      //自己必须是已经点开的数字
      let dom = this.$(i, j)
      if (dom.dataset.set == '0') {return}
      //首先自己不能是空白和雷
      if (v !== 0 && v !== -1) {
        let hasFlag = 0
        let errFlag = 0
        //遍历自己周围的格子
        for (let x = i - 1;x <= i + 1;x++) {
          for (let y = j - 1;y <= j + 1;y++) {
            if (x >= 0 && x < this.gameHN && y >= 0 && y < this.gameWN && (x!=i || y!=j)) {
              //判断是否有flag
              let dom = this.$(x, y)
              if (/flag/.test(dom.className)) {
                hasFlag += 1
              }
              if (/flag/.test(dom.className) && (this.game[x][y] !== -1)) {
                errFlag += 1
              }
            }
          }
        }
        //如果有FLAG的话执行方法
        if (hasFlag >= v) {
          if (errFlag > 0) {
            //插错旗，结束游戏
            this.gameover()
          }else {
            //flag成功
            for (let x = i - 1;x <= i + 1;x++) {
              for (let y = j - 1;y <= j + 1;y++) {
                if (x >= 0 && x < this.gameHN && y >= 0 && y < this.gameWN && (x!=i || y!=j)) {
                  if (this.game[x][y] === 0) {
                    this.showNum(x, y , this.game[x][y])
                  }else {
                    let dom = this.$(x, y)
                    if (dom.dataset.set != 1 && this.game[x][y] !== -1) {
                      this.set +=1
                      dom.innerHTML = this.game[x][y]
                      dom.dataset.set = 1
                    }
                  }
                }
              }
            }
          }

        }
      }
    }
  },
  watch: {
    set: function(){
      if (this.set == this.gameWN * this.gameHN - this.boom) {
        this.GAMEOVER = true
        alert('游戏胜利')
      }
    }
  },
  mounted () {
    this.gameInit()
  }
}
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
  .canvas {
    margin: auto;
  }
  .l {
    float: left;
    text-align: center;
    border: 1px solid #000;
    cursor: default;
    background-color: #9D6C5D;
    transition: all .5s;
  }
  .l[data-set="1"] {
    background-color: #D6CBC7;
  }
  .flag:before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-color: #5D4037;
    background-image: url('../assets/saolei/flag.png');
    background-size: 100% 100%;
  }
  .boom.flag:before {
    background-color: transparent;
  }
  .boom {
    background-color: #F34336;
    background-image: url('../assets/saolei/boom.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;
  }
</style>
