<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<%@ page session="false" %>
<%@ taglib prefix="chsi" uri="http://www.chsi.com.cn/commontag" %>
<link href="http://t1.chei.com.cn/chsi/css/common2014.css" rel="stylesheet" type="text/css">
<div class="m_r" id="rightH">
    <iframe src="http://www.chsi.com.cn/common/right_xlrz.jsp" style='width: 219px;height: 100%;border: 0px;margin-left: 1px;overflow: hidden;' class='right_iframe'>
    </iframe>
    <h2><span class="line">&nbsp;</span><span class="txt">联系我们</span></h2>
    <div class="m_cnt_s">
		<p>工作时间：工作日8:30-17:00</p>
        <p>通讯地址：北京市海淀区北四环中路238号柏彦大厦506室（北航北门向东200米）</p>
        <p>咨询电话：010-61139123</p>
        <p>传真电话：010-61139120</p>
        <p>客服邮箱：xlrz#moe.edu.cn（将#替代为@）</p>
        <p style="color:#999;">由于进行电话咨询的用户较多，因此建议您通过电子邮件方式进行咨询，我们会及时给你回复。</p>   
    </div>
</div>
<script>
$(function(){
    iframeLoad();
});
//通过iframe的方法来引入右侧学信网中的样式，bian
function iframeLoad(){
    var $iframe = $('.right_iframe');
    $iframe.load(function(e) {
        var doc = this.contentWindow.document;
        //加载样式表
        $('<link href="http://t1.chei.com.cn/chsi/css/common2014.css" rel="stylesheet" type="text/css">').appendTo($(doc.head));
        var $winbody = $(doc.body);
        //设置m_r的样式，以及样式高度
        var $mr = $winbody.find('.m_r');
        $mr.css({'width':'219px','padding-bottom':'0','overflow':'hidden'});
        var h = $mr.height()+10;
        $winbody.css({'background':'#fff','overflow':'hidden','height':h+'px'});
        $(this).height(h);
    });    
    
}

</script>