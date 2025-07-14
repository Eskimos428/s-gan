document.addEventListener('DOMContentLoaded', function () {



  /*Куки*/
  const cookieBanner = document.querySelector('.cookies__container');
  const acceptCookiesButton = document.getElementById('accept-cookies');

  acceptCookiesButton.addEventListener('click', function () {
    cookieBanner.style.display = 'none';
  });



  /*выпадающее меню в header */
  document.querySelectorAll('.dropdown-column').forEach(column => {
    const sublist = column.querySelector('.dropdown-sublist');
    if (sublist) {
      column.classList.add('has-sublist');

      column.addEventListener('mouseenter', () => {
        // Можно добавить анимацию появления подкатегорий
        sublist.style.opacity = '1';
        sublist.style.maxHeight = '500px';
      });
    }
  });



  //swiper main

  const swiperAuto = new Swiper('.swiper-auto', {
    direction: 'vertical',
    loop: true,
    slidesPerView: 2,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
    },
  });


  //swiper blog

  const swiper = new Swiper('.swiper-blog', {
    loop: false,
    slidesPerView: 4,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });



  //табы 
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  // Функция для анимации карточек
  function animateCards(container) {
    const cards = container.querySelectorAll('.grid-3__item');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';

      setTimeout(() => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      tabBtns.forEach(b => b.classList.remove('active'));

      this.classList.add('active');

      const tabId = this.getAttribute('data-tab');

      tabContents.forEach(content => {
        if (content.id === tabId) {
          setTimeout(() => {
            content.classList.add('active');
            animateCards(content);
          }, 10);
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // Анимация карточек при загрузке для активного таба
  animateCards(document.querySelector('.tab-content.active'));

  // Имитация добавления в корзину
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function () {
      alert('Товар добавлен в корзину');
      // Здесь будет логика добавления в корзину
    });
  });

  // Имитация быстрого просмотра
  document.querySelectorAll('.view-card').forEach(icon => {
    icon.addEventListener('click', function (e) {
      e.stopPropagation(); // Предотвращаем всплытие события
      alert('Быстрый просмотр товара');
    });
  });



  //бегущая строка
  const marquee = document.querySelector('.marquee');
  const items = marquee.innerHTML;

  // Дублируем содержимое для плавной анимации
  marquee.innerHTML = items + items;

  // Случайное выделение элементов при загрузке
  const allItems = document.querySelectorAll('.marquee-item');
  allItems.forEach(item => {
    if (Math.random() > 0.7) {
      item.classList.add('highlight');
    }

    // Анимация при наведении
    item.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.1)';
      this.style.transition = 'transform 0.3s ease';
    });

    item.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1)';
    });
  });

  // Изменение скорости в зависимости от ширины экрана
  function adjustMarqueeSpeed() {
    const marqueeElement = document.querySelector('.marquee');
    const width = window.innerWidth;

    if (width < 768) {
      marqueeElement.style.animationDuration = '20s';
    } else {
      marqueeElement.style.animationDuration = '40s';
    }
  }

  window.addEventListener('resize', adjustMarqueeSpeed);
  adjustMarqueeSpeed();



  //Аккордеон 
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq__header');

    header.addEventListener('click', () => {
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      item.classList.toggle('active');
    });
  });

  // Открываем первый элемент по умолчанию
  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
  }


  //модальное окно при старте 
  const modal = document.getElementById('promoModal');
  const closeBtn = document.querySelector('.close-btn');
  const modalBtn = document.querySelector('.modal-btn');
  const dontShowAgain = document.getElementById('dontShowAgain');

  // Проверяем, не отключил ли пользователь показ модального окна
  if (!localStorage.getItem('hidePromoModal')) {
    // Показываем модальное окно с небольшой задержкой для лучшего UX
    setTimeout(() => {
      modal.style.display = 'flex';
    }, 1000);
  }

  // Закрытие модального окна при клике на крестик
  closeBtn.addEventListener('click', function () {
    closeModal();
  });

  // Закрытие модального окна при клике на кнопку
  modalBtn.addEventListener('click', function () {
    closeModal();
  });

  // Закрытие модального окна при клике вне его области
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  function closeModal() {
    // Если отмечен чекбокс "Больше не показывать", сохраняем это в localStorage
    if (dontShowAgain.checked) {
      localStorage.setItem('hidePromoModal', 'true');
    }

    // Анимация закрытия
    modal.style.animation = 'modalFadeIn 0.3s ease-out reverse';
    setTimeout(() => {
      modal.style.display = 'none';
      modal.style.animation = 'modalFadeIn 0.3s ease-out';
    }, 300);
  }

  // Закрытие при нажатии Esc
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });


});




