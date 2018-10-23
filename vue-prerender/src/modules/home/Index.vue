<template>
    <div>
	      <div class="li-common-loading" ref="loading" v-show="loading"></div>

        <div class="">
          何立军
        </div>
    </div>
</template>

<script>

require("@/assets/lib/bodymovin/bodymovin.min.js")


export default {
    name: 'blog-list',
    data () {
        return {
            msg: 'blog list',
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
