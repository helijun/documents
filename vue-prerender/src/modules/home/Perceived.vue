<template>
    <div class="hello">
        <section class="cd-fixed-bg bg-one">
            <h1 class="project-name">Feituo-oneplace</h1>
            <h2 class="project-tagline">《有一个地方只有我们知道》，H5页面，视觉落差效果</h2>
        </section>
        <section class="cd-scrolling-bg">
          <div class="cd-scrolling-bg__content">
          <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore incidunt suscipit similique, dolor corrupti cumque qui consectetur autem laborum fuga quas ipsam doloribus sequi, mollitia, repellendus sapiente repudiandae labore rerum amet culpa inventore, modi non. Quo nisi veritatis vitae nam, labore fugit. Inventore culpa iusto, officia exercitationem. Voluptates quibusdam odit odio incidunt consequatur, consectetur aspernatur optio vitae molestias, quas repellendus fugit ullam culpa, eligendi et dignissimos voluptatibus illum? Molestias aliquam nostrum quasi ipsa culpa, iusto explicabo ut error, consequuntur enim temporibus, adipisci tempora voluptate, id consequatur mollitia eveniet blanditiis. Illo quod repellendus alias? Cum rem doloremque adipisci accusantium? Saepe, necessitatibus!
          </p>
          </div>
        </section>

        <section class="cd-fixed-bg bg-two">
            <h1 class="project-name">Feituo-oneplace</h1>
            <h2 class="project-tagline">《有一个地方只有我们知道》，H5页面，视觉落差效果</h2>
        </section>
        <section class="cd-scrolling-bg">
          <div class="cd-scrolling-bg__content">
          <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore incidunt suscipit similique, dolor corrupti cumque qui consectetur autem laborum fuga quas ipsam doloribus sequi, mollitia, repellendus sapiente repudiandae labore rerum amet culpa inventore, modi non. Quo nisi veritatis vitae nam, labore fugit. Inventore culpa iusto, officia exercitationem. Voluptates quibusdam odit odio incidunt consequatur, consectetur aspernatur optio vitae molestias, quas repellendus fugit ullam culpa, eligendi et dignissimos voluptatibus illum? Molestias aliquam nostrum quasi ipsa culpa, iusto explicabo ut error, consequuntur enim temporibus, adipisci tempora voluptate, id consequatur mollitia eveniet blanditiis. Illo quod repellendus alias? Cum rem doloremque adipisci accusantium? Saepe, necessitatibus!
          </p>
          </div>
        </section>

        <section class="cd-fixed-bg bg-one">
            <h1 class="project-name">Feituo-oneplace</h1>
            <h2 class="project-tagline">《有一个地方只有我们知道》，H5页面，视觉落差效果</h2>
        </section>
        <section class="cd-scrolling-bg">
          <div class="cd-scrolling-bg__content">
          <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore incidunt suscipit similique, dolor corrupti cumque qui consectetur autem laborum fuga quas ipsam doloribus sequi, mollitia, repellendus sapiente repudiandae labore rerum amet culpa inventore, modi non. Quo nisi veritatis vitae nam, labore fugit. Inventore culpa iusto, officia exercitationem. Voluptates quibusdam odit odio incidunt consequatur, consectetur aspernatur optio vitae molestias, quas repellendus fugit ullam culpa, eligendi et dignissimos voluptatibus illum? Molestias aliquam nostrum quasi ipsa culpa, iusto explicabo ut error, consequuntur enim temporibus, adipisci tempora voluptate, id consequatur mollitia eveniet blanditiis. Illo quod repellendus alias? Cum rem doloremque adipisci accusantium? Saepe, necessitatibus!
          </p>
          </div>
        </section>

        <section class="cd-fixed-bg bg-two">
            <h1 class="project-name">Feituo-oneplace</h1>
            <h2 class="project-tagline">《有一个地方只有我们知道》，H5页面，视觉落差效果</h2>
        </section>
        <section class="cd-scrolling-bg">
          <div class="cd-scrolling-bg__content">
          <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore incidunt suscipit similique, dolor corrupti cumque qui consectetur autem laborum fuga quas ipsam doloribus sequi, mollitia, repellendus sapiente repudiandae labore rerum amet culpa inventore, modi non. Quo nisi veritatis vitae nam, labore fugit. Inventore culpa iusto, officia exercitationem. Voluptates quibusdam odit odio incidunt consequatur, consectetur aspernatur optio vitae molestias, quas repellendus fugit ullam culpa, eligendi et dignissimos voluptatibus illum? Molestias aliquam nostrum quasi ipsa culpa, iusto explicabo ut error, consequuntur enim temporibus, adipisci tempora voluptate, id consequatur mollitia eveniet blanditiis. Illo quod repellendus alias? Cum rem doloremque adipisci accusantium? Saepe, necessitatibus!
          </p>
          </div>
        </section>

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
.page-header {
    height: 50vh;
    color: #fff;
    text-align: center;
    background-color: #159957;
    background-image: linear-gradient(120deg, #155799, #159957);
}

.cd-fixed-bg {
    position: relative;
    min-height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    z-index: 1;
    background-attachment: fixed;
}
.cd-scrolling-bg {
    position: relative;
    min-height: 100%;
    padding: 4em 0;
    line-height: 1.6;
    -webkit-box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
    z-index: 2;
    padding: 8em 0;
    font-size: 2rem;
    line-height: 2;
    font-weight: 300;
}

.bg-one {
    background-image: url('../../assets/img/home/home.jpg');
}
.bg-two {
    background-image: url('https://codyhouse.co/demo/alternate-fixed-scroll-background/img/cd-background-2.jpg');
}


#main{
    width: 1280px;
    margin:auto
}
.header{
    background:#fff;
    padding: 0;
    /*height: 500px;*/
}
.bg-attachment{
    background:url("../../assets/img/home/home1.jpg") center center no-repeat;
    background-size: 750px 1356px;
    background-attachment:fixed;
}
.bg-attachment .shadow{
    display: flex;
    align-items: center;
    justify-content: center;
    width:60%;
    height:500px;
    overflow:hidden;
    margin:auto;
    color: blue;
    background: rgba(0,0,0,.3);
}
.div2{
    background:url("http://50jia-website.oss-cn-beijing.aliyuncs.com/tuiguang/qz0721/M_01.jpg") center center repeat-y;
    background-attachment:fixed;
}
</style>
