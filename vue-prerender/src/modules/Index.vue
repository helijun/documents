<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="/test">/test hello</router-link>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  async created () {
    console.log('dataReady', this.dataReady)

    await this.testPromise()
    this.dataReady = true;
    console.log('await dataReady', this.dataReady)

    await Promise.all([this.testPromise(), this.testPromise2()])
    console.log('await Promise all')
    
  },
  methods: {
    testPromise() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('2 resolve')
          resolve();
        }, 2000)
      })
    },
    testPromise2() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('3 resolve')
          resolve();
        }, 3000)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
