document.addEventListener('DOMContentLoaded', () => {
  
  /* --- STICKY NAV ON SCROLL --- */
  const header = document.querySelector('.header-area');
  const stickyThreshold = 100;
  
  function checkScroll() {
    if (window.scrollY > stickyThreshold) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  }
  
  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Initial check on load
  
  /* --- MOBILE NAVIGATION HAMBURGER --- */
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      menuToggle.classList.toggle('active');
      
      // Animate hamburger bars to 'X' state
      const bars = menuToggle.querySelectorAll('span');
      if (menuToggle.classList.contains('active')) {
        bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
      } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    });
    
    // Close mobile menu when clicking nav links
    const navLinks = navMenu.querySelectorAll('.nav-link:not(javascript:void(0))');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Only close if it's not a parent dropdown trigger
        if (!link.parentElement.classList.contains('has-dropdown') || window.innerWidth > 768) {
          navMenu.classList.remove('open');
          menuToggle.classList.remove('active');
          const bars = menuToggle.querySelectorAll('span');
          bars[0].style.transform = 'none';
          bars[1].style.opacity = '1';
          bars[2].style.transform = 'none';
        }
      });
    });
  }
  
  /* --- MOBILE DROPDOWN MENU ACCORDION --- */
  const dropdownTriggers = document.querySelectorAll('.has-dropdown');
  
  dropdownTriggers.forEach(trigger => {
    const triggerLink = trigger.querySelector('.nav-link');
    triggerLink.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        
        // Close other open dropdowns
        dropdownTriggers.forEach(item => {
          if (item !== trigger) {
            item.classList.remove('active');
          }
        });
        
        trigger.classList.toggle('active');
      }
    });
  });

  /* --- INTERACTIVE HERO FADE SLIDER --- */
  const slides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;
  const slideInterval = 5000; // 5 seconds
  
  if (slides.length > 0) {
    function nextSlide() {
      // Remove active class from current slide
      slides[currentSlide].classList.remove('active');
      
      // Advance to next index
      currentSlide = (currentSlide + 1) % slides.length;
      
      // Add active class to new slide
      slides[currentSlide].classList.add('active');
    }
    
    setInterval(nextSlide, slideInterval);
  }

  /* --- SCROLL REVEAL TRIGGERS --- */
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, {
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Margins around root
  });
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
  
  /* --- ACTIVE STATE LINK HIGHLIGHTING --- */
  const sections = document.querySelectorAll('section[id], header[id]');
  const mainNavLinks = document.querySelectorAll('.nav-menu .nav-link');
  
  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 200; // Offset for sticky header
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });
    
    mainNavLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        if (targetId === currentId) {
          link.classList.add('active');
        }
      }
    });
  });

});
