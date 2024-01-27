---
layout: page
permalink: /gallery/
title: gallery
description: Places I've been to
nav: false
nav_order: 0
---

<html>
<head>
<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.image {
  flex: 1; /* 두 이미지가 동일한 비율로 화면에 나타나게 함 */
  padding: 10px; /* 이미지 사이의 간격 */
}
</style>
</head>
<body>

<div class="container">
  <div class="image">
    <img src="/assets/img/gallery/2024_rss_talk_joseph_1.jpg" alt="Presentation: Skill Learning, CLVRAI Lab." style="width:100%;">
  </div>
  <div class="image">
    <img src="/assets/img/gallery/2024_rss_talk_joseph_2.jpg" alt="Presentation: Skill Learning, CLVRAI Lab." style="width:100%;">
  </div>
</div>

</body>
</html>

<html>
<head>
<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.image {
  flex: 1; /* 두 이미지가 동일한 비율로 화면에 나타나게 함 */
  padding: 10px; /* 이미지 사이의 간격 */
}
</style>
</head>
<body>

<div class="container">
  <div class="image">
    <img src="/assets/img/gallery/2024_rss_rilab_1.jpg" alt="RILab." style="width:100%;">
  </div>
  <div class="image">
    <img src="/assets/img/gallery/2024_rss_rilab_2.jpg" alt="RILab." style="width:100%;">
  </div>
</div>

</body>
</html>

<!-- <html>
<head>
<style>
.image-container {
  position: relative;
  width: 50%; /* 이미지 컨테이너의 너비를 조정 */
}
.image {
  display: none; /* 초기에는 이미지를 숨김 */
  width: 100%;
  height: auto;
}
.image.active {
  display: block; /* 활성 이미지만 보여줌 */
}
</style>
</head>
<body>

<div class="image-container">
  <img class="image" src="/assets/img/gallery/2024_rss_talk_joseph_1.jpg" alt="Presentation: Skill Learning, CLVRAI Lab.">
  <img class="image" src="/assets/img/gallery/2024_rss_talk_joseph_2.jpg" alt="Presentation: Skill Learning, CLVRAI Lab.">
  <button onclick="toggleImages()">Toggle Images</button>
</div>

<script>
var currentImage = 0;
function toggleImages() {
  var images = document.getElementsByClassName('image');
  currentImage = (currentImage + 1) % images.length; // 다음 이미지로 넘어가기
  for (var i = 0; i < images.length; i++) {
    images[i].style.display = 'none'; // 모든 이미지 숨김
  }
  images[currentImage].style.display = 'block'; // 현재 이미지만 보여줌
}
toggleImages(); // 페이지 로드 시 첫 번째 이미지 활성화
</script>

</body>
</html> -->
