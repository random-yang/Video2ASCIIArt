(function(t){function e(e){for(var o,i,s=e[0],c=e[1],h=e[2],d=0,l=[];d<s.length;d++)i=s[d],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&l.push(r[i][0]),r[i]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(t[o]=c[o]);u&&u(e);while(l.length)l.shift()();return a.push.apply(a,h||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],o=!0,s=1;s<n.length;s++){var c=n[s];0!==r[c]&&(o=!1)}o&&(a.splice(e--,1),t=i(i.s=n[0]))}return t}var o={},r={app:0},a=[];function i(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=o,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(n,o,function(e){return t[e]}.bind(null,o));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var h=0;h<s.length;h++)e(s[h]);var u=c;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var o=n("2b0e"),r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{class:{"app--dark-mode":t.isDarkMode},attrs:{id:"app"}},[o("h1",{staticClass:"app__title",class:{"app__title--dark-mode":t.isDarkMode}},[o("img",{staticClass:"app__logo",class:{"app__logo--dark-mode":t.isDarkMode},attrs:{src:n("cf05"),alt:"logo"}}),o("span",[t._v("Video2ASCIIArt DEMO")])]),o("div",{staticClass:"app__main"},[o("div",{staticClass:"grid-cell"},[o("video",{ref:"videoDOM",attrs:{src:t.videoURL,controls:"controls",crossorigin:""}})]),o("div",{staticClass:"grid-cell"},[o("Video2ASCIIArt",{attrs:{charPpi:t.charPpi,color:t.color}},[o("video",{ref:"videoDOM",attrs:{src:t.videoURL,controls:"controls",crossorigin:""}})])],1)])])},a=[],i=n("dd5d"),s=n("6a93"),c=n.n(s),h=(n("7f7f"),n("ac6a"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{width:"100%",position:"relative"}},[n("div",{staticStyle:{opacity:"0","font-size":"0"}},[t._t("default")],2),n("canvas",{ref:"canvasDOMRef",staticStyle:{position:"absolute",top:"0",left:"0","pointer-events":"none"},attrs:{width:t.canvasW,height:t.canvasH}})])}),u=[],d=(n("c5f6"),n("8e6e"),n("456d"),n("28a5"),n("bd86")),l=n("d225"),p=n("b0b4");function f(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function v(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?f(n,!0).forEach((function(e){Object(d["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):f(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var m=function(t,e,n){return.299*t+.578*e+.114*n},g=function(t){var e=255,n=["@","W","#","$","O","E","X","C","[","(","/","?","=","^","~","_",".","`"],o=Math.floor(n.length*t/e);return n[o]},y=function(){function t(e,n,o){Object(l["a"])(this,t),this.video=e,this.options=v({charPPI:1,color:"#000000"},o),this.canvas=n,this.ctx=n.getContext("2d"),this.frameLoader=document.createElement("canvas"),this.frameLoaderCtx=this.frameLoader.getContext("2d"),this.frameLoader.width=this.canvas.width,this.frameLoader.height=this.canvas.height}return Object(p["a"])(t,[{key:"changecharPpi",value:function(t){var e={charPPI:t};this.changeOptions(e)}},{key:"changeColor",value:function(t){var e={color:t};this.changeOptions(e)}},{key:"changeOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.options=v({},this.options,{},t)}},{key:"drawChars",value:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,o=this.options.color;this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.ctx.font="".concat(n,"px Courier"),this.ctx.fillStyle=o,t.split("\n").forEach((function(t,o){e.ctx.fillText(t,0,o*n)}))}},{key:"getFrameFromVideo",value:function(){this.frameLoaderCtx.drawImage(this.video,0,0,this.frameLoader.width,this.frameLoader.height)}},{key:"frameToChar",value:function(){for(var t=this.frameLoaderCtx.getImageData(0,0,this.frameLoader.width,this.frameLoader.height),e=t.data,n=t.width,o=t.height,r="",a=this.options.charPPI,i=10/a,s=6/a,c=0;c<o;c+=i){for(var h=0;h<n;h+=s){var u=4*(h+n*c),d=e[u+0],l=e[u+1],p=e[u+2],f=m(d,l,p);r+="".concat(g(f))}r+="\n"}return r}},{key:"update",value:function(){this.getFrameFromVideo();var t=this.frameToChar(),e=this.options.charPPI;this.drawChars(t,10/e)}}]),t}(),b=function(){function t(e,n,o){Object(l["a"])(this,t),this.handlerCatch=e.addEventListener(n,o,!1)}return Object(p["a"])(t,[{key:"destroy",value:function(){removeEventListener(this.handlerCatch)}}]),t}(),O={name:"Video2ASCIIArt",props:{charPpi:{type:[Number,String],default:1},color:{type:String,default:"#000000"}},data:function(){return{canvasW:0,canvasH:0,canvas:null,video:null,animationHook:null,processor:null,handlers:[]}},mounted:function(){var t=this;this.canvas=this.$refs.canvasDOMRef,this.video=this.$slots.default[0].elm,this.setCanvasRect(),this.handlers.push(new b(this.video,"canplay",(function(){t.processor=t.processor||new y(t.video,t.canvas,{charPpi:+t.charPpi,color:t.color})}))),this.handlers.push(new b(this.video,"play",(function(){t.play()}))),this.handlers.push(new b(this.video,"pause",(function(){t.pause()}))),this.handlers.push(new b(this.video,"ended",(function(){t.end()})))},destroyed:function(){this.handlers.forEach((function(t){t.destroy()}))},watch:{charPpi:function(t){this.updatecharPpi(t)},color:function(t){this.updateColor(t)}},methods:{setCanvasRect:function(){var t=this;this.video.addEventListener("canplay",(function(){var e=t.video.getBoundingClientRect(),n=e.width,o=e.height;t.canvasW=n,t.canvasH=o}))},updatecharPpi:function(t){this.processor.changecharPpi(t)},updateColor:function(t){this.processor.changeColor(t)},loop:function(){this.processor.update(),this.animationHook=requestAnimationFrame(this.loop)},play:function(){this.loop()},pause:function(){this.end()},end:function(){this.animationHook&&cancelAnimationFrame(this.animationHook)}}},w=O,P=n("2877"),C=Object(P["a"])(w,h,u,!1,null,"ac04ccae",null),x=C.exports;x.install=function(t){t.component(x.name,x)};var j=x,k=[j],_=function(t){k.forEach((function(e){t.component(e.name,e)}))};"undefined"!==typeof window&&window.Vue&&_(window.Vue);var D={components:{Video2ASCIIArt:j},name:"app",data:function(){return{videoURL:c.a,charPpi:1,color:"rgb(120,120,120)",isDarkMode:!0}},mounted:function(){this.initDatGui(),this.$refs.videoDOM.cloneNode(!0)},methods:{initDatGui:function(){var t=new i["a"],e=this.$data;t.add(e,"isDarkMode"),t.add(e,"charPpi",{"@x0.5":.25,"@x1":.5,"@x2":1,"@x4":2}),t.addColor(e,"color")}}},L=D,S=(n("5c0b"),Object(P["a"])(L,r,a,!1,null,null,null)),M=S.exports;o["a"].config.productionTip=!1,new o["a"]({render:function(t){return t(M)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var o=n("e332"),r=n.n(o);r.a},"6a93":function(t,e,n){t.exports=n.p+"src/assets/KBHD.mov"},cf05:function(t,e,n){t.exports=n.p+"img/logo.4bcba01c.png"},e332:function(t,e,n){}});
//# sourceMappingURL=app.fd414222.js.map