function PicSlide(a, c) {
    this.panel = typeof a == "string" ? document.getElementById(a) : a;
    for (var b in c) {
        this[b] = c[b]
    }
    this.type = this.type == "opacity" ? "opacity" : "scroll";
    this.init()
}
PicSlide.prototype = {
    current: 0,
    timer: null ,
    time: 500,
    type: "scroll",
    act: "scroll",
    interval: 4000,
    init: function() {
        var d = this
          , c = this.panel.parentNode;
        this.imgs = this.panel.getElementsByTagName("A");
        if (this.type == "opacity") {
            this.act = "fade";
            for (var b = 0, a = this.imgs.length; b < a; b++) {
                this.imgs[b].style.cssText = "position:absolute;display:" + (b == 0 ? "" : "none")
            }
        }
        this.createTab();
        this.interval = Math.max(this.interval, this.time);
        c.onmouseover = function() {
            d.hover = true
        }
        ;
        c.onmouseout = function() {
            d.hover = false
        }
        ;

        this.auto();
        //huanhg@chsi.com.cn 20170713 判断移动设备，加入touch事件
        if(wapFn()){
            this.imgs;
            for(var i=0;i<this.imgs.length;i++){
                this.touch(this.imgs[i]);
            }
            
        }
    },
    createTab: function() {
        var a = this.imgs.length, c, f = this;
        var d = document.createElement("DIV");
        var e = document.createElement("DIV");
        e.className = "panelMask";
        d.className = "slidePanel";
        this.panelTitle = document.createElement("DIV");
        this.nav = document.createElement("DIV");
        d.appendChild(e);
        d.appendChild(this.panelTitle);
        d.appendChild(this.nav);
        this.panel.parentNode.appendChild(d);
        this.nav.className = "slide_nav";
        this.panelTitle.className = "panelTitle";
        this.btns = [];
        for (var b = 0; b < a; b++) {
            c = document.createElement("A");
            this.btns.push(this.nav.appendChild(c));
            if (b == 0) {
                c.className = "hot"
            }
            c.innerHTML = b + 1;
            c.radioIndex = b;
            c.href = "javascript:void(0)";
            c.onmouseover = function() {
                f.focus(this.radioIndex)
            }
        }
        this.panelTitle.innerHTML = this.imgs[0].title
    },
    focus: function(a) {
        a = a % this.imgs.length;
        if (a == this.current) {
            return
        }
        this.btns[this.current].className = "";
        this.btns[a].className = "hot";
        this.panelTitle.innerHTML = this.imgs[a].title;
        this[this.act](a);
        this.current = a;
    },
    scroll: function(d) {
        var h = this
          , b = +new Date
          , c = this.time
          , e = this.panel.scrollTop
          , g = this.imgs[d].offsetTop
          , a = "scrollTop";
        if (this.dir == "x") {
            e = this.panel.scrollLeft;
            g = this.imgs[d].offsetLeft;
            a = "scrollLeft"
        }
        clearInterval(this.timer);
        this.timer = setInterval(function() {
            var f = Math.min(1, ((new Date - b) / c));
            h.panel[a] = e + (g - e) * h.fx(f);
            if (f == 1) {
                clearInterval(h.timer)
            }
        }, 10)
    },
    fade: function(b) {
        var d = this
          , a = +new Date
          , c = this.time;
        this.imgs[this.current].style.display = "none";
        this.opacity(this.imgs[b], 0);
        this.imgs[b].style.display = "";
        clearInterval(this.timer);
        this.timer = setInterval(function() {
            var e = Math.min(1, (new Date - a) / c);
            d.opacity(d.imgs[b], e);
            if (e == 1) {
                clearInterval(d.timer);
            }
        }, 10);
    },
    opacity: function(a, b) {
        a.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + b * 100 + ");";
        if (b == 1) {
            a.style.filter = null;
        }
        a.style.opacity = b;
    },
    fx: function(a) {
        return Math.pow(a, 0.5);
    },
    auto: function() {
        var a = this;
        setInterval(function() {
            if (!a.hover) {
                a.focus(a.current + 1);
            }
        }, this.interval)
    },
    /**
     * 方法扩展，加入touch事件，在移动设备上可鼠标滑动
     * @param target 目标元素a标签
     * @author huangh@chsi.com.cn
     * @date 2017.07.13
     */
    touch: function(target){
        var a = this;
        var page = {
            x:0,
            y:0
        };
        var touched;
        target.addEventListener('touchstart',function(e){
            clearTimeout(this.timer);
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
                var index = a.current;
                if(pageX>0){//上一页
                    a.focus(index - 1);
                }else{//下一页
                    a.focus(index + 1);
                }
            }
            this.timer = setTimeout(a.auto, a.interval);
            touched=null;
        });
    }
};
function SlideLay(b) {
    var g = typeof b == "string" ? document.getElementById(b) : b;
    var i = g.getElementsByTagName("A");
    this.box = document.createElement("ul");
    this.box.id = b;
    this.box.className = "slideLay";
    for (var c = 0; c < i.length; c++) {
        var d = document.createElement("li");
        var h = document.createElement("a");
        var e = document.createElement("span");
        var a = document.createElement("p");
        var f = i[c].cloneNode(true);
        h.innerHTML = i[c].title;
        h.href = i[c].getAttribute("href");
        h.target = "_blank";
        e.appendChild(h);
        a.appendChild(f);
        d.appendChild(e);
        d.appendChild(a);
        this.box.appendChild(d)
    }
    g.parentNode.appendChild(this.box);
    g.parentNode.removeChild(g);
    this.index.apply(this)
}
SlideLay.prototype = {
    index: function(f) {
        this.subs = this.box.getElementsByTagName("li");
        var b = this.subs[0].getElementsByTagName("span")[0].offsetWidth + 1;
        this.pos = this.subs.length - 1;
        for (var c = 0, a = this.subs.length; c < a; c++) {
            (function(j, h, g) {
                j.style.left = h * b + "px";
                j.onmouseover = function() {
                    if (g.pos != h) {
                        g.set(h)
                    }
                }
            })(this.subs[c], c, this)
        }
        this.col = b;
        var e = this, d;
        setInterval(function() {
            if (!d) {
                e.set(++e.pos)
            }
        }, 2000);
        this.box.onmouseover = function() {
            d = true
        }
        ;
        this.box.onmouseout = function() {
            d = false
        }
    },
    set: function(b) {
        this.pos = b % this.subs.length;
        var b = this.pos;
        var a = this.get(b);
        clearInterval(this.timer);
        this.timer = this.fx(function(e) {
            for (var d = 0, c = this.subs.length; d < c; d++) {
                this.subs[d].style.left = e(a.f[d], a.t[d]) + "px";
                this.fade(this.subs[d], b == d ? e(0, 1) : 1);
                this.subs[d].className = ""
            }
            this.subs[b].className = "hot"
        }, {}, this)
    },
    get: function(g) {
        var a = this.subs[0].offsetWidth - this.col * this.subs.length
          , e = []
          , d = [];
        for (var c = 0, b = this.subs.length; c < b; c++) {
            e.push(parseInt(this.subs[c].style.left));
            d.push(c * this.col + (c > g ? a : 0))
        }
        return {
            f: e,
            t: d
        }
    },
    fade: function(b, c) {
        var a = b.style;
        a.filter = "alpha(opacity=" + parseInt(c * 100) + ")";
        a.opacity = c
    },
    fx: function(j, a, h) {
        var b = Date, a = a || {}, g = +new b, c, h = h || a, f = a.end || b, i, e = a.fx || function(d) {
            return (d /= 0.5) < 1 ? (0.5 * Math.pow(d, 2)) : (-0.5 * ((d -= 2) * d - 2))
        }
        ;
        return c = setInterval(function() {
            i = Math.min(1, (new b - g) / 320);
            if (false === j.call(h, k, i) || i == 1) {
                f.call(h, clearInterval(c))
            }
        }, 10);
        function k(l, d) {
            return +l + (d - l) * e(i)
        }
    }
};
function isMouseLeaveOrEnter(c, b) {
    var c = c || window.event;
    if (c.type != "mouseout" && c.type != "mouseover") {
        return false
    }
    var a = c.relatedTarget ? c.relatedTarget : c.type == "mouseout" ? c.toElement : c.fromElement;
    while (a && a != b) {
        a = a.parentNode
    }
    return ( a != b)
}
function multiAdShow(a) {
    this._container = this.get(a.container);
    this._arrAd = this.getsChild(a.adwrap, a.container);
    this._len = this._arrAd.length;
    this._timer = a.timer;
    this._ctimer = null ;
    if (this._len <= 1) {
        return
    }
    if (!/[<>]/.test(this._arrAd[1].innerHTML)) {
        return
    }
    this._index = a.rand ? Math.floor(Math.random() * this._len) : 0;
    this.init();
    this.bindEven()
}
multiAdShow.prototype = {
    time: 600,
    get: function(a) {
        return document.getElementById(a)
    },
    getsChild: function(b, h) {
        var e = (h == undefined ? document : this.get(h));
        var c = [];
        var g = e.getElementsByTagName(b);
        for (var f = 0; f < g.length; f++) {
            if (g[f].parentNode == e) {
                c.push(g[f])
            }
        }
        return c
    },
    bindEven: function() {
        var a = this;
        this._container.onmouseover = function(b) {
            if (isMouseLeaveOrEnter(b, this)) {
                clearInterval(a._ctimer);
                a.focus(a._index)
            }
        }
        ;
        this._container.onmouseout = function(b) {
            if (isMouseLeaveOrEnter(b, this)) {
                clearInterval(a._ctimer);
                a.auto()
            }
        }
    },
    init: function() {
        if (this._index > (this._len - 1)) {
            this._index = 0
        }
        this._timer = Math.max(this._timer, this.time);
        for (var a = this._len; a--; ) {
            this._arrAd[a].style.cssText = "display:none"
        }
        this._arrAd[this._index].style.display = "block";
        this.auto();
        return this
    },
    focus: function(a) {
        a = a % this._len;
        if (a == this._index) {
            return
        }
        this.fade(a);
        this._index = a
    },
    fade: function(b) {
        var d = this
          , a = +new Date
          , c = this.time;
        this._arrAd[this._index].style.display = "none";
        this.opacity(this._arrAd[b], 0);
        this._arrAd[b].style.display = "";
        clearInterval(this.autoTimer);
        this.autoTimer = setInterval(function() {
            var e = Math.min(1, (new Date - a) / c);
            d.opacity(d._arrAd[b], e);
            if (e == 1) {
                clearInterval(d.autoTimer)
            }
        }, 10)
    },
    opacity: function(a, b) {
        a.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + b * 100 + ");";
        if (b == 1) {
            a.style.filter = null
        }
        a.style.opacity = b
    },
    auto: function() {
        var a = this;
        this._ctimer = setInterval(function() {
            a.focus(a._index + 1)
        }, a._timer)
    }
};
function PicNav(a, c) {
    this.panel = typeof a == "string" ? document.getElementById(a) : a;
    for (var b in c) {
        this[b] = c[b]
    }
    this.init()
}
PicNav.prototype = {
    current: 0,
    timer: null ,
    ctimer: null ,
    time: 500,
    interval: 4000,
    smallTag: "p",
    fullTag: "div",
    init: function() {
        var b = this
          , a = this.panel.parentNode;
        this.ads = this.panel.getElementsByTagName("LI");
        this.ulwrap = this.panel.getElementsByTagName("ul")[0];
        if (!!!this.ulwrap) {
            return
        }
        if (this.ads.length < 1) {
            return
        }
        this.createTab();
        this.interval = Math.max(this.interval, this.time);
        if (this.panel.offsetHeight < this.ulwrap.offsetHeight) {
            this.auto();
            this.panel.onmouseover = function(c) {
                if (isMouseLeaveOrEnter(c, this)) {
                    clearInterval(b.ctimer)
                }
            }
            ;
            this.panel.onmouseout = function(c) {
                if (isMouseLeaveOrEnter(c, this)) {
                    b.panel.scrollTop = b.current;
                    b.auto()
                }
            }
        }
    },
    createTab: function() {
        var e = this;
        this.fullWrapper = document.createElement("DIV");
        this.adWrapper = document.createElement("DIV");
        this.adWrapper.className = "adwrapper";
        this.fullWrapper.className = "fullWrapper";
        this._ulwrap = document.createElement("ul");
        this._ulwrap.innerHTML = this.ulwrap.innerHTML;
        this.adWrapper.appendChild(this.ulwrap);
        this.adWrapper.appendChild(this._ulwrap);
        this.panel.appendChild(this.adWrapper);
        this.panel.appendChild(this.fullWrapper);
        var d = this.adWrapper.getElementsByTagName(this.smallTag);
        var b = this.adWrapper.getElementsByTagName(this.fullTag);
        var a = d.length;
        this.fullWrapper.onmouseout = function(f) {
            if (isMouseLeaveOrEnter(f, this)) {
                e.adWrapper.style.display = "block";
                e.fullWrapper.style.display = "none"
            }
        }
        ;
        for (var c = 0; c < a; c++) {
            d[c].getElementsByTagName("img")[0].onmouseover = function() {
                e.fullWrapper.innerHTML = this.parentNode.parentNode.parentNode.getElementsByTagName(e.fullTag)[0].innerHTML;
                e.adWrapper.style.display = "none";
                e.fullWrapper.style.display = "block"
            }
        }
    },
    scroll: function() {
        var e = this
          , a = +new Date
          , b = this.time
          , c = this.panel.scrollTop
          , d = this.panel.offsetHeight;
        clearInterval(this.timer);
        this.timer = setInterval(function() {
            var f = Math.min(1, ((new Date - a) / b));
            e.panel.scrollTop = c + d * e.fx(f);
            if (e.panel.scrollTop == e.adWrapper.offsetHeight - d) {
                e.panel.scrollTop = parseInt(e.adWrapper.offsetHeight / 2) - d
            }
            if (f == 1) {
                clearInterval(e.timer);
                e.current = e.panel.scrollTop
            }
        }, 10)
    },
    fx: function(a) {
        return Math.pow(a, 0.5)
    },
    auto: function() {
        var a = this;
        clearInterval(this.ctimer);
        this.ctimer = setInterval(function() {
            a.scroll()
        }, this.interval)
    }
};
function AutoSlide(b, a, d) {
    this.panel = typeof b == "string" ? document.getElementById(b) : b;
    this.imgs = [];
    for (var e in a) {
        this.imgs.push(document.getElementById(a[e]))
    }
    for (var c in d) {
        this[c] = d[c]
    }
    this.type = "opacity";
    this.init()
}
AutoSlide.prototype = {
    current: 0,
    timer: null ,
    time: 500,
    type: "scroll",
    act: "scroll",
    interval: 4000,
    init: function() {
        var d = this
          , c = this.panel.parentNode;
        if (this.type == "opacity") {
            this.act = "fade";
            for (var b = 0, a = this.imgs.length; b < a; b++) {
                this.imgs[b].style.cssText = "position:absolute;display:" + (b == 0 ? "" : "none")
            }
        }
        this.createTab();
        this.interval = Math.max(this.interval, this.time);
        c.onmouseover = function() {
            d.hover = true
        }
        ;
        c.onmouseout = function() {
            d.hover = false
        }
        ;
        this.auto();
    },
    createTab: function() {
        var a = this.imgs.length, c, f = this;
        var d = document.createElement("DIV");
        var e = document.createElement("DIV");
        e.className = "panelMask";
        d.className = "slidePanel";
        this.panelTitle = document.createElement("DIV");
        this.nav = document.createElement("DIV");
        d.appendChild(e);
        d.appendChild(this.panelTitle);
        d.appendChild(this.nav);
        this.panel.parentNode.appendChild(d);
        this.nav.className = "slide_nav";
        this.panelTitle.className = "panelTitle";
        this.btns = [];
        for (var b = 0; b < a; b++) {
            c = document.createElement("A");
            this.btns.push(this.nav.appendChild(c));
            if (b == 0) {
                c.className = "hot"
            }
            c.innerHTML = b + 1;
            c.radioIndex = b;
            c.href = "javascript:void(0)";
            c.onmouseover = function() {
                f.focus(this.radioIndex)
            }
        }
        this.panelTitle.innerHTML = this.imgs[0].title
    },
    focus: function(a) {
        a = a % this.imgs.length;
        if (a == this.current) {
            return
        }
        this.btns[this.current].className = "";
        this.btns[a].className = "hot";
        this.panelTitle.innerHTML = this.imgs[a].title;
        this[this.act](a);
        this.current = a
    },
    scroll: function(d) {
        var h = this
          , b = +new Date
          , c = this.time
          , e = this.panel.scrollTop
          , g = this.imgs[d].offsetTop
          , a = "scrollTop";
        if (this.dir == "x") {
            e = this.panel.scrollLeft;
            g = this.imgs[d].offsetLeft;
            a = "scrollLeft"
        }
        clearInterval(this.timer);
        this.timer = setInterval(function() {
            var f = Math.min(1, ((new Date - b) / c));
            h.panel[a] = e + (g - e) * h.fx(f);
            if (f == 1) {
                clearInterval(h.timer)
            }
        }, 10)
    },
    fade: function(b) {
        var d = this
          , a = +new Date
          , c = this.time;
        this.imgs[this.current].style.display = "none";
        this.opacity(this.imgs[b], 0);
        this.imgs[b].style.display = "";
        clearInterval(this.timer);
        this.timer = setInterval(function() {
            var e = Math.min(1, (new Date - a) / c);
            d.opacity(d.imgs[b], e);
            if (e == 1) {
                clearInterval(d.timer)
            }
        }, 10)
    },
    opacity: function(a, b) {
        a.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + b * 100 + ");";
        if (b == 1) {
            a.style.filter = null
        }
        a.style.opacity = b
    },
    fx: function(a) {
        return Math.pow(a, 0.5)
    },
    auto: function() {
        var a = this;
        setInterval(function() {
            if (!a.hover) {
                a.focus(a.current + 1)
            }
        }, this.interval)
    }
};
function z_PicSlide(a, c) {
    this.panel = typeof a == "string" ? document.getElementById(a) : a;
    for (var b in c) {
        this[b] = c[b]
    }
    this.type = this.type == "opacity" ? "opacity" : "scroll";
    this.init()
}
z_PicSlide.prototype = {
    current: 0,
    timer: null ,
    time: 500,
    type: "scroll",
    act: "scroll",
    interval: 4000,
    init: function() {
        var d = this
          , c = this.panel.parentNode;
        this.imgs = this.panel.getElementsByTagName("A");
        if (this.type == "opacity") {
            this.act = "fade";
            for (var b = 0, a = this.imgs.length; b < a; b++) {
                this.imgs[b].style.cssText = "position:absolute;display:" + (b == 0 ? "" : "none")
            }
        }
        this.createTab();
        this.interval = Math.max(this.interval, this.time);
        c.onmouseover = function() {
            d.hover = true
        }
        ;
        c.onmouseout = function() {
            d.hover = false
        }
        ;
        this.auto()
    },
    createTab: function() {
        var a = this.imgs.length, c, f = this;
        var d = document.createElement("DIV");
        var e = document.createElement("DIV");
        e.className = "panelMask";
        d.className = "slidePanel";
        this.panelTitle = document.createElement("DIV");
        this.nav = document.createElement("DIV");
        d.appendChild(e);
        d.appendChild(this.panelTitle);
        d.appendChild(this.nav);
        this.panel.parentNode.appendChild(d);
        this.nav.className = "slide_nav";
        this.panelTitle.className = "panelTitle";
        this.btns = [];
        for (var b = 0; b < a; b++) {
            c = document.createElement("A");
            this.btns.push(this.nav.appendChild(c));
            if (b == 0) {
                c.className = "hot"
            }
            c.innerHTML = this.imgs[b].innerHTML;
            c.getElementsByTagName("img")[0].setAttribute("width", 45);
            c.getElementsByTagName("img")[0].setAttribute("height", 32);
            c.radioIndex = b;
            c.href = "javascript:void(0)";
            c.onmouseover = function() {
                f.focus(this.radioIndex)
            }
        }
        this.panelTitle.innerHTML = this.imgs[0].title
    },
    focus: function(a) {
        a = a % this.imgs.length;
        if (a == this.current) {
            return
        }
        this.btns[this.current].className = "";
        this.btns[a].className = "hot";
        this.panelTitle.innerHTML = this.imgs[a].title;
        this[this.act](a);
        this.current = a
    },
    scroll: function(d) {
        var h = this
          , b = +new Date
          , c = this.time
          , e = this.panel.scrollTop
          , g = this.imgs[d].offsetTop
          , a = "scrollTop";
        if (this.dir == "x") {
            e = this.panel.scrollLeft;
            g = this.imgs[d].offsetLeft;
            a = "scrollLeft"
        }
        clearInterval(this.timer);
        this.timer = setInterval(function() {
            var f = Math.min(1, ((new Date - b) / c));
            h.panel[a] = e + (g - e) * h.fx(f);
            if (f == 1) {
                clearInterval(h.timer)
            }
        }, 10)
    },
    fade: function(b) {
        var d = this
          , a = +new Date
          , c = this.time;
        this.imgs[this.current].style.display = "none";
        this.opacity(this.imgs[b], 0);
        this.imgs[b].style.display = "";
        clearInterval(this.timer);
        this.timer = setInterval(function() {
            var e = Math.min(1, (new Date - a) / c);
            d.opacity(d.imgs[b], e);
            if (e == 1) {
                clearInterval(d.timer)
            }
        }, 10)
    },
    opacity: function(a, b) {
        a.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + b * 100 + ");";
        if (b == 1) {
            a.style.filter = null
        }
        a.style.opacity = b
    },
    fx: function(a) {
        return Math.pow(a, 0.5)
    },
    auto: function() {
        var a = this;
        setInterval(function() {
            if (!a.hover) {
                a.focus(a.current + 1)
            }
        }, this.interval)
    }
};

/**
 * @description 判断设备是否为移动端设备
 * @return ture是，false否
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
