# 分页- page_wap

<ul class="pagination center-align">
#set (\$suffix='/')
#set (\$indexName="\$category.articleUri\$suffix")
第\$docInfos.curPage/\$docInfos.totalPage页&nbsp;&nbsp;
#if(\$getByRegion)
	<li class="waves-effect"><a href="\$indexName?start=0&regionId=\$regionId">首页</a></li>
	<li class="waves-effect"><a href="\$indexName?start=\$docInfos.startOfPreviousPage&regionId=\$regionId">上一页</a></li>
	<li class="waves-effect"><a href="\$indexName?start=\$docInfos.startOfNextPage&regionId=\$regionId">下一页</a></li>
	<li class="waves-effect"><a href="\$indexName?start=\$docInfos.startOfLastPage&regionId=\$regionId">末页</a></li>
#else
	<li class="waves-effect"><a href="\$indexName?start=0">首页</a></li>
	<li class="waves-effect"><a href="\$indexName?start=\$docInfos.startOfPreviousPage">上一页</a></li>
	<li class="waves-effect"><a href="\$indexName?start=\$docInfos.startOfNextPage">下一页</a></li>
	<li class="waves-effect"><a href="\$indexName?start=\$docInfos.startOfLastPage">末页</a></li>
#end
</ul>


#WAP新闻布局模板

<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
<title>$textDoc.docInfo.title</title>
<link rel="stylesheet" type="text/css" href="http://t1.chei.com.cn/common/wap/materialize/css/materialize.min.css?20160705">
<style>
.pw-nav{    
	padding-left: 10px;
	padding-left: 0.71rem;
    background: #f8f8f8;
    border-bottom: 1px solid #dfdfdf;
    line-height: 42px;
    line-height: 3rem;
    min-height: 42px;
    min-height: 3rem;
    font-size: 16px;
    font-size: 1.14rem;
}
.pw-time{color: #999;font-size: 12px;font-size: 0.85rem;}
img{max-width: 100%} 
.flow-text h3{ font-size: 1.52rem;margin: 1rem 0 1rem 0; }
.flow-text table{ border-spacing: 1px;border-collapse: separate;}   
</style>

</head>
<body>

    $screen_content

</body>
</html>



# wap 新闻内容模板
$news.setSeprator(' > ')
<div class="pw-nav">$news.getNavigator($category)</div>
<div class='container'>
  <h5>$textDoc.docInfo.title</h5>
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
<script type="text/javascript" src="http://t4.chei.com.cn/common/jquery/2.1.1/jquery.min.js"></script>
<script type="text/javascript" src="http://t4.chei.com.cn/common/wap/materialize/js/materialize.min.js"></script>
<script>
$(function () {
	var href = window.location.href;
	var nav = document.getElementsByClassName('pw-nav')[0];
	if(nav!=''){
		if(href.lastIndexOf('f=wap')>-1){//wap端
			nav.style.display = 'none';
		}else{
			nav.style.display = 'block';
		}
	}
	$('.flow-text img').addClass('waves-effect waves-teal z-depth-2 materialboxed ').css('display','inline-block').materialbox();

})
</script>


# wap新闻栏目模板
<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
<title>新闻栏目列表</title>
<link rel="stylesheet" type="text/css" href="http://t1.chei.com.cn/common/wap/materialize/css/materialize.min.css?20160705">
<style>
.pw-nav{padding-left: 10px;
	padding-left: 0.71rem;
    background: #f8f8f8;
    border-bottom: 1px solid #dfdfdf;
    line-height: 42px;
    line-height: 3rem;
    min-height: 42px;
    min-height: 3rem;
    font-size: 16px;
    font-size: 1.14rem;}
.pw-column{font-size:18px;font-size:1rem;line-height:24px;line-height:1.71rem;box-sizing: border-box;}
.pw-column li{padding:8px 8px 4px 8px;border-bottom:1px solid #eaeaea}
.pw-column a{display:flex;display:-webkit-flex;color:#333;justify-content:space-between}
.pw-column a:hover,.pw-column a:visited{color:#666}
.pw-column .newsContent{width:70%;display:inline-block;overflow:hidden;padding-right:20px;padding-right:1rem;text-overflow:ellipsis;white-space:nowrap;-webkit-text-overflow:ellipsis;flex:1}
.pw-column .spanTime{color:#999;font-size:1pc;font-size:.8rem;flex:0 0 auto;float: right;}
.pagination li.active{background-color: #52badc}
.pagination li{padding: 0 5px;font-size: 14px;font-size: 1rem;}
.pagination li a{color: #039be5;}
</style>
</head>
<body>

$screen_content

</body>
</html>


# wap新闻栏目内容模板
$news.setSeprator(' > ')
<div class="pw-nav">
	$news.getNavigator($category)
</div>
<ul class='pw-column'>
       #foreach ($item in $docInfos.list)
	<li>
             <a href="$news.getLink($category,$item)" target="_blank"><div class="newsContent">$item.title</div><span class="spanTime">$date.format('yyyy-MM-dd',$item.displayDate)</span></a></li>
        #end
</ul>
[include]page_wap[/include]
