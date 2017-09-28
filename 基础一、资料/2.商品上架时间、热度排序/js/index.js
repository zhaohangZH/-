//AJAX获取数据，动态绑定在页面中
~function () {
    var xhr = new XMLHttpRequest;
    xhr.open('GET', 'json/product.json', false);
    xhr.onreadystatechange = function () {
        (xhr.readyState === 4 && xhr.status === 200) ? proData = utils.toJSON(xhr.responseText) : null;
    };
    xhr.send(null);
    var str = ``;
    for (var i = 0; i < proData.length; i++) {
        var cur = proData[i];
        /*自定义属性编程思维(编程思想）
         *->是整个JS中最伟大的编程思想之一
         * ->当我们在后续的某一些操作中，需要用到当前元素的某些信息值，此时我们就可以把这些值实现存储
         * 在元素的身上（自定义属性存储），后期用的时候直接的获取它的自定义属性值即可
         *
         * 例如当前的案例，我们初期绑定的时候，可以把产品的价格，上货时间、r热度等信息存储在元素
         * 的自定义属性上，以后排序的时候，如果需要用到这几个值，我们直接获取元素的自定义属性值即可
         *
         * data-xxx-xxx一般都是给元素设置的自定义属性
         */
        str += `<li data-time="${cur.time}" data-hot="${cur.hot}" data-price="${cur.price}">
            <a href="#">
            <img src="${cur.img}" alt="">
            <span class="title">${cur.title}</span>
            <span class="price">￥${cur.price}</span>
        </a></li>`;
    }
    document.getElementById('list').innerHTML = str;
}();
//->实现商品排序：按照"上架时间"、"热度"、"价格"实现升降序排列
~function () {
    //->获取UL以及里面所有的商品（li），并且把其转换为数组
    var mallItem=document.getElementById('list'),
      mallList=mallItem.getElementsByTagName('li');
    mallList=utils.toArray(mallList);
    //->sortGoods:实现按照上架时间的升序排列
    function sortGoods() {
        //->当前点击A对应的索引：根据索引我们来区分按照那一项排序即可0->时间  1->价格
        //->this:
        var _this=this;
        mallList.sort(function (cur,next) {
            var ary=['data-time','data-price','data-hot'];
            //->this:
            var attr =ary[_this.index];
            var curTime=cur.getAttribute(attr);
            var nextTime=next.getAttribute(attr);
            curTime=curTime.replace(/-/g,'');
            nextTime=nextTime.replace(/-/g,'');
            return (curTime-nextTime)*_this.n;
        });
        //->把当前最新的数据重新的增加到页面中，以此更改页面中内容的顺序
        var frg=document.createDocumentFragment();
        for (var i = 0; i < mallList.length; i++) {
           frg.appendChild(mallList[i]);
        }
        mallItem.appendChild(frg);
        frg=null;
    }
    //->绑定点击事件，点击的时候进行排序
    var menu=document.getElementById('header'),
        menuLink=menu.getElementsByTagName('a');
    for (var i = 0; i < menuLink.length; i++) {
        var curLink = menuLink[i];
        //->给第一个A标签绑定点击事件：上架时间
        curLink.n=-1;
        curLink.index=i;
        curLink.onclick=function () {
            //->每次点击切换自定义属性的值，实现升降序表示的切换
            this.n*=-1;
            //->sortGoods();//->this:window
            sortGoods.call(this);//->
    }
    }
}();