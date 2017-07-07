var example = {};

var WIDTH = 300;
var HEIGHT = 300;

introduction = {
  scale: '绘制矩形, 然后将坐标系的 x y 坐标放大到200%, 再次绘制矩形',
  rotate: '将坐标系顺时针旋转20度, 绘制矩形',
  translate: '在位置 (10, 10) 处绘制一个矩形, 将新的 (0, 0) 位置设置为 (70, 70), 再次绘制新的矩形, 请注意现在矩形从位置 (80,80) 开始绘制',

  save: '保存当前坐标系的状态, 即scale translate rotate方法调用后的结果',
  restore: '恢复之前保存的坐标系的状态',

  drawImage: '绘制项目目录内的图片../../resources/cat.jpg到画布上',
  fillText: '使用 fillText(), 在画布上写文本 "Hello world!"',
  fill: '绘制 150*100 像素的矩形, 然后用绿色来给它填色',
  stroke: '绘制一条路径, 形状是绿色的字母 L',

  beginPath: '创建一条新路径作为当前路径',
  moveTo: '',
  lineTo: '绘制一条路径, 形状是字母 L',
  rect: '创建',
  arc: '创建一个圆形',
  quadraticCurveTo: '绘制一条二次贝塞尔曲线',
  bezierCurveTo: '绘制一条三次贝塞尔曲线',
  closePath: '绘制一条路径, 形式是字母 L, 然后绘制线条以返回开始点',

  setFillStyle: '设置当前填充样式',
  setStrokeStyle: '设置当前描边样式',
  setShadow: '设置当前阴影样式',
  setFontSize: '设置当前字体大小',

  setLineCap: '设置线条的结束端点样式',
  setLineJoin: '设置两条线相交时所创建的拐角类型',
  setLineWidth: '设置当前的线条宽度',
  setMiterLimit: '设置线条的最大斜接长度'
}

example.reset = function (context) {
  context.beginPath();

  context.setFillStyle('#000000');
  context.setStrokeStyle('#000000');
  context.setFontSize(10);

  context.setShadow(0, 0, 0, 'rgba(0, 0, 0, 0)');

  context.setLineCap('butt');
  context.setLineJoin('miter');
  context.setLineWidth(1);
  context.setMiterLimit(10);
};

example.scale = function (context) {
  context.beginPath();
  context.rect(25, 25, 50, 50);
  context.stroke();

  context.scale(2,2);

  context.beginPath();
  context.rect(25, 25, 50, 50);
  context.stroke();
};

example.rotate = function (context) {
  context.beginPath();
  context.rotate(20*Math.PI/180);
  context.rect(50, 20, 100, 50);
  context.fill(); 
};

example.translate = function (context) {
  context.beginPath();
  context.rect(10, 10, 100, 50);
  context.fill();

  context.translate(70, 70);

  context.beginPath();
  context.fillRect(10, 10, 100, 50);
  context.fill();
};

example.save = function (context) {
  context.beginPath();
  context.setStrokeStyle('#00ff00');
  context.save();

  context.scale(2, 2);
  context.setStrokeStyle('#ff0000');
  context.rect(0, 0, 100, 100);
  context.stroke();
  context.restore();

  context.rect(0, 0, 50, 50);
  context.stroke();
};

example.restore = function (context) {
  [3, 2, 1].forEach(function (item) {
    context.beginPath();
    context.save();
    context.scale(item, item);
    context.rect(10, 10, 100, 100);
    context.stroke();
    context.restore();       
  });

};

example.drawImage = function (context) {
  context.drawImage('../../resources/cat.jpg', 0, 0);
};

example.fillText = function (context) {
  context.setStrokeStyle('#ff0000');

  context.beginPath();
  context.moveTo(0, 10);
  context.lineTo(300, 10);
  context.stroke();

  // context.save();
  // context.scale(1.5, 1.5);
  // context.translate(20, 20);
  context.setFontSize(10);
  context.fillText('Hello World', 0, 30);
  context.setFontSize(20);
  context.fillText('Hello World', 100, 30);

  // context.restore();

  context.beginPath();
  context.moveTo(0, 30);
  context.lineTo(300, 30);
  context.stroke();
};

example.fill = function (context) {
  context.beginPath();
  context.rect(20, 20, 150, 100);
  context.setStrokeStyle('#00ff00');
  context.fill();
};

example.stroke = function (context) {
  context.beginPath();
  context.moveTo(20, 20);
  context.lineTo(20, 100);
  context.lineTo(70, 100);
  context.setStrokeStyle('#00ff00');
  context.stroke();
};

example.clearRect = function (context) {
  context.setFillStyle('#ff0000');
  context.beginPath();
  context.rect(0, 0, 300, 150);
  context.fill();
  context.clearRect(20, 20, 100, 50);
};

