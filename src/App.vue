<template>
  <div id="app">
    <h1>游戏</h1>
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/saolei">扫雷</router-link>
      <router-link to="/xiaoxiaole">开心消消乐</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
