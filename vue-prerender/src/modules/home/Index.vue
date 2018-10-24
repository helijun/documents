<template>
    <div class="page-home-index">
        <header>
          <h1 class="bike-title">
            <a href="//www.twobike.cn">微人类</a>
          </h1>
        </header>
        <article>
          <section class="bike-banner">

          </section>
          <section class="bike-list">

          </section>
          <section class="bike-about">

          </section>
        </article>
        <footer>

        </footer>
	      <div class="li-common-loading" ref="loading" v-show="loading"></div>

        <div class="animated fadeInDown">
          何立军
        </div>
    </div>
</template>

<script>

require("@/assets/lib/bodymovin/bodymovin.min.js")


export default {
    name: 'home-index',
    data () {
        return {
            msg: 'home-index',
            loading: false
        }
    },
    async created () {
        console.log('dataReady', this.dataReady)
    },
    mounted () {
      let animData = {
          wrapper: this.$refs.loading,
          animType: 'svg',
          loop: true,
          prerender: true,
          autoplay: true,
          path: "/static/lib/bodymovin/loading-bike.json",
      };
      this.loading = true;
      bodymovin.loadAnimation(animData);

      setTimeout(() => {
        if(this.dataReady){
          this.loading = false;
        }
      }, 5000)
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/animate/animate.css';
.page-home-index {
  header {
    position: fixed;
    right: 0;
    left: 0;
    z-index: 1000;
    height: 50px;
    min-height: 50px;
    margin-bottom: 1.6rem;
    background: #f8f8f8;
    border-width: 0 0 1px;
    border-style: solid;
    border-color: #ddd;
    color: #666;
    margin: 0 auto;
  }
}

.li-common-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10vw;
  box-sizing: border-box;

}
</style>
