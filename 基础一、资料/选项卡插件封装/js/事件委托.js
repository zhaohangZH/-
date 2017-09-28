$(document).ready(function () {
      var $tab = $('#tab'),
          $pageList = $tab.find('.page>li'),
         $contentList = $tab.children('.content');
 //->事件代理：把所有的点击行为操作都委托给外层tab容器
    $tab.click(function (e) {
        var target=e.target,

    })
     $pageList.click(function () {
          $(this).addClass('select').siblings().removeClass('select');
          var curIn = $(this).index();
         $contentList.each(function (index, item) {
             //->ITEM===THIS：当前遍历的这一项 [JS对象]
             index === curIn ? $(item).addClass('select') : $(item).removeClass('select');
          });
      });
 });
