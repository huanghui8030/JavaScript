# CHSI移动端新闻模板

最后更新时间：2017.02.17

# wap新闻栏目布局模板

```html
<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
<title>新闻栏目列表</title>
<link rel="stylesheet" type="text/css" href="http://t1.chei.com.cn/common/wap/materialize/css/materialize.min.css?20160705">
<style>
.news-top {
  height: 40px;
  height: 2.87rem;
  background: #2dc5c4;
}
.news-top .logo-span, .news-top .link {
    display: inline-block;
    color: #fff;
    font-size: 12px;
    font-size: 0.86rem;
    height: 40px;
    height: 2.87rem;
    line-height: 42px;
    line-height: 3rem;
    border-left: 1px solid #2BADAA;
    border-right: 0;
    padding-left: 12px;
    padding-left: 0.67rem;
    overflow: hidden;
}
.news-top .logo-span{
    border-right: 1px solid #53E0DD;
    border-left:0;
    width:90px;
    width:6.43rem;
}
.news-top .link {
    margin-left:-3px;
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: nowrap;
    width:220px;
    width:15.7rem;
}
  .news-top .logo {
    background: url(http://t1.chei.com.cn/common/wap/images/news_logo_chsi.png) 0 center no-repeat;
    background-size: contain;
    width: 70px;
    width:5rem;
    height: 40px;
    height: 2.87rem;
    display:inline-block
}
.news-top .logo_yz {
    background-image: url(http://t2.chei.com.cn/common/wap/images/news_logo_yz.png);
 }
.news-top .logo_gk {
    background-image: url(http://t3.chei.com.cn/common/wap/images/news_logo_gk.png);
 }
.news-top .logo_zb {
    background-image: url(http://t4.chei.com.cn/common/wap/images/news_logo_zb.png);
}
.news-top .logo_ixy {
    background-image: url(http://t1.chei.com.cn/common/wap/images/news_logo_ixy.png);
}   
.news-top .link a {
    color: #fff;
}
.news-top .caidan {
    float: right;
    width: 16px;
    height: 12px;
    width: 1rem;
    height: 0.75rem;
    margin: 17px 9px 0 0;
    margin: 1.06rem 0.56rem 0 0;
    background: url(http://t2.chei.com.cn/common/wap/images/news_nav.png) no-repeat;
    background-size: 100%;
}
.pw-column{margin: 0; padding: 0;font-size:18px;font-size:1rem;line-height:24px;line-height:1.71rem;box-sizing: border-box;}
.pw-column li{padding:8px 8px 4px 8px;border-bottom:1px solid #eaeaea}
.pw-column a{display:flex;display:-webkit-flex;color:#333;justify-content:space-between}
.pw-column a:hover,.pw-column a:visited{color:#666}
.pw-column .newsContent{width:70%;display:inline-block;overflow:hidden;padding-right:20px;padding-right:1rem;text-overflow:ellipsis;white-space:nowrap;-webkit-text-overflow:ellipsis;flex:1}
.pw-column .spanTime{color:#999;font-size:1pc;font-size:.8rem;flex:0 0 auto;float: right;}
.pagination li.active{background-color: #52badc}
.pagination li{padding: 0 5px;font-size: 14px;font-size: 1rem;}
.pagination li a{color: #039be5;}
.news-share{position: absolute;top:-100px;left: 0}
</style>
<!--# include virtual="/common/ga.jsp" -->
</head>
<body>

$screen_content

</body>
</html>
```



# wap新闻栏目内容模板

