"use strict";

document.addEventListener('DOMContentLoaded', function () {
  
  const sections = document.querySelectorAll(".js-spy");
  const menu_links = document.querySelectorAll(".nav-list a");

  // functions to add and remove the active class from links as appropriate
  const makeActive = (link) => menu_links[link].classList.add("active");
  const removeActive = (link) => menu_links[link].classList.remove("active");
  const removeAllActive = () => [...Array(sections.length).keys()].forEach((link) => removeActive(link));
  // const sectionMargin = 200;

  let currentActive = 0;
  window.addEventListener("scroll", () => {

    const current = sections.length - [...sections].reverse().findIndex((section) => window.scrollY >= section.offsetTop - 300) - 1
    if (current !== currentActive) {
      removeAllActive();
      currentActive = current;
      makeActive(current);
    }
  });

  function mobileMenu() {
    $('.nav-list a[href^="#"]').click(function (event) {
      event.preventDefault();
      closeMenu();
      $('html,body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
      }, 1000);
    });
  }
  if (window.innerWidth < 992) {
    mobileMenu();
  }
});

const animItems = document.querySelectorAll(".js-show");
const showAnimation = () => {
  const trigger = (window.innerHeight / 5) * 4;
  animItems.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;
    if (itemTop < trigger) {
      item.classList.add("show");
    } else {
      item.classList.remove("show");
    }
  });
}

window.addEventListener("scroll", showAnimation);
showAnimation();

gsap.registerPlugin(CSSRulePlugin, ScrollTrigger, ScrollToPlugin);



var burger = document.querySelector(".js-burger");
var menu = document.querySelector(".js-header-nav");
var body = document.querySelector("body");

var toggleMenu = function toggleMenu() {

  burger.addEventListener("click", function () {
    if (!menu.classList.contains("active")) {
      // menu.classList.add("active");
      // burger.classList.add("active");
      // body.classList.add("locked");
      openMenu();
    } else {
      // menu.classList.remove("active");
      // burger.classList.remove("active");
      // body.classList.remove("locked");
      closeMenu();
    }
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 992) {
      menu.classList.remove("active");
      burger.classList.remove("active");
      body.classList.remove("locked");
    }
  });
};
toggleMenu();

const openMenu = () => {
  menu.classList.add("active");
  burger.classList.add("active");
  body.classList.add("locked");
}

const closeMenu = () => {
  menu.classList.remove("active");
  burger.classList.remove("active");
  body.classList.remove("locked");
}



const preloader = () => {

  gsap.from('body', { duration: 2, opacity: 0, delay: 1 });
  gsap.fromTo('.preloader', { opacity: 1 }, { opacity: 0, duration: 1, display: 'none', delay: 2 });
  gsap.from('.preloader__icon', { duration: 1, x: '100%', delay: 1 });
  gsap.from('.preloader__word', { duration: 1, x: '-50%', opacity: 0, delay: 1 });
  gsap.from('.header-row', { duration: 1, y: '-200%', delay: 3 });
  gsap.from('.hero__content', { duration: 1, x: '-20px', opacity: 0, delay: 3 });
  gsap.from('.hero-cta__content', { duration: 1, x: '-20px', opacity: 0, delay: 3 });
  gsap.from('.hero__img img', { duration: 1, x: '-20px', scale: 1.2, opacity: 0, delay: 3 });
  gsap.from('.hero-cta__img img', { duration: 1, x: '-20px', scale: 1.2, opacity: 0, delay: 3 });
  gsap.from(CSSRulePlugin.getRule(".hero:before"), { duration: 1, x: '20px', opacity: 0, delay: 3 });
}


const preloaderInner = () => {
  gsap.from('body', { duration: 2, opacity: 0, delay: 1 });
}

const innerPage = document.querySelector('.inner-page');
if (innerPage) {
  preloaderInner();
  document.querySelector('.nav-wrapper').style.display = 'none';
  burger.style.display = 'none';
};

