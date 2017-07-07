Zepto(document).ready(function() {
(function($) {
//	media({musicSrc:"audio/way.mp3"});
	slideScreen({type:2});
})(Zepto)
});
$('.nextBtn').on('click',function(){
    close($('.page1'))
    showId($('.page2'))
})
var moveOff, moveOn;

function slideScreen(b) {
    document.addEventListener('touchmove', moveFun, false);
    var distance = 5, //超出距离响应滑动
        slide = 100,//超出执行
        old = 0,
        cur = 0,
        scale = 0,
        nextcur = 0,
        prevcur = 0,
        $section = $(".page"),
        $move = $("#page"),
        setLength = 0,
        $slide = '',
        translate = '',
        setTime,
        isSlideIng = false;
    if (b.type == 1 || b.type == 3) {
        translate = "translateY";
        setLength = document.body.clientHeight;
    } else if (b.type == 2 || b.type == 4) {
        translate = "translateX";
        setLength = document.body.clientWidth;
    }
    $section.css({
        transform: translate + '(' + setLength + 'px) ',
        '-webkit-transform': translate + '(' + setLength + 'px) '
    });

    $(".page:first-of-type").addClass("firstSection").siblings().hide();
    $(".page:last-of-type").addClass("lastSection").css({
        transform: translate + '(-' + setLength + 'px) ',
        '-webkit-transform': translate + '(-' + setLength + 'px) '
    });
    $section.first().css({transform: translate + '(0)', '-webkit-transform': translate + '(0) '}).addClass("slide");
    $slide = $("body").find(".slide");
    if ($section.length < 2) {
        $(".slideTips").hide();
        return false
    }

    moveOn = function () {
        $move.on("touchstart", function (e) {
            start(e);
        }).on("touchmove", function (e) {
            move(e);
        }).on("touchend", function () {
            end(cur);
        });
    };
    moveOff = function () {
        $move.off()
    };
    if ($move.find(".page").length > 1) {
        moveOn();
        $(".slideTips").show();
    } else {
        moveOff();
        $(".slideTips").hide();
    }
    function start(e, touche) {
        isSlideIng = true;
        moveSwitch();
        if (setTime) {
            clearTimeout(setTime);
            setTime = null;
        }
        $(".slide").show();
        if ($slide.hasClass("firstSection")) {
            $(".slide").next().show();
            $section.last().show();
        } else if ($slide.hasClass("lastSection")) {
            $(".slide").prev().show();
            $section.first().show();
        } else {
            $(".slide").prev().show();
            $(".slide").next().show();
        }
        $section.css({"transition-duration": "0ms", "-webkit-transition-duration": "0ms", opacity: '1'});
        if (touche != 1) {
            if (b.type == 1 || b.type == 3) {
                old = e.touches[0].pageY;
            } else if (b.type == 2 || b.type == 4) {
                old = e.touches[0].pageX;
            }
        }
        cur = 0;
        scale = 0;
        nextcur = 0;
        prevcur = 0;
    }

    var isdab, isFinger;

    function moveSwitch() {
        $('.finger').addClass('dis_none')
        $('.lookTips').addClass('dis_none')
        if ($slide.hasClass("daub") && !isdab) {
            moveOff();
            isdab = true;
        }
        if ($slide.hasClass("fingerprint") && !isFinger) {
            moveOff();
            isFinger = true;
        }
    }

    function move(e, touche, c) {
        if (isSlideIng) {
            if (touche != 1) {
                if (b.type == 1 || b.type == 3) {
                    cur = e.touches[0].pageY - old;
                } else if (b.type == 2 || b.type == 4) {
                    cur = e.touches[0].pageX - old;
                }
            } else {
                cur = c
            }
            prevcur = -setLength + cur * 1.2;
            nextcur = setLength + cur * 1.2;

            if ($slide.hasClass("firstSection") && cur > distance) {

                moveSlide($(".lastSection"), -setLength);

            } else if ($slide.hasClass("lastSection") && cur < -distance) {

                moveSlide($(".firstSection"), setLength);

            } else if (cur < -distance) {

                moveSlide($slide.next(), setLength);

            } else if (cur > distance) {

                moveSlide($slide.prev(), -setLength);

            }
        }
    }

    function end(cur) {
        if (isSlideIng) {
            if ($slide.hasClass("firstSection") && cur > slide) {
                endSlide($(".lastSection"), $slide, setLength)
            } else if ($slide.hasClass("lastSection") && cur < -slide) {
                endSlide($(".firstSection"), $slide, -setLength);
            } else if (cur < -slide) {
                endSlide($slide.next(), $slide, -setLength);
            } else if (cur > slide) {
                endSlide($slide.prev(), $slide, setLength);
            } else if (cur < slide && cur > -slide) {
                if ($slide.hasClass("firstSection")) {
                    noSlide();
                } else if ($slide.hasClass("lastSection")) {
                    noSlide();
                } else {
                    noSlide();
                }
            }
        }
    }

    function moveSlide($newDiv, moveing, cur, scale) {
        if (cur == "" && scale == "") {
            cur = 0;
            scale = 1;
        }
        $newDiv.css({
            transform: translate + '(' + moveing + 'px) scale(1)',
            '-webkit-transform': translate + '(' + moveing + 'px) scale(1)',
            zIndex: '2'
        });
        $slide.css({
            transform: translate + '(' + cur / 2 + 'px) scale(' + scale + ')',
            '-webkit-transform': translate + '(' + cur / 2 + 'px) scale(' + scale + ')',
            zIndex: '1'
        });
    }

    function endSlide($newDiv, $curDiv, offsetLength) {
        $section.css({"transition-duration": "400ms", "-webkit-transition-duration": "400ms"});
        $curDiv.css({
            transform: translate + '(' + offsetLength + 'px) scale(0.5)',
            '-webkit-transform': translate + '(' + offsetLength + 'px) scale(0.5)',
            zIndex: '1'
        }).removeClass("slide anim");
        $newDiv.css({
            transform: translate + '(0)',
            '-webkit-transform': translate + '(0)',
            zIndex: '2'
        }).addClass("slide anim");
        $slide = $(".slide");
        setTime = setTimeout(function () {
            $(".slide").siblings().hide();
            setTime = null;
            isSlideIng = false;
        }, 401);
    }

    function noSlide() {
        $section.css({"transition-duration": "400ms", "-webkit-transition-duration": "400ms"});
        $slide.css({transform: translate + '(0) ', '-webkit-transform': translate + '(0)', zIndex: '2'});
        setTime = setTimeout(function () {
            $("body").find(".slide").show().siblings().hide();
            isSlideIng = false;
            setTime = null;
        }, 401);
    }

    function moveFun(e) {//禁止屏幕滑动
        e.preventDefault();
    }
}

