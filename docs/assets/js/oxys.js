
lottie.setQuality(2);

// Ball making animation
var ballMaking = document.getElementById('ballMaking');
var ball = bodymovin.loadAnimation({
    wrapper: ballMaking,
    animType: 'svg',
    loop: false,
    path: '/assets/lottie-data/ballmaking.json',
    rendererSettings: {
      progressiveLoad: true, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
      hideOnTransparent: true //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
    }
});



ball.addEventListener('complete', function() {
    setTimeout(function(){
      ball.setDirection(1);
      ball.goToAndPlay(0);
    }, 1000);
  })

  // Design ball animation
var designBall = document.getElementById('designBall');
var dball = bodymovin.loadAnimation({
    wrapper: designBall,
    animType: 'svg',
    loop: true,
    path: '/assets/lottie-data/designball.json'
});

dball.setSpeed(1.25);