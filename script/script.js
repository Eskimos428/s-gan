document.addEventListener('DOMContentLoaded', function () {



  /*Куки*/
  const cookieBanner = document.querySelector('.cookies__container');
  const acceptCookiesButton = document.getElementById('accept-cookies');

  acceptCookiesButton.addEventListener('click', function () {
    cookieBanner.style.display = 'none';
  });



  /*выпадающее меню в header */
  // Обработка для десктопного и мобильного меню
  document.querySelectorAll('.dropdown-column').forEach(column => {
    const sublist = column.querySelector('.dropdown-sublist');
    if (sublist) {
      column.classList.add('has-sublist');

      // Для десктопных устройств - hover
      column.addEventListener('mouseenter', () => {
        if (window.innerWidth > 992) {
          sublist.style.opacity = '1';
          sublist.style.maxHeight = '500px';
        }
      });

      // Для мобильных устройств - tap
      column.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          e.stopPropagation();

          // Закрываем все открытые подменю
          document.querySelectorAll('.dropdown-sublist').forEach(item => {
            if (item !== sublist) {
              item.style.opacity = '0';
              item.style.maxHeight = '0';
            }
          });

          // Переключаем текущее подменю
          if (sublist.style.opacity === '1') {
            sublist.style.opacity = '0';
            sublist.style.maxHeight = '0';
          } else {
            sublist.style.opacity = '1';
            sublist.style.maxHeight = '500px';
          }
        }
      });
    }
  });

  // Закрытие меню при клике вне его области
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 992) { // Только для мобильных
      const isDropdown = e.target.closest('.dropdown-column');
      const isCloseButton = e.target.closest('.bi-x');

      if (!isDropdown || isCloseButton) {
        document.querySelectorAll('.dropdown-sublist').forEach(sublist => {
          sublist.style.opacity = '0';
          sublist.style.maxHeight = '0';
        });

        // Также закрываем мобильное меню, если кликнули на bi-x
        if (isCloseButton) {
          const mobileMenu = document.querySelector('.mobile-menu');
          if (mobileMenu) {
            mobileMenu.classList.remove('active');
          }
        }
      }
    }
  });

  // Обработка главного меню для мобильной версии
  const dropdownItems = document.querySelectorAll('.nav__mobile .nav__item--dropdown > .nav__link');

  dropdownItems.forEach(item => {
    item.addEventListener('click', function (e) {
      if (window.innerWidth <= 992) { // Только для мобильных
        e.preventDefault();
        const dropdown = this.parentElement.querySelector('.mobile-dropdown');
        const arrow = this.querySelector('.dropdown-arrow');

        // Закрываем все другие открытые dropdowns
        document.querySelectorAll('.mobile-dropdown.active').forEach(openDropdown => {
          if (openDropdown !== dropdown) {
            openDropdown.classList.remove('active');
            const openArrow = openDropdown.closest('.nav__item--dropdown').querySelector('.dropdown-arrow');
            openArrow.classList.remove('active');
          }
        });

        // Переключаем текущий dropdown
        dropdown.classList.toggle('active');
        arrow.classList.toggle('active');
      }
    });
  });

  // Открытие/закрытие мобильного меню
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('active');
    });
  }

  // Закрытие при клике вне меню
  document.addEventListener('click', function (e) {
    if (window.innerWidth <= 992) {
      // Проверяем, был ли клик вне dropdown
      const isDropdownClick = e.target.closest('.nav__item--dropdown');
      const isMenuToggleClick = e.target.closest('.mobile-menu-toggle');

      if (!isDropdownClick && !isMenuToggleClick) {
        // Закрываем все dropdowns и сбрасываем стрелки
        document.querySelectorAll('.mobile-dropdown.active').forEach(dropdown => {
          dropdown.classList.remove('active');
          const arrow = dropdown.closest('.nav__item--dropdown').querySelector('.dropdown-arrow');
          arrow.classList.remove('active');
        });
      }
    }
  });


  //фиксирвоанание хедера при прокрутке
  const headerBottom = document.querySelector('.fixed-container');

  if (!headerBottom) return;

  let lastScroll = 0;
  let ticking = false;

  function updateHeader(scrollPos) {
    const scrollThreshold = document.body.scrollHeight * 0.05;

    if (scrollPos > scrollThreshold) {
      headerBottom.classList.add('fixed');
    } else {
      headerBottom.classList.remove('fixed');
    }
  }

  window.addEventListener('scroll', function () {
    lastScroll = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateHeader(lastScroll);
        ticking = false;
      });

      ticking = true;
    }
  });


  // Открытие поиска в десктопе
  const searchIconDesktop = document.querySelector('.search-icon-desktop');
  const desktopSearchContainer = document.querySelector('.desktop-search');

  if (searchIconDesktop && desktopSearchContainer) {
    // Обработчик клика по иконке поиска
    searchIconDesktop.addEventListener('click', function (e) {
      e.stopPropagation(); // Предотвращаем всплытие события
      desktopSearchContainer.classList.toggle('active');
    });

    // Закрытие при клике вне области поиска
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.desktop-search') &&
        !e.target.closest('.search-icon-desktop')) {
        desktopSearchContainer.classList.remove('active');
      }
    });

    // Закрытие по клавише ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && desktopSearchContainer.classList.contains('active')) {
        desktopSearchContainer.classList.remove('active');
      }
    });
  }

  //поиск в мобильном меню
  const searchInput = document.querySelector('.search-input');

  if (searchInput) {

    // Сохранение истории поиска
    const searchForm = document.querySelector('.search-form');
    searchForm.addEventListener('submit', function (e) {
      const query = searchInput.value.trim();
      if (query) {
        saveToSearchHistory(query);
      }
    });
  }

  function saveToSearchHistory(query) {
    let history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    history = history.filter(item => item !== query);
    history.unshift(query);
    history = history.slice(0, 5);
    localStorage.setItem('searchHistory', JSON.stringify(history));
  }

  //swiper main
  const swiperAuto = new Swiper('.swiper-auto', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1, // Базовое значение для мобильных
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
    },
    breakpoints: {
      600: {
        slidesPerView: 3, // При ширине ≥600px показываем 3 слайда
         direction: 'vertical',
      }
    }
  });


  //swiper blog
  const swiper = new Swiper('.swiper-blog', {
    loop: false,
    slidesPerView: 4,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    // Адаптивные настройки
    breakpoints: {
      768: {
        slidesPerView: 3
      },
      480: {
        slidesPerView: 2
      },
      320: {
        slidesPerView: 1
      }
    }
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


  //модалка с возрастом

    // Проверяем подтверждение возраста
    if (!sessionStorage.getItem('ageVerified')) {
      initAgeVerification();
    } else {
      // Скрываем оверлей, если он есть в HTML
      const overlay = document.querySelector('.age-verification-overlay');
      if (overlay) {
        overlay.style.display = 'none';
      }
    }


  function initAgeVerification() {
    const overlay = document.querySelector('.age-verification-overlay');

    if (!overlay) {
      return;
    }

    // Показываем оверлей
    overlay.style.display = 'flex';

    // Добавляем анимацию
    const style = document.createElement('style');
    style.innerHTML = `
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `;
    document.head.appendChild(style);

    // Используем делегирование событий для надежности
    overlay.addEventListener('click', function (e) {
      // Подтверждение возраста
      if (e.target.classList.contains('age-confirm')) {
        sessionStorage.setItem('ageVerified', 'true');
        overlay.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => {
          overlay.style.display = 'none';
        }, 500);
      }

      // Отказ
      if (e.target.classList.contains('age-deny')) {
        window.location.href = 'https://yandex.ru';
      }
    });

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




