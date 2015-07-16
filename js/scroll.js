window.onload = function () {
    'use strict';

    var view, relative, content,
        min, max, offset, reference, pressed, xform;

    function ypos(e) {
        if (e.targetTouches && (e.targetTouches.length >= 1)) {
            return e.targetTouches[0].clientY;
        }
        return e.clientY;
    }

    function scroll(y) {
        offset = (y > max) ? max : (y < min) ? min : y;
        view.style[xform] = 'translateY(' + (-offset) + 'px)';
        if (offset === max) {
          TweenLite.to($("#odb-reading"), 1, { delay: 1, opacity: 0, onComplete: function() {
            $(".content").backstretch("show", 8);
            $(".content").backstretch("pause");
            $("#arrow").remove();
            TweenLite.to($("#logo-end"), 1, { delay: 2, top: "25%", opacity: 1 });
            TweenLite.to($("#white-book"), 1, { delay: 3, marginTop: 0, opacity: 1 });
            TweenLite.to($("#quote"), 1, { delay: 4, marginTop: "10px", opacity: 1 });
            TweenLite.to($("#white-button"), 1, { delay: 5, bottom: "10%", opacity: 1 });
          }});
        }
    }

    function tap(e) {
        pressed = true;
        reference = ypos(e);
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    function drag(e) {
        var y, delta;
        if (pressed) {
            y = ypos(e);
            delta = reference - y;
            if (delta > 2 || delta < -2) {
                reference = y;
                scroll(offset + delta);
            }
        }
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    function release(e) {
        pressed = false;
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    view = document.getElementById('odb-reading');
    content = document.querySelector('.content');
    if (typeof window.ontouchstart !== 'undefined') {
        content.addEventListener('touchstart', tap);
        content.addEventListener('touchmove', drag);
        content.addEventListener('touchend', release);
    }
    content.addEventListener('mousedown', tap);
    content.addEventListener('mousemove', drag);
    content.addEventListener('mouseup', release);

    max = parseInt(getComputedStyle(view).height, 10) - (innerHeight * 0.6);
    offset = min = 0;
    pressed = false;

    xform = 'transform';
    ['webkit', 'Moz', 'O', 'ms'].every(function (prefix) {
        var e = prefix + 'Transform';
        if (typeof view.style[e] !== 'undefined') {
            xform = e;
            return false;
        }
        return true;
    });
};
