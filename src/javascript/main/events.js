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
