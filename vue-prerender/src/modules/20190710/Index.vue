<template>
  <div class="page-home-index">
    <nav class="app-nav no-badge">
      <ul>
        <li>
          <span @click="navShow = true">回到旧版</span>
          <ul v-show="navShow">
            <li>
              <a href="#/" class="active">
                <img
                  class="emoji"
                  src="https://github.githubassets.com/images/icons/emoji/uk.png"
                  alt="uk"
                /> English
              </a>
            </li>
            <li>
              <a href="#/zh-cn/">
                <img
                  class="emoji"
                  src="https://github.githubassets.com/images/icons/emoji/cn.png"
                  alt="cn"
                /> 中文
              </a>
            </li>
            <li>
              <a href="#/de-de/">
                <img
                  class="emoji"
                  src="https://github.githubassets.com/images/icons/emoji/de.png"
                  alt="de"
                /> Deutsch
              </a>
            </li>
            <li>
              <a href="#/es/">
                <img
                  class="emoji"
                  src="https://github.githubassets.com/images/icons/emoji/es.png"
                  alt="es"
                /> Spanish
              </a>
            </li>
            <li>
              <a href="#/ru/">
                <img
                  class="emoji"
                  src="https://github.githubassets.com/images/icons/emoji/ru.png"
                  alt="ru"
                /> Russian
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <div class="page-one" @click="navShow = false">
      <div class="cover-main">
        <p>
          <img src="~@/assets/img/20190710/logo.jpg" alt="logo" />
        </p>
        <h1>
          <a href="#/?id=pageTwo" data-id="pageTwo" class="anchor">
            <span>
              微人类
              <!-- <small>4.9.4</small> -->
            </span>
          </a>
        </h1>
        <blockquote>
          <p>不是在写代码，就是在骑行的路上</p>
        </blockquote>
        <ul>
          <li>Coding，Riding，Or Reading.</li>
          <li>The unexamined life is not worth living.</li>
          <!-- 混混噩噩的生活不值得过。/睡什么睡，起来嗨！ -->
        </ul>
        <p>
          <a href="https://www.twobike.cn/" target="_blank">GitHub</a>
          <a href="#/?id=pageTwo">Getting Started</a>
        </p>
      </div>
    </div>
    <main class="page-two" id="main">
      <acticle class="el-content">
        <H-header :headerRgba="headerRgba" :headerOpacity="headerOpacity"></H-header>

        <div class="el-sidebar">
          <div class="el-avatar">
            <img src="~@/assets/img/20190710/logo.jpg" alt="logo" />
          </div>
          <p class="el-name">微人类</p>

          <div class="el-links">
            <a
              class="active"
              aria-current="page"
              href="/?spm=a2oj1.12028025.leftbar.1.5477d15aqNpo3Z"
              data-spm-anchor-id="a2oj1.12028025.leftbar.1"
            >目录</a>
            <a href="/billboard" data-spm-anchor-id="a2oj1.12028025.leftbar.2">关于</a>
            <a href="/list/collect" data-spm-anchor-id="a2oj1.12028025.leftbar.3">时间轴</a>
            <a href="/list/artist" data-spm-anchor-id="a2oj1.12028025.leftbar.4">书单</a>
            <a href="/genre/gid/2" data-spm-anchor-id="a2oj1.12028025.leftbar.5">影视</a>
            <a href="/list/album" data-spm-anchor-id="a2oj1.12028025.leftbar.6">音乐</a>
            <a href="/list/mv" data-spm-anchor-id="a2oj1.12028025.leftbar.7">最新文章</a>
            <a href="/list/mv" data-spm-anchor-id="a2oj1.12028025.leftbar.7">我的简历</a>
          </div>
        </div>

        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>

        <div class="el-content-main">
          <div class="el-nav">
            <el-row :gutter="20">
              <el-col :span="12">
                <div
                  class="grid-content bg-purple"
                  @click="handleUrlClick('https://www.cnblogs.com/liliangel')"
                >
                  <div class="el-title">
                    <i :class="['iconfont', 'icon-xinwen']"></i>
                    <span>闹心技术</span>
                  </div>
                  <div
                    class="el-txt"
                  >技术这条路，必须走到黑，不回头。日常的总结，是点点滴滴的进步。以js为核心，java，linux为辅多元化发展，不做偏安一隅的前端，ITer，请跟随兴趣一路前行。</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div
                  class="grid-content bg-purple"
                  @click="handleUrlClick('https://www.twobike.cn/life/index.html#/')"
                >
                  <div class="el-title">
                    <i :class="['iconfont', 'icon-xinwen']"></i>
                    <span>随心感悟</span>
                  </div>
                  <div
                    class="el-txt"
                  >放下对生活的成见，做一个不动声色的人，因为不是所有的鱼都生活在同一片海里。在躁动的青春年纪，那些总以为是迷茫的，不过是某一刻突然安静下来的不知所措而罢，面对复杂，保持欢喜，漫漫余生，满怀期盼。</div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div
                  class="grid-content bg-purple"
                  @click="handleUrlClick('https://www.xiami.com/collect/162245539')"
                >
                  <div class="el-title">
                    <i :class="['iconfont', 'icon-xinwen']"></i>
                    <span>走心民谣</span>
                  </div>
                  <div class="el-txt">我没有故事，也没有酒，可是我有民谣，虾米音乐--精选集--《民谣中毒》，一起细品民谣，让越来越快的生活节奏放慢几分。</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div
                  class="grid-content bg-purple"
                  @click="handleUrlClick('http://tieba.baidu.com/p/3279735352?pid=57042307869&amp;cid=0#57042307869')"
                >
                  <div class="el-title">
                    <i :class="['iconfont', 'icon-xinwen']"></i>
                    <span>悦心骑行</span>
                  </div>
                  <div class="el-txt">开车太快，走路太慢，自行车刚刚好。迎着风，向着朝阳，最好的时光在路上，即刻出发！</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="el-who">
            <div class="el-common-title">WHO</div>
            <div class="el-who-content">
              <p>轻度代码洁癖患者，资深业余骑行家，对历史感兴趣，爱看书，顾家，会做饭。</p>
              <p>在深圳的湖南人，老家醴陵，不会说长沙话。</p>
              <p>目前陷入了迷茫。。</p>
            </div>
          </div>
          <div class="el-timeline">
            <div class="el-common-title">时间轴</div>
          </div>
          <div class="el-books">
            <div class="el-common-title">我的书单</div>
            <div class="el-books-content">
              <el-row :gutter="40">
                <el-col :span="6">
                  <el-collapse accordion>
                    <el-collapse-item>
                      <template slot="title">2019年</template>
                      <ul>
                        <li>谈美</li>
                        <li>谈文学</li>
                        <li>皮囊</li>
                        <li>我所理解的生活 -韩寒</li>
                        <li>菊与刀</li>
                        <li>浮生六记</li>
                        <li>曾国藩家书</li>
                        <li>冰鉴</li>
                        <li>传习录</li>
                        <li>万历十五年</li>
                      </ul>
                    </el-collapse-item>
                  </el-collapse>
                </el-col>
                <el-col :span="6">
                  <el-collapse accordion>
                    <el-collapse-item>
                      <template slot="title">2018年</template>
                      <ul>
                        <li>给青年的十二封信 -朱光潜</li>
                        <li>爱的五种能力</li>
                        <li>少有人走的路</li>
                        <li>未来世界的幸存者 -阮一峰</li>
                        <li>谈修养</li>
                        <li>情商</li>
                      </ul>
                    </el-collapse-item>
                  </el-collapse>
                </el-col>
                <el-col :span="6">
                  <el-collapse accordion>
                    <el-collapse-item>
                      <template slot="title">2017年</template>
                      <ul>
                        <li>Vue.js 权威指南</li>
                        <li>ES6 标准入门</li>
                        <li>我只是敢跟别人不一样</li>
                        <li>人工智能 -李开复</li>
                        <li>深入 React 技术栈 -陈屹</li>
                        <li>React 前端技术与工程实践</li>
                        <li>浮躁 -贾平凹</li>
                        <li>社会契约论</li>
                        <li>Javascript 高级程序设计</li>
                      </ul>
                    </el-collapse-item>
                  </el-collapse>
                </el-col>
                <el-col :span="6">
                  <el-collapse accordion>
                    <el-collapse-item>
                      <template slot="title">2016年</template>
                      <ul>
                        <li>最好的时光在路上</li>
                        <li>追风筝的人</li>
                      </ul>
                    </el-collapse-item>
                  </el-collapse>
                </el-col>
              </el-row>
              <p
                class="el-cursor he-align-left"
                @click="handleUrlClick('https://www.twobike.cn/book/index.html#/')"
              >查看更多</p>
            </div>
          </div>
          <div class="el-timeline">
            <div class="el-common-title">看过的电影/电视剧</div>
          </div>
          <div class="el-timeline">
            <div class="el-common-title">在听的音乐</div>
          </div>
          <div class="el-timeline">
            <div class="el-common-title">最新文章</div>
          </div>
        </div>
      </acticle>
    </main>
  </div>
