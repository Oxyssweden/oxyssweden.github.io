
lottie.setQuality(2);

// Ball making animation
var ballMaking = document.getElementById('ballMaking');
var ball = bodymovin.loadAnimation({
    wrapper: ballMaking,
    animType: 'svg',
    loop: true,
    autoplay: false,
    path: '/assets/lottie-data/ballmaking.json'
});

function handleIntersectionBall(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      console.log('spela?');
      ball.play();
    } else {
      console.log('sluta?');
      ball.pause();
    }
  });
}
const ballObserver = new IntersectionObserver(handleIntersectionBall);
ballObserver.observe(ballMaking);


// Design ball animation
var designBall = document.getElementById('designBall');
var dball = bodymovin.loadAnimation({
    wrapper: designBall,
    animType: 'svg',
    loop: true,
    autoplay: false,
    path: '/assets/lottie-data/designball.json'
});
dball.setSpeed(1.25);

function handleIntersectionDball(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      dball.play();
    } else {
      dball.pause();
    }
  });
}
const dballObserver = new IntersectionObserver(handleIntersectionDball);
dballObserver.observe(designBall);


