module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  themeConfig: {
	sidebar: [
      '/',
      '/page-a',
      ['/page-b', 'Explicit link text']
    ],
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
    ],
	// 假定 GitHub。也可以是一个完整的 GitLab 网址
    repo: 'vuejs/vuepress',
    // 如果你的文档不在仓库的根部
    docsDir: 'docs',
    // 可选，默认为 master
    docsBranch: 'master',
    // 默认为 true，设置为 false 来禁用
    editLinks: true
  }
}