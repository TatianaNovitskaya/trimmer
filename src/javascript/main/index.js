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
