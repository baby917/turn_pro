;(function($, window, document, undefined) {
    var LuckDraw = function(ele, opt) {
        this.$element = ele,
        this.defaults = {
			row:4, //行
			column:4, //列
			spacing:0,
			click :null,
			time : 3,
            end:function(e){}
        },
        this.options = $.extend({},this.defaults, opt);
    }
    LuckDraw.prototype = {
        init: function() {
			var $this = this.$element;
			var row = this.options.row;
			var col = this.options.column;
			var spacing = this.options.spacing;
			var click = this.options.click;
			var allNumber = 2 * (row + col) - 4;
			var line = row-2;//除去上下de行数
			var length = $this.children('li').length;
			var options = this.options;
			if(length < allNumber){
				for(var i=length;i<=(allNumber-length);i++){
					$this.append("<li>"+(i+1)+"</li>");
				}
			}
			var children = $this.children('li');
			var width = children.eq(0).width() || 0;
			var height = children.eq(0).height() || 0;

			// 元素初始化
			$this.css({
				position:'relative',
				width:col * width + (col-1) * spacing,
				height:row * height + (row-1) * spacing
			});
			children.css({
				position:'absolute'
			});

			var target = superInt; //目标，指定或随机
			var ix = 0; //位置
			var stop ;
			var flg = false; //抽奖是否正在运行
			/*
				加速度公式
				v1 = v0 + a*t;注意加速度的v代表时间
				此时的t可以我们自己定义，所以是常量，所以只需要求a的值
			*/
			var a = -25.0;
			var v0 = 50.0;
			var t = 0.0 , v ;
			var time = this.options.time*1000;//匀速运行的时间，单位秒
			
			$(click).on('click',function(){
				if(!flg){
					flg = true;
					target = superInt;
					speedUp();
				}else{
					return ;
				}
			});

			//加速
			function speedUp(){
				runner(ix);
				if(v <= 50){
					clearTimeout(stop);
					v = 50;
					t = 0.0;
					uniform(); //跳转到匀速
				}else{
					t++;
					v = v0 + a*t;
					stop = setTimeout(speedUp,v);
				}
			}
			//匀速
			function uniform(){
				stop = setTimeout(uniform,v);
				if(t == time/50){
					clearTimeout(stop);
					t = 0.0;
					speedDown();
				}else{
					t++;
				}
				runner(ix);
			}
			//减速
			function speedDown(){
				var stop3 = setTimeout(speedDown,v);
				if(v >= 100){
					v = 100;
					if(ix == target-1){
						clearTimeout(stop3);
						options.end(target);
						flg = false;
					}
				}else{
					t++;
					v = v - a*t;
				}
				runner(ix);
			}
			//ix++
			function runner(i){
				children.removeClass('on').eq(ix).addClass('on');
				i++;
				if(i == allNumber){
					ix = 0;
				}else{
					ix = i;
				}
			}
		},
		setTarget: function(options){
			var $this = this.$element;
			$this.target = options;
		}
    }
    $.fn.myLuckDraw = function(options,target) {
        var Ld = new LuckDraw(this,options);
		Ld.setTarget(target);
		Ld.init();
        return this;
    }
})(jQuery,window,document);
