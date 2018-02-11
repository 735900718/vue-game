<template>
  <div id="app">
    <h1>游戏</h1>
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/扫雷">扫雷</router-link>
      <router-link to="/井字游戏">井字游戏</router-link>
      <router-link to="/消消乐">开心消消乐</router-link>
      <router-link to="/拼图">拼图</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.todoList {
  list-style: none;
  text-align: left;
  li {
    &:hover {
      color: red;
      background: #ccc;
    }
    &.active {
      text-decoration: line-through;
    }
  }
}
img {
  max-width: 100%;
}
</style>
