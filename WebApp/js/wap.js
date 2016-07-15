
/**
 * @description 判断浏览器是否为移动端方法
 * @return 返回布尔值，true是移动端，false不是移动端
 * @author huangh@chsi.com.cn
 * @date 2016.07.12
 */
function wapFn() {
    var sUserAgent = navigator.userAgent.toLowerCase(),
        bIsIpad = sUserAgent.match(/ipad/i) == "ipad",
        bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os",
        bIsMidp = sUserAgent.match(/midp/i) == "midp",
        bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
        bIsUc = sUserAgent.match(/ucweb/i) == "ucweb",
        bIsAndroid = sUserAgent.match(/android/i) == "android",
        bIsCE = sUserAgent.match(/windows ce/i) == "windows ce",
        bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    //移动设备
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return true;
    } else {//pc
        return false;
    }
}
/**
 * @desciption 添加文件方法
 * @param path 文件类型，css和js
 * @param path 文件路径
 * @author huangh@chsi.com.cn
 * @date 2016.07.12
 */
function addFile(type,path){ 
    var addFile  = '';
    switch(type){
        case 'css':
            addFile  = document.createElement("link"); 
            addFile.rel  = "stylesheet"; 
            addFile.type = "text/css"; 
            addFile.href = path;
            break;
        case 'js':
            addFile  = document.createElement("script"); 
            addFile.type = "text/javascript"; 
            addFile.src = path;
            break;
        default:
            alert('没有添加合适的文件类型');
            break;    
    }
    addFile.media= "screen"; 
	var headobj  = document.getElementsByTagName('head')[0]; 
    headobj.appendChild(addFile); 
} 
/**
 * @description 给轮播图添加touch事件
 * @param target：目标原生
 * @param timer：轮播定时器
 * @param index：当前dome元素在父级原生中的位置，0开始。
 * @param playFn: 执行播放的函数名
 * @param autoFn: 自动播放的函数名
 * @param time: 执行时间
 */
function addTouch(target,timer,index,playFn,autoFn,time){
    var a = target;
    var page = {
        x:0,
        y:0
    };
    var touched;
    target.addEventListener('touchstart',function(e){
        clearTimeout(timer);
        page.x = e.changedTouches[0].pageX;
        page.y = e.changedTouches[0].pageY;
    });
    target.addEventListener('touchmove', function(e){
        if(null===touched){
            var pageX = e.changedTouches[0].pageX-page.x;
            var pageY = e.changedTouches[0].pageY-page.y;
            touched=Math.abs(pageX-page.x)<Math.abs(pageY-page.y);
        }
        if(!touched)e.preventDefault();
    });
    target.addEventListener('touchend', function(e){
        var pageX = e.changedTouches[0].pageX-page.x;
        var pageY = e.changedTouches[0].pageY-page.y;
        if(Math.abs(pageX)>50){
            if(pageX>0){//上一页
                a.playFn(index - 1);
            }else{//下一页
                a.playFn(index + 1);
            }
        }
        timer = setTimeout(autoFn, time);
        touched=null;
    });

}
