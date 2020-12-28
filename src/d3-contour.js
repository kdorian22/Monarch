// https://d3js.org/d3-contour/ v1.3.2 Copyright 2018 Mike Bostock
!function(t,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports,require("d3-array")):"function"==typeof define&&define.amd?define(["exports","d3-array"],r):r(t.d3=t.d3||{},t.d3)}(this,function(t,r){"use strict";var n=Array.prototype.slice;function e(t,r){return t-r}function i(t){return function(){return t}}function a(t,r){for(var n,e=-1,i=r.length;++e<i;)if(n=o(t,r[e]))return n;return 0}function o(t,r){for(var n=r[0],e=r[1],i=-1,a=0,o=t.length,f=o-1;a<o;f=a++){var u=t[a],c=u[0],d=u[1],l=t[f],s=l[0],g=l[1];if(h(u,l,r))return 0;d>e!=g>e&&n<(s-c)*(e-d)/(g-d)+c&&(i=-i)}return i}function h(t,r,n){var e,i,a,o;return function(t,r,n){return(r[0]-t[0])*(n[1]-t[1])==(n[0]-t[0])*(r[1]-t[1])}(t,r,n)&&(i=t[e=+(t[0]===r[0])],a=n[e],o=r[e],i<=a&&a<=o||o<=a&&a<=i)}function f(){}var u=[[],[[[1,1.5],[.5,1]]],[[[1.5,1],[1,1.5]]],[[[1.5,1],[.5,1]]],[[[1,.5],[1.5,1]]],[[[1,1.5],[.5,1]],[[1,.5],[1.5,1]]],[[[1,.5],[1,1.5]]],[[[1,.5],[.5,1]]],[[[.5,1],[1,.5]]],[[[1,1.5],[1,.5]]],[[[.5,1],[1,.5]],[[1.5,1],[1,1.5]]],[[[1.5,1],[1,.5]]],[[[.5,1],[1.5,1]]],[[[1,1.5],[1.5,1]]],[[[.5,1],[1,1.5]]],[]];function c(){var t=1,o=1,h=r.thresholdSturges,c=g;function d(t){var n=h(t);if(Array.isArray(n))n=n.slice().sort(e);else{var i=r.extent(t),a=i[0],o=i[1];n=r.tickStep(a,o,n),n=r.range(Math.floor(a/n)*n,Math.floor(o/n)*n,n)}return n.map(function(r){return l(t,r)})}function l(r,n){var e=[],i=[];return function(r,n,e){var i,a,h,f,c,d,l=new Array,g=new Array;i=a=-1,f=r[0]>=n,u[f<<1].forEach(v);for(;++i<t-1;)h=f,f=r[i+1]>=n,u[h|f<<1].forEach(v);u[f<<0].forEach(v);for(;++a<o-1;){for(i=-1,f=r[a*t+t]>=n,c=r[a*t]>=n,u[f<<1|c<<2].forEach(v);++i<t-1;)h=f,f=r[a*t+t+i+1]>=n,d=c,c=r[a*t+i+1]>=n,u[h|f<<1|c<<2|d<<3].forEach(v);u[f|c<<3].forEach(v)}i=-1,c=r[a*t]>=n,u[c<<2].forEach(v);for(;++i<t-1;)d=c,c=r[a*t+i+1]>=n,u[c<<2|d<<3].forEach(v);function v(t){var r,n,o=[t[0][0]+i,t[0][1]+a],h=[t[1][0]+i,t[1][1]+a],f=s(o),u=s(h);(r=g[f])?(n=l[u])?(delete g[r.end],delete l[n.start],r===n?(r.ring.push(h),e(r.ring)):l[r.start]=g[n.end]={start:r.start,end:n.end,ring:r.ring.concat(n.ring)}):(delete g[r.end],r.ring.push(h),g[r.end=u]=r):(r=l[u])?(n=g[f])?(delete l[r.start],delete g[n.end],r===n?(r.ring.push(h),e(r.ring)):l[n.start]=g[r.end]={start:n.start,end:r.end,ring:n.ring.concat(r.ring)}):(delete l[r.start],r.ring.unshift(o),l[r.start=f]=r):l[f]=g[u]={start:f,end:u,ring:[o,h]}}u[c<<3].forEach(v)}(r,n,function(t){c(t,r,n),function(t){for(var r=0,n=t.length,e=t[n-1][1]*t[0][0]-t[n-1][0]*t[0][1];++r<n;)e+=t[r-1][1]*t[r][0]-t[r-1][0]*t[r][1];return e}(t)>0?e.push([t]):i.push(t)}),i.forEach(function(t){for(var r,n=0,i=e.length;n<i;++n)if(-1!==a((r=e[n])[0],t))return void r.push(t)}),{type:"MultiPolygon",value:n,coordinates:e}}function s(r){return 2*r[0]+r[1]*(t+1)*4}function g(r,n,e){r.forEach(function(r){var i,a=r[0],h=r[1],f=0|a,u=0|h,c=n[u*t+f];a>0&&a<t&&f===a&&(i=n[u*t+f-1],r[0]=a+(e-i)/(c-i)-.5),h>0&&h<o&&u===h&&(i=n[(u-1)*t+f],r[1]=h+(e-i)/(c-i)-.5)})}return d.contour=l,d.size=function(r){if(!arguments.length)return[t,o];var n=Math.ceil(r[0]),e=Math.ceil(r[1]);if(!(n>0&&e>0))throw new Error("invalid size");return t=n,o=e,d},d.thresholds=function(t){return arguments.length?(h="function"==typeof t?t:Array.isArray(t)?i(n.call(t)):i(t),d):h},d.smooth=function(t){return arguments.length?(c=t?g:f,d):c===g},d}function d(t,r,n){for(var e=t.width,i=t.height,a=1+(n<<1),o=0;o<i;++o)for(var h=0,f=0;h<e+n;++h)h<e&&(f+=t.data[h+o*e]),h>=n&&(h>=a&&(f-=t.data[h-a+o*e]),r.data[h-n+o*e]=f/Math.min(h+1,e-1+a-h,a))}function l(t,r,n){for(var e=t.width,i=t.height,a=1+(n<<1),o=0;o<e;++o)for(var h=0,f=0;h<i+n;++h)h<i&&(f+=t.data[o+h*e]),h>=n&&(h>=a&&(f-=t.data[o+(h-a)*e]),r.data[o+(h-n)*e]=f/Math.min(h+1,i-1+a-h,a))}function s(t){return t[0]}function g(t){return t[1]}function v(){return 1}t.contours=c,t.contourDensity=function(){var t=s,e=g,a=v,o=960,h=500,f=20,u=2,w=3*f,y=o+2*w>>u,p=h+2*w>>u,M=i(20);function E(n){var i=new Float32Array(y*p),o=new Float32Array(y*p);n.forEach(function(r,n,o){var h=+t(r,n,o)+w>>u,f=+e(r,n,o)+w>>u,c=+a(r,n,o);h>=0&&h<y&&f>=0&&f<p&&(i[h+f*y]+=c)}),d({width:y,height:p,data:i},{width:y,height:p,data:o},f>>u),l({width:y,height:p,data:o},{width:y,height:p,data:i},f>>u),d({width:y,height:p,data:i},{width:y,height:p,data:o},f>>u),l({width:y,height:p,data:o},{width:y,height:p,data:i},f>>u),d({width:y,height:p,data:i},{width:y,height:p,data:o},f>>u),l({width:y,height:p,data:o},{width:y,height:p,data:i},f>>u);var h=M(i);if(!Array.isArray(h)){var s=r.max(i);h=r.tickStep(0,s,h),(h=r.range(0,Math.floor(s/h)*h,h)).shift()}return c().thresholds(h).size([y,p])(i).map(A)}function A(t){return t.value*=Math.pow(2,-2*u),t.coordinates.forEach(m),t}function m(t){t.forEach(z)}function z(t){t.forEach(x)}function x(t){t[0]=t[0]*Math.pow(2,u)-w,t[1]=t[1]*Math.pow(2,u)-w}function b(){return y=o+2*(w=3*f)>>u,p=h+2*w>>u,E}return E.x=function(r){return arguments.length?(t="function"==typeof r?r:i(+r),E):t},E.y=function(t){return arguments.length?(e="function"==typeof t?t:i(+t),E):e},E.weight=function(t){return arguments.length?(a="function"==typeof t?t:i(+t),E):a},E.size=function(t){if(!arguments.length)return[o,h];var r=Math.ceil(t[0]),n=Math.ceil(t[1]);if(!(r>=0||r>=0))throw new Error("invalid size");return o=r,h=n,b()},E.cellSize=function(t){if(!arguments.length)return 1<<u;if(!((t=+t)>=1))throw new Error("invalid cell size");return u=Math.floor(Math.log(t)/Math.LN2),b()},E.thresholds=function(t){return arguments.length?(M="function"==typeof t?t:Array.isArray(t)?i(n.call(t)):i(t),E):M},E.bandwidth=function(t){if(!arguments.length)return Math.sqrt(f*(f+1));if(!((t=+t)>=0))throw new Error("invalid bandwidth");return f=Math.round((Math.sqrt(4*t*t+1)-1)/2),b()},E},Object.defineProperty(t,"__esModule",{value:!0})});