example.beginPath = function (context) {
  context.beginPath();
  context.setLineWidth(5);
  context.setStrokeStyle('#ff0000');
  context.moveTo(0, 75);
  context.lineTo(250, 75);
  context.stroke();

  context.beginPath();
  context.setStrokeStyle('#0000ff');
  context.moveTo(50, 0);
  context.lineTo(150, 130);
  context.stroke();
};

example.closePath = function (context) {
  context.beginPath();
  context.moveTo(20, 20);
  context.lineTo(20, 100);
  context.lineTo(70, 100);
  context.closePath();
  context.stroke();
};

example.moveTo = function (context) {
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(300, 150);
  context.stroke();
};

example.lineTo = function (context) {
  context.beginPath();
  context.moveTo(20,20);
  context.lineTo(20,100);
  context.lineTo(70,100);
  context.stroke();
};

example.rect = function (context) {
  context.beginPath();
  context.rect(20, 20, 150, 100);
  context.stroke();
};

example.arc = function (context) {
  context.beginPath();
  context.arc(75,75,50,0,Math.PI*2,true);
  context.moveTo(110,75);
  context.arc(75,75,35,0,Math.PI,false);
  context.moveTo(65,65);
  context.arc(60,65,5,0,Math.PI*2,true);
  context.moveTo(95,65);
  context.arc(90,65,5,0,Math.PI*2,true);
  context.stroke();
};

example.quadraticCurveTo = function (context) {
  context.beginPath();
  context.moveTo(20, 20);
  context.quadraticCurveTo(20, 100, 200, 20);
  context.stroke();
};

example.bezierCurveTo = function (context) {
  context.beginPath();
  context.moveTo(20, 20);
  context.bezierCurveTo(20, 100, 200, 100, 200, 20);
  context.stroke();
};

example.setFillStyle = function (context) {
  ['#fef957', 'rgb(242,159,63)', 'rgb(242,117,63)', '#e87e51'].forEach(function (item, index) {
    context.setFillStyle(item);
    context.beginPath();
    context.rect(0 + 75*index, 0, 50, 50);
    context.fill();
  });
};

example.setStrokeStyle = function (context) {
  ['#fef957', 'rgb(242,159,63)', 'rgb(242,117,63)', '#e87e51'].forEach(function (item, index) {
    context.setStrokeStyle(item);
    context.beginPath();
    context.rect(0 + 75*index, 0, 50, 50);
    context.stroke();
  });
};

example.setShadow = function (context) {
  context.beginPath();
  context.setShadow(10, 10, 10, 'rgba(0, 0, 0, 199)');
  context.rect(10, 10, 100, 100);
  context.fill();
};

example.setFontSize = function (context) {
  [10, 20, 30, 40].forEach(function (item, index) {
    context.setFontSize(item);
    context.fillText('Hello, world', 20, 20 + 40*index);
  })
};

example.setLineCap = function (context) {
  context.setLineWidth(10);
  ['butt', 'round', 'square'].forEach(function (item, index) {
    context.beginPath();
    context.setLineCap(item);
    context.moveTo(20, 20 + 20*index);
    context.lineTo(100, 20 + 20*index);
    context.stroke(); 
  });
};

example.setLineJoin = function (context) {
  context.setLineWidth(10);
  ['bevel', 'round', 'miter'].forEach(function (item, index) {
    context.beginPath();
    
    context.setLineJoin(item);
    context.moveTo(20 + 80*index, 20);
    context.lineTo(100 + 80*index, 50);
    context.lineTo(20 + 80*index, 100);
    context.stroke();
  });
};

example.setLineWidth = function (context) {
  [2, 4, 6, 8, 10].forEach(function (item, index) {
    context.beginPath();
    context.setLineWidth(item);
    context.moveTo(20, 20 + 20*index);
    context.lineTo(100, 20 + 20*index);
    context.stroke();          
  });
};

example.setMiterLimit = function (context) {
  context.setLineWidth(4);

  [2, 4, 6, 8, 10].forEach(function (item, index) {
    context.beginPath();
    context.setMiterLimit(item);
    context.moveTo(20 + 80*index, 20);
    context.lineTo(100 + 80*index, 50);
    context.lineTo(20 + 80*index, 100);
    context.stroke();          
  });        
};

Page({
  data: {
    method: '',
    introduction: '',
    hidden: false
  },
  onLoad: function (res) {
    this.context = wx.createContext();
    this.hidden = false;
    this.method = res.method;
    this.setState({
      method: res.method,
      introduction: introduction[res.method]
    });

    this.drawCanvas();
  },
  drawCanvas: function () {
    example[this.method](this.context);

    wx.drawCanvas({
      canvasId: 'mycanvas',
      actions: this.context.getActions(),
      success: function () {
        console.log('绘制成功');
      },
      fail: function (errMsg) {
        console.log('绘制失败: ' + errMsg);
      }
    });
  }
});