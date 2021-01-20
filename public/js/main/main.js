$(document).ready(function () {
    var $window = $(window),
        win_height_padded = $window.height() * 1.1;
    if (window.innerWidth > 480) {
        $window.on('scroll', revealOnScroll);
    } else {
        $(".block_animated:not(.block_show)").each(function () {
            $(this).addClass('block_show');
        });
    }
    function revealOnScroll() {
        var scrolled = $window.scrollTop(),
            win_height_padded = $window.height() / 1.2;

        $(".block_animated:not(.block_show)").each(function () {
            var $this = $(this),
                offsetTop = $this.offset().top;

            if (scrolled + win_height_padded >= offsetTop) {
                $this.addClass('block_show');
            }
        });
    }
    if (window.innerWidth > 480) {
        revealOnScroll();
    }
    svg4everybody();
});

document.addEventListener("DOMContentLoaded", function () {
    var elementsHideCard = document.querySelectorAll('.js__hide-card');
    var btnCart = document.querySelector('.btn-cart');
    var last_known_scroll_position = 0;
    var ticking = false;
    if(window.innerWidth <= 1024) {
        function doSomething(scroll_pos) {
            var heightWindow = window.innerHeight;
            var delta = 1.1;
            var btnCardOb = btnCart.getBoundingClientRect();
            for (var i = 0; i < elementsHideCard.length; i++) {
                var hideCardEl = elementsHideCard[i];
                var objectHideCardEl = hideCardEl.getBoundingClientRect();
                if (!isNotViewport(hideCardEl)) {
                    if(objectHideCardEl.top <= btnCardOb.bottom && (objectHideCardEl.bottom + 20) > btnCardOb.bottom){
                        btnCart.style.opacity = "0";
                        btnCart.style.pointerEvents = "none";
                    }else{
                        btnCart.style.pointerEvents = "auto";
                        btnCart.style.opacity = "1";
                        // btnCart.style.display = "none";
                    }
                }
            }
        }
        window.addEventListener('scroll', function(e) {
            last_known_scroll_position = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    doSomething(last_known_scroll_position);
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
});
function isNotViewport (el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top < 0 && rect.bottom < 0 || rect.top > window.innerHeight && rect.bottom > window.innerHeight
    );
};
document.addEventListener("DOMContentLoaded", function () {
    var menuItems = $('.js__scroll__to');
    menuItems.on('click', function (e) {
        e.preventDefault();
        var mobileVersion = window.innerWidth <= 1023;
        var $this = $(this);
        var dataHref = mobileVersion ? $this.attr("data-header-mobile") : $this.attr("data-header-desktop");
        var offsetTop = $('#' + dataHref).offset().top;
        $('html, body').stop().animate({
            scrollTop: mobileVersion ? offsetTop - 120 : offsetTop
        }, 900);
    });

    // objectFitImages();

});

document.addEventListener("DOMContentLoaded", function () {
    if(window.innerWidth < 980){
        showPopupEvent();
    }
    function togglePopup(ClassName) {
        var popupClose = document.querySelector(ClassName);
        popupClose.classList.toggle('popup_show');
    }
    function closePopup() {
        var popupClose = document.querySelectorAll('.popup');
        for (var i = 0; i < popupClose.length; i++) {
            var obj2 = popupClose[i];
            obj2.classList.remove('popup_show');
        }
    }
    function showPopupEvent() {
        var btnsItems = document.querySelectorAll('.js__show-popup');
        for (var i = 0; i < btnsItems.length; i++) {
            var obj3 = btnsItems[i];
            obj3.addEventListener('click', function (e) {
                e.preventDefault();
                var currentPopup = this.getAttribute('data-popup');
                togglePopup('.' + currentPopup)
            });
        }
    }

    function closeBtns() {
        var closeButton = document.querySelectorAll('.js__close-popup');
        for (var i = 0; i < closeButton.length; i++) {
            var obj2 = closeButton[i];
            obj2.addEventListener('click', function (e) {
                e.preventDefault();
                closePopup()
            })
        }
    }
    closeBtns();
});



document.addEventListener("DOMContentLoaded", function () {
    sliderInit.init()
});
var sliderInit = {
    init: function () {
        this.reviewSlider();
    },
    reviewSlider: function () {
        var self = this;
        var reviewSlider = new Swiper('.review__slider .swiper-container', {
            slidesPerView: 'auto',
            centeredSlides: true,
            loop:true,
            spaceBetween: 30,
            navigation: {
                nextEl: '.review__button-next',
                prevEl: '.review__button-prev',
            },
            pagination: {
                el: '.review__swiper-pagination',
                type: 'bullets',
                clickable: true
            },

        });
    }
};

document.addEventListener("DOMContentLoaded", function () {
    var timer1 = new CounterTimer('timer-1');
    var timer2 = new CounterTimer('timer-2');
    var timer3 = new CounterTimer('timer-3');
});

function CounterTimer(elId, position, radius) {
    this.days = 0;
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.positionRadius = position || 42;
    this.radius = radius || 38;

    this.elIdWrapper = document.getElementById(elId);
    this.elCountItem = this.elIdWrapper.querySelector('.countdown-item');


    this.elDaysText = this.elIdWrapper.querySelector('.countdown-days-text');
    this.elHoursText = this.elIdWrapper.querySelector('.countdown-hours-text');
    this.elMinutesText = this.elIdWrapper.querySelector('.countdown-minutes-text');
    this.elSecondsText = this.elIdWrapper.querySelector('.countdown-seconds-text');

    this.elDaysPath = this.elIdWrapper.querySelector('.countdown-days-path');
    this.elHoursPath = this.elIdWrapper.querySelector('.countdown-hours-path');
    this.elMinutesPath = this.elIdWrapper.querySelector('.countdown-minutes-path');
    this.elSecondsPath = this.elIdWrapper.querySelector('.countdown-seconds-path');

    this.eventResize();
    this.updateSize();
    this.intervalTimer();
}

Date.prototype.getMonthNameShort = function (lang) {
    lang = lang && (lang in Date.locale) ? lang : 'en';
    return Date.locale[lang].month_names_short[this.getMonth()];
};
Date.locale = {
    en: {
        month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
};
CounterTimer.prototype.updatePositionAndRadius = function (position, radius) {
    this.positionRadius = position;
    this.radius = radius;
};

CounterTimer.prototype.eventResize = function () {
    var self = this;
    window.addEventListener('resize', function () {
        self.updateSize()
    });
};

CounterTimer.prototype.updateSize = function () {
    var currentWidth = (this.elCountItem.getBoundingClientRect().width);
    var pos = currentWidth / 2.05;
    var rad = Math.floor(pos - 3);
    this.updatePositionAndRadius(pos, rad);
};

CounterTimer.prototype.intervalTimer = function () {
    var amountToIncreaseWith = 1; //Edit this number to required input
    var currentDay = new Date();
    var currentMothWithName = new Date().getMonthNameShort();
    var increasedDate = new Date(currentDay.getTime() + (amountToIncreaseWith * 86400000));
    var currentDayNumber = increasedDate.getDate();
    var currentFullYear = currentDay.getFullYear();
    var stringYear = String(currentMothWithName + " " + currentDayNumber + ", " + currentFullYear + " " + "23:59:59");
    var setCurrentDay = new Date(stringYear);
    var countDownDate = setCurrentDay.getTime();

    var self = this;

    this.interval = setInterval(function () {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        self.days = roundZero(Math.floor(distance / (1000 * 60 * 60 * 24)));
        self.hours = roundZero(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        self.minutes = roundZero(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        self.seconds = roundZero(Math.floor((distance % (1000 * 60)) / 1000));

        self.render();
    }, 1000);
};

CounterTimer.prototype.render = function () {
    const daysRadius = mapNumber(this.days, 30, 0, 0, 360);
    const hoursRadius = mapNumber(this.hours, 24, 0, 0, 360);
    const minutesRadius = mapNumber(this.minutes, 60, 0, 0, 360);
    const secondsRadius = mapNumber(this.seconds, 60, 0, 0, 360);

    this.elDaysText.innerHTML = this.days;
    this.elHoursText.innerHTML = this.hours;
    this.elMinutesText.innerHTML = this.minutes;
    this.elSecondsText.innerHTML = this.seconds;

    this.elDaysPath.setAttribute('d', describeArc(this.positionRadius, this.positionRadius, this.radius, 0, daysRadius));
    this.elHoursPath.setAttribute('d', describeArc(this.positionRadius, this.positionRadius, this.radius, 0, hoursRadius));
    this.elMinutesPath.setAttribute('d', describeArc(this.positionRadius, this.positionRadius, this.radius, 0, minutesRadius));
    this.elSecondsPath.setAttribute('d', describeArc(this.positionRadius, this.positionRadius, this.radius, 0, secondsRadius));
};

function roundZero(num) {
    return num < 10 ? "0" + num : num;
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function describeArc(x, y, radius, startAngle, endAngle) {

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}

function mapNumber(number, in_min, in_max, out_min, out_max) {
    return out_max - ((number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
}
