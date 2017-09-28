var musicRender=(function () {
    var $header=$('.header'),
        $main=$('.main'),
        $footer=$('.footer'),
        $wrapper=$main.find('.wrapper'),
        musicAudio=$('#musicAudio')[0],
        $musicBtn=$header.find('.musicBtn'),
        $current=$footer.find('.current'),
        $duration=$footer.find('.duration'),
        $already=$footer.find('.already');
        var $plan=$.Callbacks(),
            autoTimer=null,
            step=0,
            curTop=0;
        $plan.add(function (lyric) {
            lyric=lyric.replace(/&#(\d+);/g,function (res,num) {
                switch (parseFloat(num)){
                    case 32:
                        res=' ';
                        break;
                    case 40:
                        res='(';
                        break;
                    case 41:
                        res=')';
                        break;
                    case 45:
                        res='-';
                        break;
                }
                return res;
            });
            var ary=[],
                reg=/\[(\d+)&#58;(\d+)&#46;(?:\d+)\]([^&#]+)(?:&#10;)?/g;
            lyric
        })
})()
