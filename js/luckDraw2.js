function myRotate(obj,arg,txt) {
    var isture = 0;
    var rotateFunc = function(awards, angle,txt) {
        isture = true;
        obj.rotate({
            angle: 0,
            duration: 4000, //旋转时间
            animateTo: angle + 1440, //让它根据得出来的结果加上1440度旋转
            callback: function() {
                isture = false; // 标志为 执行完毕
                layer.msg(txt)
            }
        });
    };
    var clickfunc = function(txt) {
        //目标
        var data = arg;
        switch(data) {
            case 1:
                rotateFunc(1, -23, txt);
                break;
            case 2:
                rotateFunc(2, 23,txt);
                break;
            case 3:
                rotateFunc(3, 68, txt);
                break;
            case 4:
                rotateFunc(4, 112, txt);
                break;
            case 5:
                rotateFunc(5, 162, txt);
                break;
            case 6:
                rotateFunc(6, 207, txt);
                break;
            case 7:
                rotateFunc(7, 252, txt);
                break;
            case 8:
                rotateFunc(8, 287, txt);
                break;
        }
    }
    clickfunc(txt);
}