const homePage = document.querySelector('.home-page');
if (homePage) {
  preloader();
  var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

  function preventDefault(e) {
    e.preventDefault();
  }

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }
  window.history.scrollRestoration = "manual";
  // modern Chrome requires { passive: false } when adding event
  var supportsPassive = false;
  try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
      get: function () { supportsPassive = true; }
    }));
  } catch (e) { }

  var wheelOpt = supportsPassive ? { passive: false } : false;
  var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

  // call this to Disable
  function disableScroll() {
    console.log('disabled');
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
  }

  // call this to Enable
  function enableScroll() {
    console.log('enable');
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
  }

  ScrollTrigger.matchMedia({
    '(min-width: 993px)': function () {
      var settingUp = true;
      const instances = [];
      var buttonClicked = false;

      instances.push(
        ScrollTrigger.create({
          trigger: ".section__gift",
          markers: false,
          start: '100% 55%',
          end: '100% 55%',
          preventOverlaps: true,
          fastScrollEnd: true,
          onEnter: () => {
            if (!buttonClicked && !settingUp) {
              disableScroll();
              console.log('enter GIFT');
              gsap.to('.js-img-1', { onStart: disableScroll, duration: 1, maxWidth: '100vw', height: '100vh', width: '100vw', top: '100%' });
              gsap.to(window, {
                onStart: disableScroll,
                scrollTo: { y: "#section4", autoKill: false },
                overwrite: true,
                duration: 1,
              });
              setTimeout(function () {
                gsap.to(window, {
                  scrollTo: { y: "#section5", autoKill: false },
                  overwrite: true,
                  duration: 1,
                  onComplete: enableScroll,
                });
              }, 1500);
            }
          },

          onEnterBack: () => {
            console.log('enter BACK GIFT');
          },
        })
      );
      instances.push(
        ScrollTrigger.create({
          trigger: ".img-cover",
          markers: false,
          start: '100% 55%',
          end: '100% 55%',
          preventOverlaps: true,
          fastScrollEnd: true,
          onEnter: () => {
            console.log('enter cover 1');
            disableScroll();
          },
          onEnterBack: () => {
            if (!buttonClicked && !settingUp) {
              // goToSection(i)
              disableScroll();
              // console.log('leave');
              gsap.to(window, {
                onStart: disableScroll,
                scrollTo: { y: "#section4", autoKill: false },
                overwrite: true,
                duration: 1,
                // onComplete: enableScroll,
              });
              gsap.to('.js-img-1', { delay: 1.5, duration: 1, maxWidth: '44%', height: '100%', width: '44%', top: '0' });

              setTimeout(function () {
                gsap.to(window, {
                  scrollTo: { y: "#section3", autoKill: false },
                  overwrite: true,
                  duration: 1,
                  onComplete: enableScroll,
                });
              }, 1500);
            }
            console.log('enter BACK COVER 1');
          },
        })
      );
      instances.push(
        ScrollTrigger.create({
          trigger: ".cta__img",
          start: '40% 50%',
          end: '40% 50%',
          markers: false,
          preventOverlaps: true,
          fastScrollEnd: true,
          onEnter: () => {
            if (!buttonClicked && !settingUp) {
              // goToSection(i)
              console.log('enter cta');
              disableScroll();
              gsap.to(window, {
                onStart: disableScroll,
                scrollTo: { y: "#section8", autoKill: false },
                overwrite: true,
                duration: 1,
              });
              gsap.to('.js-img-2', { duration: 1, maxWidth: '44%', height: '100%', width: '44%', bottom: '0', delay: 1.5 });
              setTimeout(function () {
                gsap.to(window, {
                  scrollTo: { y: "#section9", autoKill: false },
                  overwrite: true,
                  duration: 1,
                  onComplete: enableScroll,
                });
              }, 1500);
            }
            console.log('enter COVER 2');
          },
          onEnterBack: () => {
            disableScroll();
            console.log('leave');
            if (!buttonClicked && !settingUp) {
              console.log('enter BACK COVER 2');
            }
          },
        })
      );
      instances.push(
        ScrollTrigger.create({
          trigger: ".js-section__cta",
          start: '0 50%',
          end: '0 50%',
          markers: false,
          preventOverlaps: true,
          fastScrollEnd: true,
          onEnter: () => {
            disableScroll();
            if (!buttonClicked && !settingUp) {
              // goToSection(i)
              console.log('enter CTA');
            }
          },
          onEnterBack: () => {

            if (!buttonClicked && !settingUp) {
              // goToSection(i)
              console.log('leave cta')
              disableScroll();
              gsap.to(window, {
                onStart: disableScroll,
                scrollTo: { y: "#section8", autoKill: false },
                overwrite: true,
                duration: 1,
              });
              gsap.to('.js-img-2', { duration: 1, maxWidth: '100%', height: '100vh', width: '100vw', bottom: '100%' });
              setTimeout(function () {
                gsap.to(window, {
                  scrollTo: { y: "#section7", autoKill: false },
                  overwrite: true,
                  duration: 1,
                  onComplete: enableScroll,
                });
              }, 1500);
            }
            console.log('enter BACK CTA');
          }
        })
      );
      document.querySelectorAll(".nav-list a").forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          triggers.forEach(ins => ins.disable());
          console.log(triggers);
          buttonClicked = true;
          console.log(buttonClicked, settingUp);
          gsap.to('.nav-wrapper', { duration: 0, opacity: 1, pointerEvents: 'initial' });
          if (index === 0) {
            if (buttonClicked) {
              gsap.to('.js-img-1', { duration: 1, maxWidth: '44%', height: '100%', width: '44%', top: '0' });
              gsap.to(window, {
                duration: 1, scrollTo: {
                  y: "#section2", autoKill: false,
                }
              });
            }
            console.log(buttonClicked, settingUp);
          }
          if (index === 1) {
            if (buttonClicked) {
              gsap.to('.js-img-1', { duration: 1, maxWidth: '100vw', height: '100vh', width: '100vw', top: '100%' });
              gsap.to(window, {
                duration: 1, scrollTo: { y: "#section5", autoKill: false },
              });
            }
          }
          if (index === 2) {
            if (buttonClicked) {
              console.log('3');
              gsap.to('.js-img-1', { duration: 1, maxWidth: '100vw', height: '100vh', width: '100vw', top: '100%' });
              gsap.to(window, {
                duration: 1, scrollTo: { y: "#section6", autoKill: false },
              });
            }
          }
          if (index === 3) {
            if (buttonClicked) {
              gsap.to('.js-img-1', { duration: 1, maxWidth: '100vw', height: '100vh', width: '100vw', top: '100%' });
              gsap.to(window, {
                duration: 1, scrollTo: { y: "#section7", autoKill: false },
              });
              console.log('4');
            }
          }
          setTimeout(function () {
            triggers.forEach(ins => ins.enable());
            buttonClicked = false;
            enableScroll();
            console.log(buttonClicked, settingUp);
          }, 1000);
        });
      });
      gsap.utils.toArray(".section").forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          markers: false,
          start: 'top center',
          end: 'top center',
          preventOverlaps: true,
          fastScrollEnd: true,
          onEnter: () => {
            if (i >= 1 && i < 2) {
              gsap.to('.nav-wrapper', { duration: .1, opacity: 1, pointerEvents: 'initial' });
            } else if (i >= 4 && i <= 6) {
              gsap.to('.nav-wrapper', { duration: .1, opacity: 1, pointerEvents: 'initial' });
            } else {
              gsap.to('.nav-wrapper', { duration: .1, opacity: 0, pointerEvents: 'none' });
            }
            if (i === 5) {
              gsap.to('.nav-list a', { duration: .1, color: '#0D0A0B' });
            } else {
              gsap.to('.nav-list a', { duration: .1, color: '#E6E6E6' });
            }
          },
          onEnterBack: () => {
            console.log(i);
            if (i <= 7 && i >= 5 || i === 2) {
              gsap.to('.nav-wrapper', { duration: .1, opacity: 1, pointerEvents: 'initial' });
            } else if (i <= 4 && i >= 3) {
              gsap.to('.nav-wrapper', { duration: .1, opacity: 0, pointerEvents: 'none' });
            }
            else {
              gsap.to('.nav-wrapper', { duration: .1, opacity: 0, pointerEvents: 'none' });
            }
            if (i === 6) {
              gsap.to('.nav-list a', { duration: .1, color: '#0D0A0B' });
            } else {
              gsap.to('.nav-list a', { duration: .1, color: '#E6E6E6' });
            }
          }
        });

      });
      let triggers = ScrollTrigger.getAll();
      settingUp = false;
      triggers.forEach(trigger => {
        trigger.clearScrollMemory
      })
    }
  });
}

