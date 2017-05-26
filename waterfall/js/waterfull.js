window.onload = function () {
    waterfull('waterfall');
    window.onscroll = function(){
        //判断时候什么时候开始加载数据
        if(hasLoding){
            
        }
    }
}

/**
 * 执行方法，图片进行瀑布流显示
 * @param parentId ： 父元素id
 * @author huangh@chsi.com.cn 
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
    var hArr=[];
    for(var i=0,j=boxsArr.length;i<j;i++){
        if(i<col){
            hArr.push(boxsArr[i].offsetHeight);
        }else{
            //获取最小的高度，这里Math.min.apply()方法获取
            var minH = Math.min.apply(null,hArr);
            var index = getMinIndex(minH,hArr);
            console.log(index);
            boxsArr[i].style.cssText='position:absolute;top:'+hArr[index]+'px;left:'+index*boxw+'px';
            hArr[index]+=boxsArr[i].offsetHeight;
            
        }
    }
}
/**
 * 通过父元素，和子元素的classname获取元素
 * @param parent:父级元素
 * @param cName：子元素的classname
 * @author huangh@chsi.com.cn 
 */
function getClassNames(parent,cName){
    var ochild = document.getElementsByTagName('*'),
        objArr = [];
    for(i=0,j=ochild.length;i<j;i++){
        var obj = ochild[i];
        if(obj.className == cName){
            objArr.push(obj);
        }
    }
    return objArr;
}
/**
 * 找出数组中某个元素的索引值
 * @param val：数组中的某个元素值
 * @param arr: 数组对象
 * @return i:当前索引值
 * @author huangh@chsi.com.cn 
 */
function getMinIndex(val,arr){
    for(var i in arr){
        if(arr[i]==val){
            return i;
        }
    }
}
/*
 * 判断时候可以开始加载数据，当最后一张图露出一半的时候开始加载数据
 * @param
 * @return true/false
 * @author huangh@chsi.com.cn 
 **/
function hasLoding(){
    
}