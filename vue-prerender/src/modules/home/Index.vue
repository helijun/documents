<template>
    <div class="page-home-index">
        <header>
          <h1 class="bike-title">
            <!-- <a href="//www.twobike.cn">微人类</a> -->
          </h1>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">
              <a href="#">首页</a>
            </el-menu-item>
            <el-menu-item index="2">
              <a href="./blogs/index.html" target="_blank">博客</a>
            </el-menu-item>
            <el-menu-item index="3">
              <a href="./life/index.html" target="_blank">感悟</a>
            </el-menu-item>
            <el-menu-item index="4">
              <a href="http://www.xiami.com/collect/162245539" target="_blank">民谣</a>
            </el-menu-item>
            <el-menu-item index="4">
              <a href="./info/1024.html" target="_blank">骑行</a>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">其他</template>
              <el-menu-item index="2-1">
                <a href="./book/index.html" target="_blank">1. 个人书单</a>
              </el-menu-item>
              <el-menu-item index="2-2">
                <a href="./video/index.html" target="_blank">2. 电影&电视剧</a>
              </el-menu-item>
              <el-menu-item index="2-3">
                <a href="https://github.com/helijun/react-learn" target="_blank">3. React学习</a>
              </el-menu-item>
              <el-menu-item index="2-4">
                <a href="http://www.twobike.cn/blogs/给你的jQuery项目赋予Router技能吧.html" target="_blank">4. 最新文章</a>
              </el-menu-item>
              <el-menu-item index="2-5">
                <a href="./life/闲置的2017.html" target="_blank">5. 闲置的2017</a>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </header>
        <section class="header-space"></section>
        <article>
          <section class="bike-banner">
            <h1 class="get-title">不是在写代码，就是在骑行的路上</h1>
            <p>Coding，Riding，Or Reading.</p>
          </section>
          <section class="bike-list">
            <el-row :gutter="20">
              <el-col :span="6" v-for="(item, i) in listData" :key="i">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                  <img src="~@/assets/img/home/my.png" class="image">
                  <div class="card-content">
                    <div class="title">{{item.title }}</div>
                    <div class="bottom">
                      {{item.content }}
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </section>
          <section class="bike-about">

          </section>
        </article>
        <footer>
          <p>© 2016 - 2018 by helijun</p>
        </footer>
	      <div class="li-common-loading" ref="loading" v-show="loading"></div>

        <!-- <div class="animated fadeInDown">
          何立军
        </div> -->
    </div>
</template>

<script>

require("@/assets/lib/bodymovin/bodymovin.min.js")


export default {
    name: 'home-index',
    data () {
        return {
          activeIndex: '1',
          listData: [
            {
              title: '技术博客',
              icon: '',
              content: '技术这条路，必须走到黑，不回头。日常的总结，是点点滴滴的进步。以js为核心，java，linux为辅多元化发展，不做偏安一隅的前端，ITer，请跟随兴趣一路前行。'
            },
            {
              title: '感悟',
              icon: '',
              content: '放下对生活的成见，做一个不动声色的人，因为不是所有的鱼都生活在同一片海里。在躁动的青春年纪，那些总以为是迷茫的，不过是某一刻突然安静下来的不知所措而罢，面对复杂，保持欢喜，漫漫余生，满怀期盼。'
            },
            {
              title: '民谣',
              icon: '',
              content: '我没有故事，也没有酒，可是我有民谣，虾米音乐--精选集--《民谣中毒》，一起细品民谣，让越来越快的生活节奏放慢几分。'
            },
            {
              title: '自行车',
              icon: '',
              content: '开车太快，走路太慢，自行车刚刚好。迎着风，向着朝阳，最好的时光在路上，即刻出发!--精选集--《民谣中毒》，一起细品民谣，让越来越快的生活节奏放慢几分。'
            }
          ],
          msg: 'home-index',
          loading: false
        }
    },
    async created () {

    },
    mounted () {
      let animData = {
          wrapper: this.$refs.loading,
          animType: 'svg',
          loop: true,
          prerender: true,
          autoplay: true,
          //path: "/static/lib/bodymovin/loading-bike.json",
          path: "/static/lib/bodymovin/aimee.json",
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
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: scroll;
  header {
    position: fixed;
    right: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
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

  .header-space {
    height: 60px;
    min-height: 60px;
  }
  article {
    position: relative;

    .bike-banner {
      background: #1E5B94;
      color: #fff;
      text-align: center;
      padding: 100px 0;

      .get-title {
        font-size: 200%;
        display: inline-block;
      }
    }
    .el-card {
      margin: 0 auto;
      width: 1200px;
      height: 520px;
      color: #303133;
      text-align: left;


      .image {

      }
      .card-content {
        padding: 14px;
        .title {
          font-size: 20px;
          margin-bottom: 6px;
          color: #1f8dd6;
        }

        .bottom {
          letter-spacing: 1px;
          color: #7f8c8d;
        }
      }
    }
  }
  footer {
    display: block;
    background: #2d3e50;
    margin-top: 20px;
    p {
      color: #7f8c8d;
      margin: 0 auto;
      padding: 15px 0;
      width: 1200px;
      text-align: center;
    }
  }
}

.li-common-loading {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10vw;
  box-sizing: border-box;

}
</style>