```html
$news.setSeprator(' > ')
<img src="http://t1.chei.com.cn/common/wap/images/share_xxw.jpg" width="0" height="0" class='news-share'>
<div class="news-top">
       <div class='logo-span'><a class="logo" href='/'>&nbsp;</a></div
    >
	<div class="link">$news.getNavigator($category)</div>
</div>
<ul class='pw-column'>
       #foreach ($item in $docInfos.list)
	<li>
             <a href="$news.getLink($category,$item)" target="_blank"><div class="newsContent">$item.title</div><span class="spanTime">$date.format('yyyy-MM-dd',$item.displayDate)</span></a></li>
        #end
</ul>
[include]page_wap[/include]

<script type="text/javascript" src="http://t1.chei.com.cn/common/jquery/2.1.1/jquery.min.js"></script>
<script>
 $(function() {
                setNavWidth();
                getLogo();
            })
        function setNavWidth(){
            var $tops = $('.news-top');
            var w = $tops.width();
            var logoWidth = $('.logo-span').width();
            $('')
        }
            /**
             * 根据系统不同显示不同的logo
             * @author huangh@chsi.com.cn 
             * @date 20160928
             */
        function getLogo() {
            var href = window.location.href;
            var $nav = $('.news-top');
            if ($nav.length != 0) {
                //区分是否通过学信网app访问新闻，是则不显示nav，否则显示
                if (href.lastIndexOf('f=wap') > -1) { //学信网app
                    $nav[0].style.display = 'none';
                } else {
                    $nav[0].style.display = 'block';
                    //设置nav的位置，避免换行，省略显示。
                    var w = $nav.width()-$('.logo-span').width();
                    $nav.find('.link').width(w-30);
                    
                    var xtArr = ['www.chsi.com.cn', 'gaokao.chsi.com.cn', 'yz.chsi.com.cn', 'ixy.chsi.com.cn', 'www.gfbzb.gov.cn'],
                        cnameArr = ['logo', 'logo_gk', 'logo_yz', 'logo_ixy', 'logo_zb'],
                        xt = href.substring(href.indexOf('://') + 3);
                    xt = xt.substring(0, xt.indexOf('/'));
                    var n = getIndex(xt, xtArr) || 0;
                    $('.news-top .logo').addClass(cnameArr[n]) ;
                    //设置分享图片
                    var shareArr = ['share_xxw','share_gk','share_yz','share_ixy','share_zb'];
                    var shareSrc = 'http://t1.chei.com.cn/common/wap/images/'+shareArr[n]+'.jpg'
                    $('.news-share').attr('src',shareSrc);
                    
                }

            }
        }
        /**
         * 通过val当前值获取数组中的序号值
         * @param  {string} val 当前值
         * @param  {Array} arr 数组
         * @return {Number}   返回当前index值
         */
        function getIndex(val, arr) {
            for (i in arr) {
                if (arr[i] == val) {
                    return i;
                }
            }
        }
</script>
```



#WAP新闻布局模板

```html
<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
<title>$textDoc.docInfo.title</title>
<link rel="stylesheet" type="text/css" href="http://t1.chei.com.cn/common/wap/materialize/css/materialize.min.css?20160705">

<style>
 .news-top {
            height: 40px;
            height: 2.87rem;
            background: #2dc5c4;
        }
        
        .news-top .logo-span, .news-top .link {
            display: inline-block;
            color: #fff;
            font-size: 12px;
            font-size: 0.86rem;
            height: 40px;
            height: 2.87rem;
            line-height: 42px;
            line-height: 3rem;
            border-left: 1px solid #2BADAA;
            border-right: 0;
            padding-left: 12px;
            padding-left: 0.67rem;
            overflow: hidden;
        }
        .news-top .logo-span{
            border-right: 1px solid #53E0DD;
            border-left:0;
            width:90px;
            width:6.43rem;
        }
        .news-top .link {
            margin-left:-3px;
            overflow: hidden; 
            text-overflow: ellipsis; 
            white-space: nowrap;
            width:220px;
            width:15.7rem;
        }
        .news-top .logo {
            background: url(http://t1.chei.com.cn/common/wap/images/news_logo_chsi.png) 0 center no-repeat;
            background-size: contain;
            width: 70px;
            width:5rem;
            height: 40px;
            height: 2.87rem;
            display:inline-block
        }
        
        .news-top .logo_yz {
            background-image: url(http://t2.chei.com.cn/common/wap/images/news_logo_yz.png);
        }
        
        .news-top .logo_gk {
            background-image: url(http://t3.chei.com.cn/common/wap/images/news_logo_gk.png);
        }
        
        .news-top .logo_zb {
            background-image: url(http://t4.chei.com.cn/common/wap/images/news_logo_zb.png);
        }
        
        .news-top .logo_ixy {
            background-image: url(http://t1.chei.com.cn/common/wap/images/news_logo_ixy.png);
        }
        
        
        
        .news-top .link a {
            color: #fff;
        }
        
        .news-top .caidan {
            float: right;
            width: 16px;
            height: 12px;
            width: 1rem;
            height: 0.75rem;
            margin: 17px 9px 0 0;
            margin: 1.06rem 0.56rem 0 0;
            background: url(http://t2.chei.com.cn/common/wap/images/news_nav.png) no-repeat;
            background-size: 100%;
        }
        
        .wap-news h1 {
            font-size: 1.6rem;
            line-height: 1.2;
            position: relative;
            height: auto;
            top: 0;
            left: 0;
            margin: 18px 0;
            margin: 1rem 0;
        }
        
        .pw-time {
            padding-bottom: 0.3rem;
            border-bottom: 1px solid #ccc;
            color: #999;
            font-size: 12px;
            font-size: 0.85rem;
        }
        
        .wap-news img {
            max-width: 100%
        }
          .flow-text{padding:0 1px;}
        .flow-text h3 {
            font-size: 1.52rem;
            margin: 1rem 0 1rem 0;
        }
        
        .flow-text table {
            margin: 10px 0;
        }
        
        .flow-text td {
            border: 1px solid #ccc;
            padding: 2px 6px;
        }
        
        html {
            line-height: 1.8;
            background: #fafafa;
        }
        
        .flow-text {
            border-top: 1px solid #fff;
            overflow: auto;
            margin-bottom: 1rem;
            word-break: break-word;
        }
        
        .flow-text p {
            margin: 10px 0 0 0;
            padding: 0;
            word-wrap: break-word;
            word-break: break-word;
        }
.news-share{position: absolute;top:-100px;left: 0}

</style>
<!--# include virtual="/common/ga.jsp" -->
</head>
<body>
<img src="http://t1.chei.com.cn/common/wap/images/share_xxw.jpg" width="0" height="0" class='news-share'>
    $screen_content

</body>
</html>

```





