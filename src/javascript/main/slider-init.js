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