const accordion = document.querySelector(".accordion");
const accordionItems = document.querySelectorAll(".accordion__item");
const accordionContent = document.querySelectorAll(".accordion__panel");
if (accordion) {
  const toggleAccordion = () => {
    accordion.addEventListener("click", (e) => {
      const parent = e.target.parentNode;
      let panel = parent.querySelector(".accordion__panel");
      if (parent.classList.contains("accordion__item")) {
        if (parent.classList.contains("active")) {
          parent.classList.remove("active");
          panel.style.maxHeight = null;
        } else {
          accordionItems.forEach((item) => {
            item.classList.remove("active");
          });
          accordionContent.forEach((item) => {
            item.style.maxHeight = null;
          })
          parent.classList.add("active");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      }

    })
  }
  toggleAccordion();
}

var testWebP = function testWebP(callback) {
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    callback(webP.height === 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
};

testWebP(function (support) {
  if (support === true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
}); // run for sprite svg support 

svg4everybody();

const dropMenu = () => {
  let blockSort = document.getElementById("sort");
  if (!!blockSort) {
    let blockList = document.getElementById("sort-list");
    let elemItemSelect = document.querySelectorAll(".sort-select__item");
    let elemCurrent = document.getElementById("current-value");
    let active = document.querySelector("#sort-list li.active");

    elemCurrent.textContent = active.textContent;

    const hideSelectMenu = () => {
      blockList.classList.remove('container-active');
      blockSort.classList.remove('turn-arrow');
      blockList.style.maxHeight = '0';
    };

    const showSelectMenu = () => {
      blockList.classList.add('container-active');
      blockList.style.maxHeight = blockList.scrollHeight + 'px';
      blockSort.classList.add('turn-arrow');
    };

    const onMouseScroll = () => {
      if (!blockList.classList.contains('container-active')) {
        return
      }
      if (window.scrollY > 0) {
        hideSelectMenu();
      }
    };

    const onOutsideClick = (e) => {
      if (!blockList.classList.contains('container-active')) {
        return
      }
      if (!e.target.classList.contains('sort-select__item') && !e.target.classList.contains('sort-select__current')) {
        hideSelectMenu();
      }
      ;
    };

    const onSelectClick = () => {
      blockList.classList.contains('container-active')
        ? hideSelectMenu()
        : showSelectMenu();
    };

    blockSort.addEventListener('click', onSelectClick);
    window.addEventListener('click', onOutsideClick);
    window.addEventListener('scroll', onMouseScroll);

    elemItemSelect.forEach(item => item.addEventListener('click', function () {
      let elemItemSelectActive = document.querySelectorAll('.sort-select__item.active');
      elemItemSelectActive.forEach(itemActive => itemActive.classList.remove('active'));
      item.classList.add('active');
      elemCurrent.textContent = item.textContent;
      elemCurrent.setAttribute('data-value', item.getAttribute('data-value'));
    }))
  }
};

const setTitleTags = () => {
  const titles = document.querySelectorAll('.editor-blog__content>h2');
  const navbarContainer = document.querySelector('.navbar-blog>ul');
  if (titles.length > 0) {
    for (let i = 0; i < titles.length; i++) {
      let id = `article${i + 1}`;
      titles[i].setAttribute("id", id)
      let titleOfElement = titles[i].innerHTML;
      let newElement = document.createElement('li');
      i === 0 && newElement.classList.add('active');
      newElement.innerHTML = `<a href="#${id}">${titleOfElement}</a>`;
      navbarContainer.append(newElement)
    }
  }
}

const scrollAnchors = () => {
  const yOffset = -20;
  const anchors = document.querySelectorAll('a[href*="#"]');
  if (anchors.length > 0) {
    for (let anchor of anchors) {
      anchor.addEventListener('click', function (e) {
        if (anchor.getAttribute('href').charAt(0) === '#') {
          e.preventDefault()
          const blockID = anchor.getAttribute('href').substring(1);
          const obj = document.getElementById(blockID);
          const y = obj.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({top: y, behavior: 'smooth'});
        }
      })
    }
  }
};

const navbarActive = () => {
  const anchors = document.querySelectorAll('.navbar-blog>ul>li');
  if (anchors.length > 0) {
    anchors.forEach(anchor => {
      anchor.onclick = () => {
        document.querySelector('.navbar-blog>ul>.active').classList.remove('active');
        anchor.classList.add('active');
      }
    })
  }
}

const copyBtn = document.querySelector('.btn-copy');

if (copyBtn) {
  const copyBlogLink = () => {
    navigator.clipboard.writeText(window.location.href);
    copyBtn.classList.add('active');
    setTimeout(() => {
      copyBtn.classList.remove('active');
    }, 1000);
  }

  copyBtn.addEventListener('click', copyBlogLink);
}

setTitleTags()
dropMenu()
scrollAnchors()
navbarActive()


