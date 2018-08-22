<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    
  </div>
</template>

<script>
export default {
  name: 'blog-list',
  data () {
    return {
      msg: 'blog list'
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
