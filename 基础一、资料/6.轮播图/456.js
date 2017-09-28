function animate(options) {
    //->init parameters
    var _default = {
        curEle: null,
        target: null,
        duration: 1000,
        effect: animationEffect.Linear,
        callBack: null
    };
    for (var attr in options) {
        if (options.hasOwnProperty(attr)) {
            _default[attr] = options[attr];
        }
    }


    var curEle = _default.curEle,
        target = _default.target,
        duration = _default.duration,
        effect = _default.effect,
        callBack = _default.callBack;
    //->prepare time/begin/change/duration
    var time = 0,
        begin = {},
        change = {};
    for (var key in target) {
        if (target.hasOwnProperty(key)) {
            begin[key] = utils.css(curEle, key);
            change[key] = target[key] - begin[key];
        }
    }



    //->running
    window.clearInterval(curEle.animateTimer);
    curEle.animateTimer = window.setInterval(function () {
        time += 17;
        if (time >= duration) {
            window.clearInterval(curEle.animateTimer);
            utils.css(curEle, target);
            callBack && callBack.call(curEle);
            return;
        }


        var current = {};
        for (var key in target) {
            if (target.hasOwnProperty(key)) {
                current[key] = effect(time, begin[key], change[key], duration);
            }
        }
        utils.css(curEle, current);
    }, 17);
}

