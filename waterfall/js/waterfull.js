window.onload = function () {
    waterfull('waterfall');
}
/**
 * 执行方法
 * @param parentId ： 父元素id
 */
function waterfull(parentId) {
    var oParent = document.getElementById(parentId);
    //通过父元素，获取下面的classname为box的元素
    var boxsArr = getClassNames(oParent,'box');
    //获取一行的个数，并固定父元素的width
    var width = document.body.clientWidth;
    var boxw = boxsArr[0].offsetWidth;
    var col = Math.floor(width/boxw);
    oParent.style.cssText='width:'+width+'px;margin:0 auto';
    //比较一行中高度最小的那个，将后面的元素定位到其下面
    
}
/**
 * 通过父元素，和子元素的classname获取元素
 */
function getClassNames(parent,boxId){
    var ochild = document.getElementsByTagName('div'),
        objArr = [];
    for(i=0,j=ochild.length;i<j;i++){
        var obj = ochild[i];
        if(obj.className == 'box'){
            objArr.push(obj);
        }
    }
    return objArr;
}