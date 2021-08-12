(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{1173:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),s=a(156),o=a(203),l=a(204),c=a(172),i=a(62),u=a(275),d=a(276),m=a(212),f=a(175),p=a(178),g=a(12),b={getStudentById:p.f},v=Object(c.j)(Object(i.b)(function(e){var t=e.Students;return{studentProfile:t.studentProfile,studentTestsLoading:t.studentTestsLoading,studentTestsError:t.studentTestsError}},b)(function(e){var t=e.studentId,a=e.studentProfile;return Object(r.useEffect)(function(){e.getStudentById(t)},[]),n.a.createElement(n.a.Fragment,null,Object.keys(a).length>0&&n.a.createElement(u.a,null,n.a.createElement(d.a,null,n.a.createElement(o.a,null,n.a.createElement(l.a,null,n.a.createElement("div",{className:"user-avatar-section"},n.a.createElement("div",{className:"d-flex justify-content-start"},n.a.createElement(f.a,{imgHeight:"70",imgWidth:"70",img:Object(g.M)(a.user.profilePicture)}),n.a.createElement("div",{className:"d-flex flex-column ml-2 mt-1"},n.a.createElement("div",{className:"user-info mb-1"},n.a.createElement("h4",{className:"mb-0"},a.user.name),n.a.createElement(m.a,{tag:"span"},a.user.email))))))))))})),y=a(39),h=a(393);function E(e,t){var a="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!a){if(Array.isArray(e)||(a=function(e,t){if(!e)return;if("string"===typeof e)return O(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return O(e,t)}(e))||t&&e&&"number"===typeof e.length){a&&(e=a);var r=0,n=function(){};return{s:n,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,o=!0,l=!1;return{s:function(){a=a.call(e)},n:function(){var e=a.next();return o=e.done,e},e:function(e){l=!0,s=e},f:function(){try{o||null==a.return||a.return()}finally{if(l)throw s}}}}function O(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var j={getStudentTests:p.g},T=Object(c.j)(Object(i.b)(function(e){var t=e.Tests;return{tests:t.tests,studentTestsLoading:t.studentTestsLoading,studentTestsError:t.studentTestsError}},j)(function(e){var t=Object(r.useState)(),a=Object(y.a)(t,2),s=a[0],o=a[1],l=e.studentId,c=e.tests,i=e.studentTestsLoading,u=function(){e.getStudentTests(l)};Object(r.useEffect)(u,[]);return Object(r.useEffect)(function(){var e,t=new Map,a=E(c);try{for(a.s();!(e=a.n()).done;){var r=e.value;r.test&&!t.has(r.test.testId)&&t.set(r.test.testId,r.test)}}catch(n){a.e(n)}finally{a.f()}o(Array.from(t.values()))},[c]),n.a.createElement(n.a.Fragment,null,Object.keys(c).length>0&&n.a.createElement(h.a,{tests:s,fetchTests:u,isTeacher:!1,onSelect:function(t){e.onSelect&&e.onSelect(t)},isReloading:i,onBack:e.onBack}))})),w=a(261);t.default=Object(c.j)(Object(i.b)(function(e){var t=e.Students;return{students:t.students,studentsError:t.studentsError,studentsLoading:t.studentsLoading}},{})(function(e){var t=e.match.params.studentId;return n.a.createElement(r.Fragment,null,n.a.createElement("div",{className:"mb-2"},n.a.createElement(s.a.Ripple,{className:"btn-icon mr-2",size:"sm",onClick:function(){return e.history.goBack()}},n.a.createElement(w.a,{size:16})),n.a.createElement("h4",{className:"d-inline m-0"},"Student Profile")),n.a.createElement(o.a,null,n.a.createElement(l.a,{lg:12},n.a.createElement(v,{studentId:t})),n.a.createElement(l.a,{lg:12},n.a.createElement(T,{studentId:t,onSelect:function(a){e.history.push({pathname:"/attempts/".concat(a.testId),state:{studentId:t}})}}))))}))},165:function(e,t,a){"use strict";var r=a(46),n=a(0),s=a.n(n),o=a(60),l=a.n(o),c=a(201),i=(a(169),function(e){var t,a=e.children,o=e.blocking,c=e.loader,i=e.className,u=e.tag,d=e.overlayColor,m=u;return s.a.createElement(m,{className:l()("ui-loader",(t={},Object(r.a)(t,i,i),Object(r.a)(t,"show",o),t))},a,o?s.a.createElement(n.Fragment,null,s.a.createElement("div",Object.assign({className:"overlay"},o&&d?{style:{backgroundColor:d}}:{})),s.a.createElement("div",{className:"loader"},c)):null)});t.a=i,i.defaultProps={tag:"div",blocking:!1,loader:s.a.createElement(c.a,{color:"primary"})}},169:function(e,t,a){},170:function(e,t,a){"use strict";a.d(t,"a",function(){return i});var r=a(0),n=a.n(r),s=a(173),o=a.n(s),l=a(64),c=a.n(l),i=function(e){var t="DD/MM/yyyy hh:mmA";return e.type&&("date"===e.type&&(t="DD/MM/yyyy"),"time"===e.type&&(t="hh:mmA")),n.a.createElement(n.a.Fragment,null,e.dateTime?o.a.utc(e.dateTime).local().format(e.format||t):e.invalidValueText)};i.propTypes={dateTime:c.a.string,invalidValueText:c.a.string}},190:function(e,t,a){"use strict";var r=a(0),n=a.n(r),s=(a(60),a(165)),o=a(277),l=a(275),c=a(198),i=a(199);t.a=function(e){var t=e.title,a=e.isReloading,u=e.onReload,d=e.children;console.log(e);var m=a?s.a:r.Fragment;return n.a.createElement(m,e.isReloading?{blocking:a}:{},n.a.createElement(l.a,{className:e.className},n.a.createElement(c.a,null,n.a.createElement(i.a,{tag:"h4"},t),u&&n.a.createElement("div",{className:"action-icons"},n.a.createElement(o.a,{className:"cursor-pointer",size:15,onClick:function(){return u()}}))),d))}},191:function(e,t,a){},198:function(e,t,a){"use strict";var r=a(21),n=a(28),s=a(0),o=a.n(s),l=a(14),c=a.n(l),i=a(58),u=a.n(i),d=a(51),m={tag:d.tagPropType,className:c.a.string,cssModule:c.a.object},f=function(e){var t=e.className,a=e.cssModule,s=e.tag,l=Object(n.a)(e,["className","cssModule","tag"]),c=Object(d.mapToCssModules)(u()(t,"card-header"),a);return o.a.createElement(s,Object(r.a)({},l,{className:c}))};f.propTypes=m,f.defaultProps={tag:"div"},t.a=f},199:function(e,t,a){"use strict";var r=a(21),n=a(28),s=a(0),o=a.n(s),l=a(14),c=a.n(l),i=a(58),u=a.n(i),d=a(51),m={tag:d.tagPropType,className:c.a.string,cssModule:c.a.object},f=function(e){var t=e.className,a=e.cssModule,s=e.tag,l=Object(n.a)(e,["className","cssModule","tag"]),c=Object(d.mapToCssModules)(u()(t,"card-title"),a);return o.a.createElement(s,Object(r.a)({},l,{className:c}))};f.propTypes=m,f.defaultProps={tag:"div"},t.a=f},201:function(e,t,a){"use strict";var r=a(21),n=a(28),s=a(0),o=a.n(s),l=a(14),c=a.n(l),i=a(58),u=a.n(i),d=a(51),m={tag:d.tagPropType,type:c.a.string,size:c.a.string,color:c.a.string,className:c.a.string,cssModule:c.a.object,children:c.a.string},f=function(e){var t=e.className,a=e.cssModule,s=e.type,l=e.size,c=e.color,i=e.children,m=e.tag,f=Object(n.a)(e,["className","cssModule","type","size","color","children","tag"]),p=Object(d.mapToCssModules)(u()(t,!!l&&"spinner-"+s+"-"+l,"spinner-"+s,!!c&&"text-"+c),a);return o.a.createElement(m,Object(r.a)({role:"status"},f,{className:p}),i&&o.a.createElement("span",{className:Object(d.mapToCssModules)("sr-only",a)},i))};f.propTypes=m,f.defaultProps={tag:"div",type:"border",children:"Loading..."},t.a=f},203:function(e,t,a){"use strict";var r=a(21),n=a(28),s=a(0),o=a.n(s),l=a(14),c=a.n(l),i=a(58),u=a.n(i),d=a(51),m=c.a.oneOfType([c.a.number,c.a.string]),f={tag:d.tagPropType,noGutters:c.a.bool,className:c.a.string,cssModule:c.a.object,form:c.a.bool,xs:m,sm:m,md:m,lg:m,xl:m},p={tag:"div",widths:["xs","sm","md","lg","xl"]},g=function(e){var t=e.className,a=e.cssModule,s=e.noGutters,l=e.tag,c=e.form,i=e.widths,m=Object(n.a)(e,["className","cssModule","noGutters","tag","form","widths"]),f=[];i.forEach(function(t,a){var r=e[t];if(delete m[t],r){var n=!a;f.push(n?"row-cols-"+r:"row-cols-"+t+"-"+r)}});var p=Object(d.mapToCssModules)(u()(t,s?"no-gutters":null,c?"form-row":"row",f),a);return o.a.createElement(l,Object(r.a)({},m,{className:p}))};g.propTypes=f,g.defaultProps=p,t.a=g},204:function(e,t,a){"use strict";var r=a(21),n=a(28),s=a(0),o=a.n(s),l=a(14),c=a.n(l),i=a(58),u=a.n(i),d=a(51),m=c.a.oneOfType([c.a.number,c.a.string]),f=c.a.oneOfType([c.a.bool,c.a.number,c.a.string,c.a.shape({size:c.a.oneOfType([c.a.bool,c.a.number,c.a.string]),order:m,offset:m})]),p={tag:d.tagPropType,xs:f,sm:f,md:f,lg:f,xl:f,className:c.a.string,cssModule:c.a.object,widths:c.a.array},g={tag:"div",widths:["xs","sm","md","lg","xl"]},b=function(e,t,a){return!0===a||""===a?e?"col":"col-"+t:"auto"===a?e?"col-auto":"col-"+t+"-auto":e?"col-"+a:"col-"+t+"-"+a},v=function(e){var t=e.className,a=e.cssModule,s=e.widths,l=e.tag,c=Object(n.a)(e,["className","cssModule","widths","tag"]),i=[];s.forEach(function(t,r){var n=e[t];if(delete c[t],n||""===n){var s=!r;if(Object(d.isObject)(n)){var o,l=s?"-":"-"+t+"-",m=b(s,t,n.size);i.push(Object(d.mapToCssModules)(u()(((o={})[m]=n.size||""===n.size,o["order"+l+n.order]=n.order||0===n.order,o["offset"+l+n.offset]=n.offset||0===n.offset,o)),a))}else{var f=b(s,t,n);i.push(f)}}}),i.length||i.push("col");var m=Object(d.mapToCssModules)(u()(t,i),a);return o.a.createElement(l,Object(r.a)({},c,{className:m}))};v.propTypes=p,v.defaultProps=g,t.a=v},212:function(e,t,a){"use strict";var r=a(21),n=a(28),s=a(0),o=a.n(s),l=a(14),c=a.n(l),i=a(58),u=a.n(i),d=a(51),m={tag:d.tagPropType,className:c.a.string,cssModule:c.a.object},f=function(e){var t=e.className,a=e.cssModule,s=e.tag,l=Object(n.a)(e,["className","cssModule","tag"]),c=Object(d.mapToCssModules)(u()(t,"card-text"),a);return o.a.createElement(s,Object(r.a)({},l,{className:c}))};f.propTypes=m,f.defaultProps={tag:"p"},t.a=f},229:function(e,t,a){"use strict";var r=a(21),n=a(28),s=a(0),o=a.n(s),l=a(14),c=a.n(l),i=a(58),u=a.n(i),d=a(51),m={className:c.a.string,cssModule:c.a.object,size:c.a.string,bordered:c.a.bool,borderless:c.a.bool,striped:c.a.bool,dark:c.a.bool,hover:c.a.bool,responsive:c.a.oneOfType([c.a.bool,c.a.string]),tag:d.tagPropType,responsiveTag:d.tagPropType,innerRef:c.a.oneOfType([c.a.func,c.a.string,c.a.object])},f=function(e){var t=e.className,a=e.cssModule,s=e.size,l=e.bordered,c=e.borderless,i=e.striped,m=e.dark,f=e.hover,p=e.responsive,g=e.tag,b=e.responsiveTag,v=e.innerRef,y=Object(n.a)(e,["className","cssModule","size","bordered","borderless","striped","dark","hover","responsive","tag","responsiveTag","innerRef"]),h=Object(d.mapToCssModules)(u()(t,"table",!!s&&"table-"+s,!!l&&"table-bordered",!!c&&"table-borderless",!!i&&"table-striped",!!m&&"table-dark",!!f&&"table-hover"),a),E=o.a.createElement(g,Object(r.a)({},y,{ref:v,className:h}));if(p){var O=Object(d.mapToCssModules)(!0===p?"table-responsive":"table-responsive-"+p,a);return o.a.createElement(b,{className:O},E)}return E};f.propTypes=m,f.defaultProps={tag:"table",responsiveTag:"div"},t.a=f},245:function(e,t,a){"use strict";var r=a(0),n=a.n(r),s=a(16),o=a.n(s);function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function c(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},s=Object.keys(e);for(r=0;r<s.length;r++)a=s[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)a=s[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var i=Object(r.forwardRef)(function(e,t){var a=e.color,r=void 0===a?"currentColor":a,s=e.size,o=void 0===s?24:s,i=c(e,["color","size"]);return n.a.createElement("svg",l({ref:t,xmlns:"http://www.w3.org/2000/svg",width:o,height:o,viewBox:"0 0 24 24",fill:"none",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},i),n.a.createElement("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),n.a.createElement("line",{x1:"5",y1:"12",x2:"19",y2:"12"}))});i.propTypes={color:o.a.string,size:o.a.oneOfType([o.a.string,o.a.number])},i.displayName="Plus",t.a=i},261:function(e,t,a){"use strict";var r=a(0),n=a.n(r),s=a(16),o=a.n(s);function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function c(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},s=Object.keys(e);for(r=0;r<s.length;r++)a=s[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)a=s[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var i=Object(r.forwardRef)(function(e,t){var a=e.color,r=void 0===a?"currentColor":a,s=e.size,o=void 0===s?24:s,i=c(e,["color","size"]);return n.a.createElement("svg",l({ref:t,xmlns:"http://www.w3.org/2000/svg",width:o,height:o,viewBox:"0 0 24 24",fill:"none",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},i),n.a.createElement("line",{x1:"19",y1:"12",x2:"5",y2:"12"}),n.a.createElement("polyline",{points:"12 19 5 12 12 5"}))});i.propTypes={color:o.a.string,size:o.a.oneOfType([o.a.string,o.a.number])},i.displayName="ArrowLeft",t.a=i},277:function(e,t,a){"use strict";var r=a(0),n=a.n(r),s=a(16),o=a.n(s);function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function c(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},s=Object.keys(e);for(r=0;r<s.length;r++)a=s[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)a=s[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var i=Object(r.forwardRef)(function(e,t){var a=e.color,r=void 0===a?"currentColor":a,s=e.size,o=void 0===s?24:s,i=c(e,["color","size"]);return n.a.createElement("svg",l({ref:t,xmlns:"http://www.w3.org/2000/svg",width:o,height:o,viewBox:"0 0 24 24",fill:"none",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},i),n.a.createElement("polyline",{points:"23 4 23 10 17 10"}),n.a.createElement("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"}))});i.propTypes={color:o.a.string,size:o.a.oneOfType([o.a.string,o.a.number])},i.displayName="RotateCw",t.a=i},393:function(e,t,a){"use strict";var r=a(0),n=a.n(r),s=a(276),o=a(229),l=a(170),c=a(190),i=a(156),u=a(245);a(191);t.a=function(e){var t=e.tests,a=e.isTeacher,r=e.fetchTests,d=e.isReloading;return n.a.createElement(c.a,{className:"p-0 test-list",title:"Tests",onReload:r,isReloading:d},a&&n.a.createElement("div",{className:"text-right"},n.a.createElement(i.a.Ripple,{className:"btn-header",outline:!0,color:"primary",onClick:function(){e.onNewTest&&e.onNewTest()}},n.a.createElement(u.a,{size:14}),n.a.createElement("span",{className:"align-middle ml-25"},"Add New Test"))),n.a.createElement(s.a,null,n.a.createElement(o.a,{responsive:!0,hover:!0},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"#"),n.a.createElement("th",null,"Title"),n.a.createElement("th",null,"Created At"),n.a.createElement("th",null,"Time Limit"),n.a.createElement("th",null,"Total Marks"))),n.a.createElement("tbody",null,t&&t.map(function(t,a){return n.a.createElement("tr",{key:t.testId,onClick:function(){return a=t,void(e.onSelect&&e.onSelect(a));var a}},n.a.createElement("td",null,a+1),n.a.createElement("td",null,n.a.createElement("span",{className:"align-middle font-weight-bold"},t.title)),n.a.createElement("td",null,n.a.createElement(l.a,{dateTime:t.createdAt,type:"dateTime"})),n.a.createElement("td",null,t.timeLimit/60," mins"),n.a.createElement("td",null,t.totalMarks))})))))}}}]);
//# sourceMappingURL=20.771a44fe.chunk.js.map