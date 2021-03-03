lottie.setQuality(2);

// Ball making animation
var ballMaking = document.getElementById('ballMaking');

if (ballMaking) {
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
        ball.play();
      } else {
        ball.pause();
      }
    });
  }
  const ballObserver = new IntersectionObserver(handleIntersectionBall);
  ballObserver.observe(ballMaking);
}


// Design ball animation
var designBall = document.getElementById('designBall');

if(designBall) {
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
}


scrollTo = (element) => {
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: element.offsetTop
  });
  console
}

const anchorDesign = document.getElementById("anchorDesign");
const anchorSupport = document.getElementById("anchorSupport");
const anchorTech = document.getElementById("anchorTech");

if(anchorDesign) {
  anchorDesign.addEventListener('click', () => {
    scrollTo(document.getElementById("design"));
  });
}

if(anchorSupport) {
  anchorSupport.addEventListener('click', () => {
    scrollTo(document.getElementById("support"));
  });
}

if(anchorTech) {
  anchorTech.addEventListener('click', () => {
    scrollTo(document.getElementById("tech"));
  });
}


// FADE UP
document.querySelectorAll('.fadeup').forEach((i) => {
  if (i) {
      const observer = new IntersectionObserver((entries) => {
          observerCallbackFadeUp(entries, observer, i)
      },
      {threshold: 0.3});    
      observer.observe(i);
  }
});

const observerCallbackFadeUp = (entries, observer, header) => {
  entries.forEach((entry, i) => {
       if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
       }
  });
};

// FADE OUT
document.querySelectorAll('.fadeout').forEach((i) => {
  if (i) {
      const observer = new IntersectionObserver((entries) => {
          observerCallbackFadeOut(entries, observer, i)
      },
      {threshold: 0.01});    
      observer.observe(i);
  }
});

const observerCallbackFadeOut = (entries, observer, header) => {
  entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('out-view');
        } else {
          entry.target.classList.add('out-view');
        }
  });
};









// const links = document.querySelectorAll(".page-categories__item a");
 
// for (const link of links) {
//   link.addEventListener("click", scrollTo(document.body, elmnt.offsetTop, 600););


// }
 
// function clickHandler(e) {
//   e.preventDefault();
//   console.log('pelle');
//   const href = this.getAttribute("href");
//   console.log(href.substring(1));
//   console.log(document.getElementById(href.substring(1)));
//   const offsetTop = document.getElementById(href.substring(1)).offsetTop;
 
//   scroll({
//     top: offsetTop,
//     behavior: "smooth"
//   });
// }



// function scrollTo(element, to, duration) {
//   if (duration <= 0) return;
//   var difference = to - element.scrollTop;
//   var perTick = difference / duration * 10;

//   setTimeout(function() {
//       element.scrollTop = element.scrollTop + perTick;
//       if (element.scrollTop === to) return;
//       scrollTo(element, to, duration - 10);
//   }, 10);
// }

// elmnt = document.getElementById("footer");
// scrollTo(document.body, elmnt.offsetTop, 600);