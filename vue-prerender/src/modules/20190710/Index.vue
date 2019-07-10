<template>
  <div>
    <div class="page-home-index">
      <nav class="app-nav no-badge">
        <ul>
          <li>
            <span @click="navShow = true">导航</span>
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
    </div>

    <main id="main" style="width: 100vw;height: 100vh;">
      <iframe
        style="width: 100vw;height: 100vh;"
        src="https://www.twobike.cn/life/index.html#/"
        frameborder="0"
      ></iframe>
    </main>
  </div>
</template>

<script>
export default {
  name: "home-index",
  data() {
    return {
      navShow: false,
      headerRgba: 0,
      headerOpacity: 1,
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
  components: {},
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
  main {
    display: block;
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    iframe {
      width: 100vw;
      height: 100vh;
    }

    .sidebar-toggle {
      background-color: transparent;
      background-color: hsla(0, 0%, 100%, 0.8);
      border: 0;
      outline: none;
      padding: 10px;
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: center;
      transition: opacity 0.3s;
      width: 284px;
      z-index: 4;

      span {
        background-color: var(--theme-color, #42b983);
        display: block;
        margin-bottom: 4px;
        width: 16px;
        height: 2px;
      }
    }
    .content {
      padding-top: 60px;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 300px;
      transition: left 0.25s ease;

      .markdown-section {
        margin: 0 auto;
        max-width: 800px;
        padding: 30px 15px 40px;
        position: relative;
      }
    }
  }
}
</style>