</template>

<script>
import HHeader from "@/components/Header20190712";
export default {
  name: "home-index",
  data() {
    return {
      navShow: false,
      headerRgba: 0,
      headerOpacity: 1,
      activeIndex: "1",
      listData: [
        {
          title: "技术博客",
          icon: "icon-xinwen",
          url: "http://www.cnblogs.com/liliangel",
          content:
            "技术这条路，必须走到黑，不回头。日常的总结，是点点滴滴的进步。以js为核心，java，linux为辅多元化发展，不做偏安一隅的前端，ITer，请跟随兴趣一路前行。"
        },
        {
          title: "感悟",
          icon: "icon-idea",
          url: "https://www.twobike.cn/life/index.html",
          content:
            "放下对生活的成见，做一个不动声色的人，因为不是所有的鱼都生活在同一片海里。在躁动的青春年纪，那些总以为是迷茫的，不过是某一刻突然安静下来的不知所措而罢，面对复杂，保持欢喜，漫漫余生，满怀期盼。"
        },
        {
          title: "民谣",
          icon: "icon-music",
          url: "https://www.xiami.com/collect/162245539",
          content:
            "我没有故事，也没有酒，可是我有民谣，虾米音乐--精选集--《民谣中毒》，一起细品民谣，让越来越快的生活节奏放慢几分。"
        },
        {
          title: "自行车",
          icon: "icon-zixingche",
          url:
            "http://tieba.baidu.com/p/3279735352?pid=57042307869&cid=0#57042307869",
          content:
            "开车太快，走路太慢，自行车刚刚好。迎着风，向着朝阳，最好的时光在路上，即刻出发!"
        }
      ],
      aboutData: [
        {
          icon: "icon-jian",
          type: "link",
          link: ""
        },
        {
          icon: "icon-iconweixin",
          type: "alert",
          img: ""
        },
        {
          icon: "icon-boke3",
          type: "alert",
          img: ""
        },
        {
          icon: "icon-github",
          type: "link",
          link: ""
        }
      ],
      msg: "home-index",
      loading: false
    };
  },
  components: {
    HHeader
  },
  async created() {},
  mounted() {},
  methods: {
    handleUrlClick(url) {
      if (window.innerWidth >= 0) {
        window.open(url);
      } else {
        window.location.href = url;
      }
    },
    refresh(cb) {
      setTimeout(() => {
        this.headerRgba = 0;
        cb && cb(0);
      }, 1000);
    },
    onInfinite() {},

    //top 距离顶部的像素点
    onPulling(top) {
      console.log("距离顶部的像素点", top);
      if (top && top > 0) {
        this.headerOpacity = 1 - top / 100;
      }
    },

    refreshFinsh() {
      setTimeout(() => {
        this.headerOpacity = 1;
      }, 500);
    },

    onScroll(e) {
      let scrollTop = e.target.scrollTop;
      this.floatimgRightPx = scrollTop + 300 + "px";

      console.log("scrollTop1", scrollTop);
      if (scrollTop <= 200) {
        this.headerRgba = 0;
      } else if (scrollTop > 200 && scrollTop <= 500) {
        //if(scrollTop % 5 == 0){ //防抖节流
        console.log("scrollTop2---------->>>>>>", scrollTop);
        this.headerRgba = scrollTop / 300;
        //}
        //this.activeHeight = "40vh";
      } else {
        this.headerRgba = 1;
        this.headerRgba = 1; //解决正在刷新时又上滑透明度不还原问题
        //this.activeHeight = "44px";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/index.scss";

.common-width {
  margin: 0 auto !important;
  width: 1200px !important;

  @media #{$media} and ($media-max-width: $max-width-768) {
    width: 100vw !important;
  }
}
* {
  -webkit-font-smoothing: antialiased;
  -webkit-overflow-scrolling: touch;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-text-size-adjust: none;
  -webkit-touch-callout: none;
  box-sizing: border-box;
}

.page-home-index {
  box-sizing: border-box;
  overflow-x: hidden;
  background-color: #fff;
  z-index: 1;
  font-family: Source Sans Pro, Helvetica Neue, Arial, sans-serif;
  nav {
    margin-right: 25px;
    margin: 25px 60px 0 0;
    position: absolute;
    right: 0;
    text-align: right;
    z-index: 2;

    ul {
      display: inline-block;
      list-style: none;
      margin: 0;

      li {
        display: inline-block;
        margin: 0 1rem;
        padding: 5px 0;
        position: relative;
        list-style: none;

        ul {
          min-width: 100px;
          background-color: #fff;
          border: 1px solid #ddd;
          border-bottom-color: #ccc;
          border-radius: 4px;
          box-sizing: border-box;
          max-height: calc(100vh - 61px);
          overflow-y: auto;
          padding: 10px 0;
          position: absolute;
          right: -15px;
          text-align: left;
          top: 100%;
          white-space: nowrap;

          li {
            display: block;
            font-size: 14px;
            line-height: 1rem;
            margin: 0;
            margin: 8px 14px;
            white-space: nowrap;
            padding: 5px 0;
            position: relative;
            list-style: none;
            a {
              display: block;
              font-size: inherit;
              margin: 0;
              padding: 0;
              text-decoration: none;
              transition: color 0.3s;
              img {
                height: 1.2rem;
                vertical-align: middle;
                max-width: 100%;
              }
              &:active {
                color: var(--theme-color, #42b983);
              }
            }
          }
        }
      }
    }
  }
  .page-one {
    display: flex;
    align-items: center;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    background: linear-gradient(
      to left bottom,
      hsl(6, 100%, 85%) 0%,
      hsl(49, 100%, 85%) 100%
    );
    height: 100vh;
    width: 100vw;

    .cover-main {
      flex: 1;
      margin: -20px 16px 0;
      text-align: center;
      z-index: 1;
    }
    h1 {
      color: inherit;
      font-size: 2.5rem;
      font-weight: 300;
      margin: 0.625rem 0 2.5rem;
      position: relative;
      text-align: center;

      a {
        display: block;
        color: inherit;
        transition: all 0.3s;

        span {
          color: #34495e;
        }
      }
    }
    blockquote {
      font-size: 1.5rem;
      text-align: center;
    }
    ul {
      line-height: 1.8;
      list-style-type: none;
      margin: 1em auto;
      max-width: 500px;
      padding: 0;
    }
    p {
      line-height: 1.5rem;
      margin: 1em 0;
      img {
        width: 150px;
        border-radius: 8px;
      }
      &:last-child {
        a {
          border: 1px solid var(--theme-color, #42b983);
          border-radius: 2rem;
          box-sizing: border-box;
          color: var(--theme-color, #42b983);
          display: inline-block;
          font-size: 1.05rem;
          letter-spacing: 0.1rem;
          margin: 0.5rem 1rem;
          padding: 0.75em 2rem;
          text-decoration: none;
          transition: all 0.15s ease;

          &:last-child {
            background-color: var(--theme-color, #42b983);
            color: #fff;
          }
        }
      }
    }
  }
  .page-two {
    display: block;
    position: relative;
    overflow: hidden;
    background-color: white;
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(to left bottom, #00bcd4 0%, #fff1b3 100%);

    .el-content {
      display: block;
      position: relative;
      margin: 0 auto;
      width: 1366px;
      min-height: 100vh;
      .el-sidebar {
        border: 0;
        outline: none;
        padding: 10px;
        position: absolute;
        top: 15%;
        margin-left: 80px;
        text-align: center;
        transition: opacity 0.3s;
        width: 265px;
        min-height: 403px;
        z-index: 4;
        padding: 30px;
        background: #fff;

        .el-avatar {
          width: 100px;
          height: 100px;
          text-align: center;
          margin: 0 auto;
          display: block;

          img {
            border-radius: 50%;
            width: 100%;
          }
        }
        .el-name {
          margin-top: 10px;
          font-size: 20px;
          font-weight: 700;
          text-align: center;
          max-width: 205px;
        }
        .el-links {
          display: flex;
          flex-direction: column;
          text-align: left;
          padding-left: 40px;

          a {
            display: block;
            text-align: left;
            margin-top: 9px;
            height: 32px;
            line-height: 32px;
            color: #4a4a4a;
            font-size: 14px;
            font-weight: 300;
            text-decoration: none;
            white-space: nowrap;
            transition: color 0.2s;
            &:first-child {
              font-weight: bolder;
              border-bottom: 3px solid;
              color: #666;
            }
            &:active {
              color: #999;
            }
          }
        }
      }
      .el-carousel {
        margin-top: 20px;
        height: 294px;
        overflow: hidden;
        background-color: #999;
      }
      .el-content-main {
        margin-top: 20px;
        margin-left: 400px;
        padding: 20px;

        .el-nav {
          .el-row {
            text-align: center;
            &:last-child {
              margin-top: 20px;
            }
            .grid-content {
              cursor: pointer;
              text-align: left;
              line-height: 22px;
              width: 300px;
              text-align: justify;
              //box-shadow: 1px 1px 1px 1px #ccc;
              padding: 10px 16px 10px 0;
              border-radius: 4px;
              .el-title {
                font-size: 22px;
                margin-bottom: 10px;
              }
              .el-txt {
                color: #4a4a4a;
                font-size: 14px;
                font-weight: 400;
              }
            }
          }
        }
        .el-common-title {
          display: block;
          text-align: left;
          color: #4a4a4a;
          font-weight: 500;
          white-space: nowrap;
          font-size: 24px;
          line-height: 40px;
          margin: 20px 0;
          border-bottom: 2px solid;
          color: #666;
          max-width: 100px;
        }
        .el-common-txt {
          display: block;
          text-align: left;
          color: #4a4a4a;
        }
        .el-common-indent {
          text-indent: 28px;
        }
        .el-cursor {
          cursor: pointer;
        }
        .el-who {
          .el-who-content {
            @extend .el-common-txt;
            @extend .el-common-indent;
          }
        }

        .el-books {
          .el-books-content {
          }
        }
        /deep/ .el-collapse {
          border: 0;
          .el-collapse-item__header {
            background: transparent !important;
            border-bottom: 0;
          }
          .el-collapse-item__wrap {
            background: transparent !important;
            border-bottom: 0;
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
