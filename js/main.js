var paragraph, viewport,
  started = false,
  ended = false,
  posStartY = 0,
  touchStartY = 0;

window.addEventListener("DOMContentLoaded", function() {
  initBackstrectch();
  initAudio();
  animateStartPage();
  initParagraph();
}, false);

function initBackstrectch() {
  $(".viewport").backstretch([
    "/img/background/begin.jpg",
    "/img/background/slide1.jpg",
    "/img/background/slide2.jpg",
    "/img/background/slide3.jpg",
    "/img/background/slide4.jpg",
    "/img/background/slide5.jpg",
    "/img/background/slide6.jpg",
    "/img/background/slide7.jpg",
    "/img/background/end.jpg"
  ], { duration: 6000, fade: 3000 });

  $(".viewport").backstretch("pause");
}

function initAudio() {
  var media = $(".media"),
    play_status = $(".status"),
    audio_btn = $(".audio");

  media.bind("canplay", function() {
    media.get(0).play();
  }).bind("play", function() {
    audio_btn.addClass("playing").removeClass("off");
    play_status.addClass("rotate");
  }).bind("pause", function() {
    audio_btn.addClass("off").removeClass("playing");
    play_status.removeClass("rotate");
  });

  audio_btn.click(function() {
    $(this).hasClass("off") ? media.get(0).play() : media.get(0).pause();
  });
}

function animateStartPage() {
  setTimeout(function() {
    $(".logo-begin").animate({ opacity: 1, top: "50%" }, 1000, function() {
      initTouchHandler();
    });
    $(".arrow").addClass("arrow-loop");
  }, 3000);
}

function initParagraph() {
  var elem = document.querySelector(".paragraph");
  paragraph = new Paragraph(elem);
  animate();
}

function initTouchHandler() {
  viewport = document.querySelector('.viewport');
  if (typeof window.ontouchstart !== 'undefined') {
    viewport.addEventListener('touchstart', tap);
  }
  viewport.addEventListener('mousedown', tap);
}

function tap(event) {
  removeStartPage();

  event.preventDefault();
  paragraph.isDragging = true;
  posStartY = paragraph.y;

  if (event.targetTouches && (event.targetTouches.length >= 1)) {
    touchStartY = event.targetTouches[0].pageY;
    setPosition(event);
    viewport.addEventListener('touchmove', drag);
    viewport.addEventListener('touchend', release);
  }
  else {
    touchStartY = event.pageY;
    setPosition(event);
    viewport.addEventListener('mousemove', drag);
    viewport.addEventListener('mouseup', release);
  }
}

function drag(event) {
  setPosition(event);
}

function release(event) {
  paragraph.isDragging = false;

  viewport.removeEventListener('touchmove', drag);
  viewport.removeEventListener('touchend', release);
  viewport.removeEventListener('mousemove', drag);
  viewport.removeEventListener('mouseup', release);
}

function setPosition(event) {
  var moveY = 0;
  if (event.targetTouches && (event.targetTouches.length >= 1)) {
    moveY = event.targetTouches[0].pageY - touchStartY;
  }
  else {
    moveY = event.pageY - touchStartY;
  }
  paragraph.dragY = posStartY + moveY;
}

function removeStartPage() {
  if (!started) {
    $(".logo-begin").animate({ opacity: 0}, 500, function() {
      $(".arrow").remove();
      $(".viewport").backstretch("resume");
    });
    started = true;
  }
}

function beginEndPage() {
  if (!ended && paragraph.y === (paragraph.mask.clientHeight - paragraph.height - paragraph.maskShadowSpread)) {
    $(".viewport").backstretch("show", 8);
    $(".viewport").backstretch("pause");
    $(".paragraph").delay(2000).animate({ opacity: 0}, 1000);
    $(".logo-end").delay(3000).animate({ opacity: 1, top: "25%" }, 1000);
    $(".white-book").delay(4000).animate({ opacity: 1, marginTop: "10px" }, 1000);
    $(".quote").delay(5000).animate({ opacity: 1, marginTop: 0 }, 1000);
    $(".white-button").delay(6000).animate({ opacity: 1, bottom: "10%" }, 1000);
    ended = true;
  }
}

function animate() {
  paragraph.applyDragForce();
  paragraph.update();
  paragraph.checkEdges();
  paragraph.render();
  beginEndPage();
  requestAnimationFrame(animate);
}
