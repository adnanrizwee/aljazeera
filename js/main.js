/**
 * Al Jazira Takaful Website - Main JavaScript
 * Using jQuery and Bootstrap
 */

$(document).ready(function() {
    'use strict';

    // ================================================
    // Preloader
    // ================================================
    $(window).on('load', function() {
        setTimeout(function() {
            $('#preloader').addClass('hidden');
        }, 500);
    });

    // Fallback - hide preloader after 3 seconds
    setTimeout(function() {
        $('#preloader').addClass('hidden');
    }, 3000);

    // ================================================
    // Custom Hero Slider (Auto-slide every 3 seconds, No Arrows)
    // ================================================
    const $slides = $('.slide');
    const totalSlides = $slides.length;
    let currentSlide = 0;
    let slideInterval;

    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides
        $slides.removeClass('active');
        
        // Handle index bounds
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }
        
        // Add active class to current slide
        $slides.eq(currentSlide).addClass('active');
    }

    // Function to go to next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Start auto-slide (3 seconds = 3000ms)
    function startSlider() {
        slideInterval = setInterval(function() {
            nextSlide();
        }, 3000); // Changed to 3 seconds as requested
    }

    // Stop auto-slide
    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Initialize slider
    if (totalSlides > 0) {
        // Make sure only first slide is active on start
        $slides.removeClass('active');
        $slides.eq(0).addClass('active');
        currentSlide = 0;
        
        // Start auto-sliding
        startSlider();
    }

    // Pause on hover, resume on mouse leave
    $('.hero-slider-wrapper').on('mouseenter', function() {
        stopSlider();
    }).on('mouseleave', function() {
        startSlider();
    });

    // ================================================
    // Theme Toggle (Light/Dark Mode)
    // ================================================
    const themeToggle = $('#themeToggle');
    const body = $('body');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.addClass('dark-theme');
        themeToggle.prop('checked', true);
    }
    
    // Toggle theme on switch change
    themeToggle.on('change', function() {
        if ($(this).is(':checked')) {
            body.addClass('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            body.removeClass('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    });

    // ================================================
    // Scroll to Top Button
    // ================================================
    const scrollTopBtn = $('#scrollTop');
    
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            scrollTopBtn.addClass('show');
        } else {
            scrollTopBtn.removeClass('show');
        }
    });
    
    scrollTopBtn.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 600);
    });

    // ================================================
    // Navbar Scroll Effect
    // ================================================
    const navbar = $('.main-nav');
    
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 100) {
            navbar.addClass('scrolled');
        } else {
            navbar.removeClass('scrolled');
        }
    });

    // ================================================
    // Dropdown Menu Hover Effect (Desktop)
    // ================================================
    if ($(window).width() > 992) {
        $('.nav-item.dropdown').hover(
            function() {
                $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(200);
            },
            function() {
                $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(200);
            }
        );
    }

    // ================================================
    // Sidebar Items Interaction
    // ================================================
    $('.sidebar-item').on('click', function() {
        $('.sidebar-item').removeClass('active');
        $(this).addClass('active');
        
        const serviceName = $(this).find('span').text();
        console.log('Service clicked:', serviceName);
    });

    // Add hover effect to sidebar items
    $('.sidebar-item').on('mouseenter', function() {
        $(this).find('.sidebar-icon').css('transform', 'scale(1.1)');
    }).on('mouseleave', function() {
        $(this).find('.sidebar-icon').css('transform', 'scale(1)');
    });

    // ================================================
    // Product Cards Animation
    // ================================================
    $('.product-card').on('mouseenter', function() {
        $(this).css('transform', 'translateY(-5px)');
    }).on('mouseleave', function() {
        $(this).css('transform', 'translateY(0)');
    });

    // ================================================
    // Insurance Tabs Active State
    // ================================================
    $('.insurance-tab').on('click', function(e) {
        e.preventDefault();
        $('.insurance-tab').removeClass('active');
        $(this).addClass('active');
    });

    // ================================================
    // Smooth Scroll for Anchor Links
    // ================================================
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });

    // ================================================
    // Animate Elements on Scroll
    // ================================================
    function animateOnScroll() {
        const elements = $('.fade-in-element');
        
        elements.each(function() {
            const elementTop = $(this).offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();
            
            if (elementTop < windowBottom - 50) {
                $(this).addClass('visible');
            }
        });
    }
    
    $(window).on('scroll', animateOnScroll);
    animateOnScroll();

    // ================================================
    // Mobile Menu Close on Link Click
    // ================================================
    $('.navbar-nav .nav-link').on('click', function() {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
        }
    });

    // ================================================
    // Language Toggle (RTL/LTR)
    // ================================================
    $('.lang-toggle a').on('click', function(e) {
        e.preventDefault();
        const html = $('html');
        
        if (html.attr('dir') === 'rtl') {
            html.attr('dir', 'ltr');
            $(this).text('العربية');
        } else {
            html.attr('dir', 'rtl');
            $(this).text('English');
        }
    });

    // ================================================
    // Image Error Handling
    // ================================================
    $('img').on('error', function() {
        $(this).css('visibility', 'hidden');
    });

    // ================================================
    // Console Welcome Message
    // ================================================
    console.log('%c Al Jazira Takaful ', 'background: #00A5DF; color: white; font-size: 20px; padding: 10px;');
    console.log('%c Welcome to Al Jazira Takaful Insurance ', 'color: #10426C; font-size: 14px;');

});