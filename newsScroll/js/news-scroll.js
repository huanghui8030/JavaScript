/**
 * 滚动的构造函数
 * @param {[string]} type 滚动类型seamless/intermittent
 * @param {[json]} json json格式数据参数{type:'seamless',speed:50}
 * @author huanghui
 * @date 20160811
 */
function NewsScroll(targetId, json) {
    this.box = (typeof targetId == "string") ? document.getElementById(targetId) : targetId;
    for (var i in json) {
        this[i] = json[i];
    }
    this.type = (this.type == "intermittent") ? "intermittent" : "seamless";
    this.init();
}
NewsScroll.prototype = {
    timer : null ,     //定时器
    speed : 50,        //滚动速度
    pause : 500,      //间歇性滚动事件
    liHeigth:24,      //间歇性滚动时每次滚动的高度
    type : "seamless", //滚动方式，间歇性滚动还是无缝滚动，默认为无缝滚动
    //自定义方法
    init:function(){
    	var _this = this,
    		_box = _this.box,
    		ulLists = _box.getElementsByTagName('ul')[0],
			//新建一个ul元素，然后追加到div#news-box里面，最后将ulLists的内容复制给newUl
			newUl = document.createElement('ul');
		newUl.innerHTML = ulLists.innerHTML;
		_box.appendChild(newUl);
		//速度值speed，开始滚动
		_box.scrollTop = 0;	
		
		//只有为无缝滚动时才会有鼠标移入停止，鼠标移除继续滚动的功能
		if(_this.type == 'seamless'){
			_this.timer = setInterval(function(){
				_this.scroll(_box,ulLists)
			},_this.speed);
			_box.onmouseover = function(){
				clearInterval(_this.timer);
			}
			_box.onmouseout = function(){
					_this.timer = setInterval(function(){
					_this.scroll(_box,ulLists)
				},_this.speed);
			}
		}else{
			setTimeout(function(){
				_this.startScroll(_box,ulLists);
			},_this.pause);
		}
    },
    scroll:function(box,ulLists){
    	if(box.scrollTop>ulLists.scrollHeight){
			box.scrollTop = 1;//设置为1滚动更加流畅，如果为0会有一个小的停顿。
		}else{
			box.scrollTop ++;
		}
    },
    startScroll:function(box,ulLists){
    	var _this = this;
    	_this.timer = setInterval(function(){
    		_this.scrollFn(box,ulLists);
    	},_this.speed);
		box.scrollTop ++;
    },
    scrollFn:function(box,ulLists){
    	var _this = this;
    	if(box.scrollTop%_this.liHeigth==0){
			clearInterval(_this.timer);
			setTimeout(function(){
				_this.startScroll(box,ulLists);
			},this.pause);
		}else{
			box.scrollTop ++;
			if(box.scrollTop>ulLists.scrollHeight){
				box.scrollTop = 1;
			}
		}
    }
};    
