function animate(options) {
    var _default={
        curEle:null,
        target:null,
        duration:1000,
        effect:animationEffect.Linear,
        callBack:null
    }
    for (var attr in options) {
        if(options.hasOwnProperty(attr)){
            _default[attr]=options[attr];
        }
    }
    var curEle=_default.curEle,
        target=_default.target,
        duration=_default.duration,
        effect=_default.ef

}