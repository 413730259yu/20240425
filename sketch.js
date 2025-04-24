let circles = [];
let stars = [];
let isStackingStars = false; // 狀態變數，控制是否堆積星星
const colors = ['#e27396', '#ea9ab2', '#efcfe3', '#eaf2d7', '#b3dee2']; // 指定的顏色

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1'); // 設定畫布為最底層
  background('#3a7ca5'); // 修改畫布背景顏色

  generateCircles();
}

function draw() {
  background('#3a7ca5'); // 修改畫布背景顏色

  if (isStackingStars) {
    // 星星堆積效果
    for (let star of stars) {
      fill(star.color.levels[0], star.color.levels[1], star.color.levels[2], 150); // 加入透明度
      noStroke();
      drawStar(star.x, star.y, star.size / 2, star.size, 5); // 繪製星星

      if (star.y + star.size / 2 < height) {
        star.y += star.speed; // 星星向下移動
      } else {
        star.y = height - star.size / 2; // 停止在底部
        star.speed = 0; // 停止移動
      }
    }
  } else {
    // 繪製圓形並加入流動效果
    let sizeFactor = map(mouseX, 0, width, 0.5, 2);
    for (let circle of circles) {
      fill(circle.color.levels[0], circle.color.levels[1], circle.color.levels[2], 150); // 加入透明度
      noStroke();
      ellipse(circle.x, circle.y, circle.size * sizeFactor);

      // 更新圓形位置
      circle.x += circle.dx;
      circle.y += circle.dy;

      // 如果圓形超出畫布邊界，讓它從另一側出現
      if (circle.x > width) circle.x = 0;
      if (circle.x < 0) circle.x = width;
      if (circle.y > height) circle.y = 0;
      if (circle.y < 0) circle.y = height;
    }
  }

  // 檢查 iframe 是否顯示
  const iframe = document.getElementById('content-frame');
  if (iframe && iframe.style.display === 'none') {
    // 畫面中間顯示霓虹文字
    textAlign(CENTER, CENTER);

    // 繪製霓虹效果（多層文字）
    for (let i = 15; i > 0; i--) {
      let alpha = map(i, 15, 0, 50, 0); // 更平滑的透明度漸層
      let sizeOffset = map(i, 15, 0, 0, 20); // 更自然的文字大小變化
      fill(255, 255, 255, alpha); // 透明度遞減
      textSize(160 + sizeOffset); // 每層文字稍微放大
      text('教育科技學系', width / 2, height / 2);
    }

    // 繪製主文字
    fill(255); // 白色文字
    textSize(160);
    text('教育科技學系', width / 2, height / 2);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (!isStackingStars) {
    generateCircles(); // 視窗調整時重新分佈圓圈
  }
}

function generateCircles() {
  circles = [];
  for (let i = 0; i < 40; i++) {
    circles.push({
      x: random(windowWidth),
      y: random(windowHeight),
      size: random(40, 120),
      dx: random(-2, 2), // 隨機設定 x 軸移動速度
      dy: random(-2, 2), // 隨機設定 y 軸移動速度
      color: color(random(colors)) // 隨機選擇指定的顏色並轉換為 p5.js 的 color 物件
    });
  }
}

function generateStars() {
  stars = [];
  for (let i = 0; i < 100; i++) { // 增加星星數量
    stars.push({
      x: random(windowWidth),
      y: random(-height, 0),
      size: random(20, 50),
      speed: random(2, 5),
      color: color(random(colors)) // 隨機選擇指定的顏色並轉換為 p5.js 的 color 物件
    });
  }
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// 點擊自我介紹、作品集、測驗卷或教學影片時觸發堆積效果
document.querySelector('a[href="#about"]').addEventListener('click', () => {
  isStackingStars = true;
  generateStars();
});

document.querySelector('a[href="#portfolio"]').addEventListener('click', () => {
  isStackingStars = true;
  generateStars();
});

document.querySelector('a[href="#quiz"]').addEventListener('click', () => {
  isStackingStars = true;
  generateStars();
});

document.querySelector('a[href="#videos"]').addEventListener('click', () => {
  isStackingStars = true;
  generateStars();
});

// 點擊首頁時啟用背景圓形流動效果
document.querySelector('a[href="#"]').addEventListener('click', () => {
  isStackingStars = false; // 停止星星堆積效果
  generateCircles(); // 重新生成圓形
});
