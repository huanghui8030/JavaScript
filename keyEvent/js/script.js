var timer=null,
    flag=false;

window.onload=function(){
    var play=document.getElementById('play'),
        stop=document.getElementById('stop');

    // 开始抽奖
    play.onclick=playFun(play);
    stop.onclick=stopFun(play);

   // 键盘事件
   document.onkeyup=function(event){
      event = event || window.event;
      if(event.keyCode==13){
         if(!flag){
           playFun();
           flag=true;
         }else{
           stopFun();
           flag=false;
         }
      }
   };
};

function playFun(play){
  var data  = ['Phone5','Ipad','三星笔记本','佳能相机','惠普打印机','谢谢参与','50元充值卡','1000元超市购物券'],
	    title = document.getElementById('title');
	window.clearInterval(timer);
	timer = setInterval(function(){
	   var random = Math.floor(Math.random()*data.length);
	   title.innerHTML = data[random];
	},50);
    play.style.background = '#999';
}

function stopFun(play){
	clearInterval(timer);
	play.style.background = '#036';
}