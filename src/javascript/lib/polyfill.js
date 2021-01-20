if ('NodeList' in window && !NodeList.prototype.forEach) {
    console.info('polyfill for IE11');
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}
/////////////////////////  svgPolyFill  ////////////////////////
!function(a,b){"function"==typeof define&&define.amd?// AMD. Register as an anonymous module unless amdModuleId is set
    define([],function(){return a.svg4everybody=b()}):"object"==typeof exports?module.exports=b():a.svg4everybody=b()}(this,function(){/*! svg4everybody v2.0.3 | github.com/jonathantneal/svg4everybody */
    function a(a,b){
        if(b){
            var c=document.createDocumentFragment(),d=!a.getAttribute("viewBox")&&b.getAttribute("viewBox");
            d&&a.setAttribute("viewBox",d);
            for(// clone the target
                var e=b.cloneNode(!0);e.childNodes.length;)c.appendChild(e.firstChild);
            a.appendChild(c)}}function b(b){
        b.onreadystatechange=function(){
            if(4===b.readyState){
                var c=b._cachedDocument;
                c||(c=b._cachedDocument=document.implementation.createHTMLDocument(""),c.body.innerHTML=b.responseText,b._cachedTarget={}),// clear the xhr embeds list and embed each item
                    b._embeds.splice(0).map(function(d){
                        var e=b._cachedTarget[d.id];
                        e||(e=b._cachedTarget[d.id]=c.getElementById(d.id)),
                            a(d.svg,e)})}},
            b.onreadystatechange()}function c(c){function d(){
        for(
            var c=0;c<o.length;){
            var i=o[c],j=i.parentNode;if(j&&/svg/i.test(j.nodeName)){var k=i.getAttribute("xlink:href");
                if(e){
                    var l=document.createElement("img");
                    l.style.cssText="display:inline-block;height:100%;width:100%",// set the fallback size using the svg size
                        l.setAttribute("width",j.getAttribute("width")||j.clientWidth),l.setAttribute("height",j.getAttribute("height")||j.clientHeight),
                        l.src=f(k,j,i),
                        j.replaceChild(l,i)}else if(h&&(!g.validate||g.validate(k,j,i))){
                    j.removeChild(i);
                    var p=k.split("#"),q=p.shift(),r=p.join("#");
                    if(q.length){
                        var s=m[q];
                        s||(s=m[q]=new XMLHttpRequest,s.open("GET",q),s.send(),s._embeds=[]),
                            s._embeds.push({svg:j,id:r}),
                            b(s)}else
                        a(j,document.getElementById(r))}}else
                ++c}
        n(d,67)}var e,f,g=Object(c);f=g.fallback||function(a){return a.replace(/\?[^#]+/,"").replace("#",".").replace(/^\./,"")+".png"+(/\?[^#]+/.exec(a)||[""])[0]},e="nosvg"in g?g.nosvg:/\bMSIE [1-8]\b/.test(navigator.userAgent),e&&(document.createElement("svg"),document.createElement("use"));
        var h,i=/\bMSIE [1-8]\.0\b/,j=/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,k=/\bAppleWebKit\/(\d+)\b/,l=/\bEdge\/12\.(\d+)\b/;h="polyfill"in g?g.polyfill:i.test(navigator.userAgent)||j.test(navigator.userAgent)||(navigator.userAgent.match(l)||[])[1]<10547||(navigator.userAgent.match(k)||[])[1]<537;
        var m={},n=window.requestAnimationFrame||setTimeout,o=document.getElementsByTagName("use");
        h&&d()}return c});

