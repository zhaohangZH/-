var bannerRender = (function () {
    var banner = document.getElementById('banner'),
        imgBox = utils.byClass('imgBox', banner)[0],
        focus = utils.byClass('focus', banner)[0],
        arrow = utils.byClass('arrow', banner),
        arrowLeft = arrow[0],
        arrowRight = arrow[1],
        imgBoxList = null,
        imgList = null,
        focusList = null;
    var bannerData = null,
        maxNum = 0;
    function queryData() {
        var xhr = new XMLHttpRequest;
        xhr.open('GET', 'json/banner.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                bannerData = utils.toJSON(xhr.responseText);
            }
        };
        xhr.send(null);
    }

    function bindHTML() {
        var str = '',
            strFocus = '';
        for (var i = 0; i < bannerData.length; i++) {
            var item = bannerData[i];
            str += '<li><a href="' + item.link + '">';
            str += '<img data-src="' + item.img + '">';
            str += '</a></li>';
            strFocus += '<li></li>';
        }
        focus.innerHTML = strFocus;
        imgBox.innerHTML = str;

        imgBoxList = imgBox.getElementsByTagName('li');
        imgList = imgBox.getElementsByTagName('img');
        focusList = focus.getElementsByTagName('li');

        var cloneEle = imgBoxList[0].cloneNode(true);
        imgBox.appendChild(cloneEle);

        utils.css(imgBox, 'width', imgBoxList.length * 1000);
        maxNum = imgBoxList.length;
    }

    function lazyImg(curImg) {
        if (curImg.isLoad) return;
        var tempImg = new Image;
        tempImg.onload = function () {
            curImg.src = tempImg.src;
            tempImg = null;

            zhufengAnimate({
                curEle: curImg,
                target: {opacity: 1},
                duration: 300
            });
        };
        tempImg.src = curImg.getAttribute('data-src');
        curImg.isLoad = true;
    }

    function initLoad() {
        window.onload = function () {
            //->把STEP对应焦点的LI有选中的样式
            utils.addClass(focusList[step], 'select');


            for (var i = 0; i < imgList.length; i++) {
                lazyImg(imgList[i]);
            }
        }
    }

    //----------------------------
    var step = 0,
        interval = 3000,
        autoTimer = null;

    function change() {
        zhufengAnimate({
            curEle: imgBox,
            target: {left: -step * 1000},
            duration: 300
        });
        var tempStep = step;
        tempStep === maxNum - 1 ? tempStep = 0 : null;
        for (var i = 0; i < focusList.length; i++) {
            i === tempStep ? utils.addClass(focusList[i], 'select') : utils.removeClass(focusList[i], 'select');
        }
    }


    function autoMove() {
        autoTimer = setInterval(function () {

            if (step === maxNum - 1) {
                step = 0;
                utils.css(imgBox, 'left', 0);
            }
            step++;
            change();
        }, interval);
    }

    function bindMouseEvent() {
        banner.onmouseenter = function () {
            arrowLeft.style.display = 'block';
            arrowRight.style.display = 'block';
            clearInterval(autoTimer);
        };
        banner.onmouseleave = function () {
            arrowLeft.style.display = 'none';
            arrowRight.style.display = 'none';
            autoMove();
        };
    }

    function bindFocusEvent() {
        for (var i = 0; i < focusList.length; i++) {
            var item = focusList[i];
            item.index = i;
            item.onclick = function () {
                step = this.index;
                change();
            }
        }
    }
    function bindArrowEvent() {
        arrowRight.onclick = function () {
            if (step === maxNum - 1) {
                step = 0;
                utils.css(imgBox, 'left', 0);
            }
            step++;
            change();
        };

        arrowLeft.onclick = function () {
            if (step === 0) {
                step = maxNum - 1;
                utils.css(imgBox, 'left', -step * 1000);
            }
            step--;
            change();
        };
    }


    return {
        init: function () {
            queryData();
            bindHTML();
            initLoad();

            //------------

            autoMove();
            bindMouseEvent();
            bindFocusEvent();
            bindArrowEvent();
        }
    }
})();

bannerRender.init();