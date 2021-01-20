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