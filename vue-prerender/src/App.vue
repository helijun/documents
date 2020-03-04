<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html,body {
  padding: 0;
  margin: 0;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
  min-height: 100%;
  background-color: #24292e;
  background-image: url('~@/assets/svg/home/star-bg.svg'),linear-gradient(#191c20, #24292e 15%);
  background-repeat: repeat-x;
  background-position: center 0, 0 0, 0 0;
}
h1, h2 {
  margin: 0;
  padding: 0;
}

</style>
