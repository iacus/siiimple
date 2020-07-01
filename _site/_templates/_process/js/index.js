import { Menu, Images } from './views';

Menu.init();
// Images.init();

function fadeOut(el, ms = 400) {
   if (ms) {
      el.style.transition = `opacity ${ms} ms`;
      el.addEventListener(
         'transitionend',
         function (event) {
            el.style.display = 'none';
         },
         false
      );
   }
   el.style.opacity = '0';
}

function fadeIn(elem, ms = 400) {
   elem.style.opacity = 0;

   if (ms) {
      let opacity = 0;
      const timer = setInterval(function () {
         opacity += 50 / ms;
         if (opacity >= 1) {
            clearInterval(timer);
            opacity = 1;
         }
         elem.style.opacity = opacity;
      }, 50);
   } else {
      elem.style.opacity = 1;
   }
}

const forEach = function (array, callback, scope) {
   for (var i = 0; i < array.length; i++) {
      callback.call(scope, i, array[i]); // passes back stuff we need
   }
};

const tabSelector = document.querySelectorAll('.tabs__list li');

tabSelector.forEach((el) => {
   const id = el.getAttribute('data-id');
   const targetTab = document.getElementById(id);
   const allTabs = document.querySelectorAll('.tabs__block');

   el.addEventListener('mouseenter', function () {
      [...allTabs].forEach((tab) => {
         tab.style.display = 'none';
      });
      targetTab.style.display = 'block';
   });
});
