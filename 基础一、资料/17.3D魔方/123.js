'use strict';
var loadingRender=function () {
    var imgList = ['img/icon.png',
        'img/music.svg', 'img/zf_concatAddress.png', 'img/zf_concatInfo.png', 'img/zf_concatPhone.png', 'img/zf_course.png', 'img/zf_course1.png', 'img/zf_course2.png', 'img/zf_course3.png', 'img/zf_course4.png', 'img/zf_course5.png', 'img/zf_course6.png', 'img/zf_cube1.png', 'img/zf_cube2.png', 'img/zf_cube3.png', 'img/zf_cube4.png', 'img/zf_cube5.png', 'img/zf_cube6.png', 'img/zf_cubeBg.jpg', 'img/zf_cubeTip.png', 'img/zf_emploment.png', 'img/zf_messageArrow1.png', 'img/zf_messageArrow2.png', 'img/zf_messageChat.png', 'img/zf_messageKeyboard.png', 'img/zf_messageLogo.png', 'img/zf_messageStudent.png', 'img/zf_outline.png', 'img/zf_phoneBg.jpg', 'img/zf_phoneDetail.png', 'img/zf_phoneListen.png', 'img/zf_phoneLogo.png', 'img/zf_return.png', 'img/zf_style1.jpg', 'img/zf_style2.jpg', 'img/zf_style3.jpg', 'img/zf_styleTip1.png', 'img/zf_styleTip2.png', 'img/zf_teacher1.png', 'img/zf_teacher2.png', 'img/zf_teacher3.jpg', 'img/zf_teacher4.png', 'img/zf_teacher5.png', 'img/zf_teacher6.png', 'img/zf_teacherTip.png'];
    var $loading=$('.loading'),
        $already=$loading.find('.already');
    var n=0,
        m=imgList.length,
        timer=null,
        isEnter=false;
    function loadImg() {
        $.each(imgList,function (index,item) {
            var oImg=new Image();
            oImg.src=item;
            oImg.onload =function () {
                $already.css('width',++n/m*100+'%');
                if(n>=m){
                    setTimeout(function () {
                        if(isEnter)return;
                        isEnter=true;
                        clearTimeout(timer);
                        $loading.remove();
                        phoneRender.init();
                    },2000);
                }
            };
        });
    }
    return{
        init:function () {
            $loading.css('display','block');
            loadImg();
            timer=setTimeout(function () {
                if(n<m){
                    if(isEnter)return;
                    isEnter=true;
                    $already.css('width','100%');
                    setTimeout(function () {
                        $loading.remove();
                        phoneRender.init();
                    },2000);
                }
            },10000);
        }
    }
}();
    var phoneRender=function () {
        var $phone=$('.phone'),
            $listen=$phone.find('.listen'),
            $listenTouch=$listen.find('.touch'),
            $detail=$phone.find('.touch'),
            $time=$phone.find('span');
        var bellAudio=$('#bellAudio')[0],
            sayAudio=$('#sayAudio')[0];
            function listenTouch() {
                $listenTouch.singleTap(function () {
                    bellAudio.pause();
                    $(bellAudio).remove();
                    $listen.remove();
                    $detail.css('transform','translateY(0)').on('webkitTransitionEnd',function () {
                        $time.css('display','block');
                        sayAudio.play();
                        watchTime();
                    });
                });
            }
            var watchTimer=null;
            function watchTime() {
                watchTimer=setInterval(function () {
                    var curTime=sayAudio.currentTime,
                        durTime=sayAudio.duration;
                    if(curTime>=durTime){
                        message();
                        return;
                    }
                    var minute=Math.floor(curTime/60),
                        secoud=Math.ceil(curTime-minute*60);
                    minute<10?minute='0'+minute:
                        null;
                    secoud<10?secoud='0'+secoud:null;
                    $time.html(minute+':'+secoud);
                },1000);
            }
            function message() {
                clearInterval(watchTime);
                sayAudio.pause();
                $(sayAudio).remove();
                $phone.remove();
                messageRender.init();
            }
            return{
                init:function init() {
                    $phone.css('display','block');
                    bellAudio.play();
                    listenTouch();
                    $detailTouch.singleTap(messge);
                }
            };
    }();
var messageRender=function () {
    var $message=$('.message'),
        musicAudio=$('#musicAudio')[0],
        $wrapper=$message.find('li'),
        $keybouard=$message.find('.keyboard'),
        $text=$keybouard.find('.text'),
        $submit=$keybouard.find('.submit');
        var autoTimer=null,
            step=-1,
            initTranslateY=0;
        function messageMove() {
            var $cur=$messageList.eq(++step);
            $cur.css({
                transform:'translateY(0)',
                opacity:1
            });
            if(step===2){
                clearInterval(autoTimer);
                var fn=function fn() {
                    $cur.off('webkitTransitionEnd',fn);
                    keyboard();
                };
                $cur.on('webkitTransitionEnd',fn);
            }
            if(step>=4){
                initTranslateY-=$cur[0].offsetHeight+10;
                $wrapper.css('transform','translateY('+initTranslateY+'px)');
            }
            if(step>=$messageList.length-1){
                clearInterval(autoTimer);
                musicAudio.pause();
                $(musicAudio).remove();
                setTimeout(function () {
                    $message(function () {
                        $message.remove();
                        cubeRender.init();
                    },2000);
                })
            }
        }
}