# wap 新闻内容模板
```html
<div class='wap-news'>
$news.setSeprator(' > ')
<div class="news-top">
        <div class='logo-span'><a class="logo" href='/'>&nbsp;</a></div >
        <div class="link">$news.getNavigator($category)</div>
    </div>
<div class='container'>
  <h1>$textDoc.docInfo.title</h1>
  <div class="pw-time">
     #if($textDoc.docInfo.origin && $textDoc.docInfo.origin != '')  
    $textDoc.docInfo.origin 
     #end
     $date.format('yyyy年MM月dd日 kk:mm',$textDoc.docInfo.displayDate) 
  </div>
  <div class="flow-text">
     $textDoc.content
  </div>
</div>
<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="pswp__bg"></div>
    <div class="pswp__scroll-wrap">
        <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
        </div>
        <div class="pswp__ui pswp__ui--hidden">
            <div class="pswp__top-bar">
                <div class="pswp__counter"></div>
                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
               <!--  <button class="pswp__button pswp__button--share" title="Share"></button> 
                <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>-->
                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                <div class="pswp__preloader">
                    <div class="pswp__preloader__icn">
                        <div class="pswp__preloader__cut">
                            <div class="pswp__preloader__donut"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div class="pswp__share-tooltip"></div>
            </div>
            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
            </button>
            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
            </button>
            <div class="pswp__caption">
                <div class="pswp__caption__center"></div>
            </div>
        </div>
    </div>
</div>

<link rel="stylesheet" href="http://t1.chei.com.cn/common/wap/photoswipe/css/photoswipe.css"> 
<link rel="stylesheet" href="http://t2.chei.com.cn/common/wap/photoswipe/css/default-skin/default-skin.css"> 
<style>.pswp img{min-width:100%;}</style>
<script type="text/javascript" src="http://t4.chei.com.cn/common/jquery/2.1.1/jquery.min.js"></script> 
<script src="http://t3.chei.com.cn/common/wap/photoswipe/js/photoswipe.js"></script>
<script src="http://t4.chei.com.cn/common/wap/photoswipe/js/photoswipe-ui-default.min.js"></script> 
</div>

<script>
        $(function() {
                setNavWidth();
                getLogo();
                imgSwipe();
            })
        function setNavWidth(){
            var $tops = $('.news-top');
            var w = $tops.width();
            var logoWidth = $('.logo-span').width();
            $('')
        }
            /**
             * 根据系统不同显示不同的logo
             * @author huangh@chsi.com.cn 
             * @date 20160928
             */
        function getLogo() {
            var href = window.location.href;
            var $nav = $('.news-top');
            if ($nav.length != 0) {
                //区分是否通过学信网app访问新闻，是则不显示nav，否则显示
                if (href.lastIndexOf('f=wap') > -1) { //学信网app
                    $nav[0].style.display = 'none';
                } else {
                    $nav[0].style.display = 'block';
                    //设置nav的位置，避免换行，省略显示。
                    var w = $nav.width()-$('.logo-span').width();
                    $nav.find('.link').width(w-30);
                    
                    var xtArr = ['www.chsi.com.cn', 'gaokao.chsi.com.cn', 'yz.chsi.com.cn', 'ixy.chsi.com.cn', 'www.gfbzb.gov.cn'],
                        cnameArr = ['logo', 'logo_gk', 'logo_yz', 'logo_ixy', 'logo_zb'],
                        xt = href.substring(href.indexOf('://') + 3);
                    xt = xt.substring(0, xt.indexOf('/'));
                    var n = getIndex(xt, xtArr) || 0;
                     $('.news-top .logo').addClass(cnameArr[n]);
                   //各系统分享推广图
                   var shareArr = ['share_xxw','share_gk','share_yz','share_ixy','share_zb'];
                   var shareSrc = 'http://t1.chei.com.cn/common/wap/images/'+shareArr[n]+'.jpg'
                    $('.news-share').attr('src',shareSrc);

                }

            }
        }
        /**
         * 通过val当前值获取数组中的序号值
         * @param  {string} val 当前值
         * @param  {Array} arr 数组
         * @return {Number}   返回当前index值
         */
        function getIndex(val, arr) {
            for (i in arr) {
                if (arr[i] == val) {
                    return i;
                }
            }
        }
function imgSwipe(){
    //图片可预览效果的实现。
    $('.flow-text img').on('click',function(event) {
        var imgArray = [],imgIndex=0,$this = $(this);
        var curImageSrc = $this.attr('src');
        var oParent = $this.parent();
        if (curImageSrc && !oParent.attr('href')) {
            $('.flow-text img').each(function(index, el) {
                var $this = $(this),
                    itemSrc = $(this).attr('src');
                var bodyWidth = $(window.document.body).width(),
                    width = $this.width(),
                    height = $this.height();
                var h = (bodyWidth/width)*height;
                imgArray.push({src:itemSrc,w:bodyWidth,h:h});
                if(itemSrc == curImageSrc){
                    imgIndex = index;
                }
            });
            openPhotoSwipe(imgIndex,imgArray);
        }
    });
}
//调用PhotoSwiper方法，图片放大效果
function openPhotoSwipe(index,imgArr){
    var pswpElement = document.querySelectorAll('.pswp')[0];
    var $content = $(pswpElement).find('.pswp__container');
    var items =  $content.find('.pswp__item').length;
    var imgItems = imgArr.length;
    var n = imgItems - items;
    if(n >0){
        //动态设置item，否则报错，item和图片个数相同
        for(var i =0 ;i<n ;i++){
            $('<div class="pswp__item"></div>').appendTo($content);
        }
    }
    var options = {
        history: false,
        focus: false,
        showAnimationDuration: 0,
        hideAnimationDuration: 0,
        index:index
    };
    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, imgArr, options);
    gallery.init();
}
    </script>

```



# 分页- page_wap

```html
<ul class="pagination center-align">

set ($suffix='/')

set ($indexName="$category.articleUri$suffix")

第$docInfos.curPage/$docInfos.totalPage页  

if($getByRegion)

    <li class="waves-effect"><a href="\$indexName?start=0&regionId=\$regionId">首页</a></li>
    <li class="waves-effect"><a href="\$indexName?start=\$docInfos.startOfPreviousPage&regionId=\$regionId">上一页</a></li>
    <li class="waves-effect"><a href="\$indexName?start=\$docInfos.startOfNextPage&regionId=\$regionId">下一页</a></li>
    <li class="waves-effect"><a href="\$indexName?start=\$docInfos.startOfLastPage&regionId=\$regionId">末页</a></li>

else

    <li class="waves-effect"><a href="\$indexName?start=0">首页</a></li>
    <li class="waves-effect"><a href="\$indexName?start=\$docInfos.startOfPreviousPage">上一页</a></li>
    <li class="waves-effect"><a href="\$indexName?start=\$docInfos.startOfNextPage">下一页</a></li>
    <li class="waves-effect"><a href="\$indexName?start=\$docInfos.startOfLastPage">末页</a></li>

end

</ul>

```





