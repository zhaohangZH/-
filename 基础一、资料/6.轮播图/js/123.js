var bannerRender=(function () {
    var banner=document.getElementById('banner'),
        imgBox=utils.byClass('imgBox',banner)[0],
        focus=utils.byClass('focus',banner)[0],
        arrow=utils.byClass('arrow',banner),
        arrowLeft=arrow[0],
        arrowRight=arrow[1],
        imgBoxList=null,
        imgList=null,
        focusList=null;
    var bannerData=null,
        maxNum=0;
    function banData() {
        var xhr=new XMLHttpRequest;
        xhr.open('get','json/banner.json',false);
        xhr.onreadystatechange=function () {
            (xhr.readyState===4&&xhr.status===200)?bannerData=utils.toJSON(xhr.responseText):null;
        }
        xhr.send(null);
    }
    function itemHTML() {
        var str='',
            strFocus='';
        for (var i = 0; i < bannerData.length; i++) {
            var item = bannerData[i];
            str+='<li><a href="'+item.link+'">';
            str+='<img data-src="'+item.img+'">';
            str+='</a></li>';
            strFocus+='<li></li>';
        }
        imgBox.innerHTML=str;
        focus.innerHTML=strFocus;
        imgBoxList=imgBox.getElementsByTagName('li');
        imgList=imgBox.getElementsByTagName('img');
        focusList=focus.getElementsByTagName('li');
        var cloneEle=imgBoxList[0].cloneNode(true);
        imgBox.appendChild(cloneEle);
        utils.css(imgBox,'width',imgBoxList.length*1000);
        maxNum=imgBoxList.length;
    }
    function lazyImg(curImg) {
        if(curImg.isload)return;
        var itemImg=new Image;
        itemImg.onload=function () {
            curImg.src=itemImg.src;
            itemImg=null;
            zhufengAnimate({
                curEle:curImg,
                target:{opacity:1},
                duration:300
            })
        }
        itemImg.src=curImg.getAttribute('data-src');
        curImg.isload=true;
    }
    function init() {
        window.onload=function () {
            utils.addClass(focusList[step],'select');
            for (var i = 0; i < imgList.length; i++) {
                lazyImg(imgList[i]);
            }
        }
    }
    var step=0,
        time=null,
        intertion=3000;
    function change() {
        zhufengAnimate({
            curEle:imgBox,
            target:{left:-step*1000},
            duration:300
        })
        var stepStep=step;
        stepStep===maxNum-1?stepStep=0:null;
        for (var i = 0; i < focusList.length; i++) {
            i===stepStep?utils.addClass(focusList[i],'select'):utils.removeClass(focusList[i],'select');
        }
    }
    function autotimer() {
        time=setInterval(function () {
            if(step===maxNum-1){
                step=0;
                utils.css(imgBox,'left',0);
            }
            step++;
            change();
        },intertion);
    }
    function bindMove() {
        banner.onmouseenter=function () {
            arrowLeft.style.display='block';
            arrowRight.style.display='block';
            clearInterval(time);
        }
        banner.onmouseleave=function () {
            arrowLeft.style.display='none';
            arrowRight.style.display='none';
            autotimer();
        }
    }
    function bindFocus() {
        for (var i = 0; i < focusList.length; i++) {
            var item = focusList[i];
            item.index=i;
            item.onclick=function () {
                step=this.index;
                change();
            }
        }
    }
    function bindArrow() {
        arrowRight.onclick=function () {
            if(step===maxNum-1){
                step=0;
                utils.css(imgBox,'left',0);
            }
            step++;
            change();
        }
        arrowLeft.onclick=function () {
            if(step===0){
                step=maxNum-1;
                utils.css(imgBox,'left',-step*1000);
            }
            step--;
            change();
        }
    }
    return{
        init:function () {
            banData();
            itemHTML();
            init();
            autotimer();
            bindMove();
            bindFocus();
            bindArrow();
        }
    }
})();
bannerRender.init();