

export const Menu = {
   settings: {
      trigger: document.querySelector('.trigger'),
      body: document.body,
      content: document.querySelector('.content'),
      cross: document.querySelector('.cross')
   },
   init: function () {
      let s = this.settings;
      s.trigger.addEventListener('click', () => {
         s.body.classList.add('open');
      });

      s.content.addEventListener('click', () => {
         s.body.classList.remove('open');
      });

      s.cross.addEventListener('click', () => {
         s.body.classList.remove('open');
      });
   }
}

export const Images = {
   settings: {
      elements: document.querySelectorAll('.values li')
   },
   init: function () {
      this.elements.forEach((el) => {
         const id = el.getAttribute('data-id');
         const imgRoute = el.getAttribute('data-img');
         const image = document.createElement('img');
         const sibling = el.closest('.half').querySelector('.half__image');
         image.id = id;
         image.src = imgRoute;
         sibling.append(image);

         el.addEventListener('mouseenter', function () {
            document.getElementById(id).style.opacity = 1;
         });
      });
   }
}


