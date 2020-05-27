(function(t){function e(e){for(var a,o,i=e[0],l=e[1],u=e[2],c=0,d=[];c<i.length;c++)o=i[c],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&d.push(n[o][0]),n[o]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);m&&m(e);while(d.length)d.shift()();return r.push.apply(r,u||[]),s()}function s(){for(var t,e=0;e<r.length;e++){for(var s=r[e],a=!0,o=1;o<s.length;o++){var l=s[o];0!==n[l]&&(a=!1)}a&&(r.splice(e--,1),t=i(i.s=s[0]))}return t}var a={},n={app:0},r=[];function o(t){return i.p+"js/"+({}[t]||t)+"."+{"chunk-2d2302b5":"2caf63e2","chunk-92d273b0":"9b83fefe","chunk-f9829394":"03e9fad4"}[t]+".js"}function i(e){if(a[e])return a[e].exports;var s=a[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.e=function(t){var e=[],s=n[t];if(0!==s)if(s)e.push(s[2]);else{var a=new Promise((function(e,a){s=n[t]=[e,a]}));e.push(s[2]=a);var r,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=o(t);var u=new Error;r=function(e){l.onerror=l.onload=null,clearTimeout(c);var s=n[t];if(0!==s){if(s){var a=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src;u.message="Loading chunk "+t+" failed.\n("+a+": "+r+")",u.name="ChunkLoadError",u.type=a,u.request=r,s[1](u)}n[t]=void 0}};var c=setTimeout((function(){r({type:"timeout",target:l})}),12e4);l.onerror=l.onload=r,document.head.appendChild(l)}return Promise.all(e)},i.m=t,i.c=a,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(s,a,function(e){return t[e]}.bind(null,a));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/",i.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=e,l=l.slice();for(var c=0;c<l.length;c++)e(l[c]);var m=u;r.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},3891:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"uk-card uk-card-default"},[s("form",{staticClass:"uk-form uk-padding-small",on:{submit:function(e){return e.preventDefault(),t.createPost(e)}}},[s("div",{staticClass:"uk-width-expand uk-flex"},[s("span",{staticClass:"uk-margin-small-right",attrs:{"uk-icon":"user",width:"40"}}),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.postText,expression:"postText"}],staticClass:"uk-textarea",staticStyle:{resize:"none",overflow:"hidden"},attrs:{type:"text",placeholder:"What's up?"},domProps:{value:t.postText},on:{input:[function(e){e.target.composing||(t.postText=e.target.value)},t.mixin_autoResize_resize]}})]),s("div",{staticClass:"uk-flex uk-flex-right uk-margin-small-top"},[s("button",{staticClass:"uk-button uk-button-primary",attrs:{type:"submit",disabled:!t.postText.length}},[t._v("Post")])])])])},n=[],r=s("46fe"),o=s("ee90"),i={name:"createPost",mixins:[o["a"]],data:()=>({postText:""}),methods:{async createPost(){await r["a"].createPost({text:this.postText}),this.postText=""}},sockets:{newPost:function(t){this.$emit("newPost",t)}}},l=i,u=s("2877"),c=Object(u["a"])(l,a,n,!1,null,null,null);e["a"]=c.exports},"46fe":function(t,e,s){"use strict";var a=s("7424");e["a"]={async fetchPosts(){let t;try{t=await Object(a["a"])({url:"/posts",method:"GET",crossdomain:!0})}catch(e){console.log(e)}return t.data},async fetchPostsByUser(t){let e;try{e=await Object(a["a"])({url:`/posts/user/${t}`,method:"GET",crossdomain:!0})}catch(s){console.log(s)}return e.data},async fetchLikedPosts(t){let e;try{e=await Object(a["a"])({url:`/posts/user/${t}/liked`,method:"GET",crossdomain:!0})}catch(s){console.log(s)}return e.data},async createPost(t){let e;try{e=await Object(a["a"])({url:"/posts/create",method:"POST",data:t,crossdomain:!0})}catch(s){console.log(s)}return e.data},async deletePost(t){try{await Object(a["a"])({url:`/posts/${t}/delete`,method:"DELETE",crossdomain:!0})}catch(e){console.log(e)}},async likePost(t){try{await Object(a["a"])({url:`/posts/${t}/like`,method:"GET",crossdomain:!0})}catch(e){console.log(e)}}}},"56d7":function(t,e,s){"use strict";s.r(e);var a=s("2b0e"),n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[t.isMobile?t._e():s("div",{staticClass:"uk-container uk-flex uk-flex-center"},[s("div",{staticClass:"uk-margin-remove",staticStyle:{width:"60vw"},attrs:{"uk-grid":""}},[t.isLoggedIn?s("div",{staticClass:"uk-flex uk-flex-middle",staticStyle:{height:"100vh",width:"200px"}},[s("Navbar",{staticClass:"uk-position-fixed"})],1):t._e(),s("router-view",{staticClass:"uk-width-expand uk-animation-fade"})],1)]),t.isMobile?s("div",[s("router-view",{staticClass:"uk-animation-fade uk-padding-large",staticStyle:{"margin-bottom":"3rem"}}),s("MobileNavbar",{staticClass:"uk-position-bottom"})],1):t._e()])},r=[],o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("ul",{staticClass:"uk-nav uk-nav-default uk-text-large uk-text-primary",attrs:{id:"xuy"}},[s("router-link",{attrs:{to:{name:"profile",params:{userId:t.currentUser._id}},tag:"li"}},[s("a",[t._v("Profile")])]),s("router-link",{attrs:{to:{name:"news"},exact:"",tag:"li"}},[s("a",[t._v("News")])]),s("router-link",{attrs:{to:{name:"messages"},tag:"li"}},[s("a",[t._v("Messages")])]),s("router-link",{attrs:{to:{name:"settings"},tag:"li"}},[s("a",[t._v("Settings")])])],1)])},i=[],l=s("2f62"),u={name:"Navigation",data:function(){return{}},computed:{...Object(l["c"])(["currentUser"])}},c=u,m=s("2877"),d=Object(m["a"])(c,o,i,!1,null,"95366980",null),p=d.exports,f=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"uk-navbar-container uk-flex uk-flex-around"},[s("ul",{staticClass:"uk-navbar-nav"},[s("router-link",{attrs:{to:{name:"profile",params:{userId:t.currentUser._id}},tag:"li"}},[s("a",[t._v("Profile")])]),s("router-link",{attrs:{to:{name:"news"},exact:"",tag:"li"}},[s("a",[t._v("News")])]),s("router-link",{attrs:{to:{name:"messages"},tag:"li"}},[s("a",[t._v("Messages")])]),s("router-link",{attrs:{to:{name:"settings"},tag:"li"}},[s("a",[t._v("Settings")])])],1)])},k=[],h={name:"MobileNavbar",data:function(){return{}},computed:{...Object(l["c"])(["currentUser"])}},g=h,v=(s("fced"),Object(m["a"])(g,f,k,!1,null,"bcd42c90",null)),b=v.exports,C=s("8323"),_=s.n(C),x=s("263c"),w=s.n(x);_.a.use(w.a);var y={name:"app",components:{Navbar:p,MobileNavbar:b},computed:{...Object(l["c"])(["currentUser","authState"]),isLoggedIn(){return this.authState},isMobile(){return window.innerWidth<1080}}},P=y,O=(s("5c0b"),Object(m["a"])(P,n,r,!1,null,null,null)),S=O.exports,T=s("8c4f"),j=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"uk-container uk-flex uk-flex-middle uk-flex-column uk-flex-center",attrs:{id:"login"}},[s("form",{on:{submit:function(e){return e.preventDefault(),t.login(e)}}},[s("fieldset",{staticClass:"uk-fieldset"},[s("legend",{staticClass:"uk-legend"},[t._v("Login")]),s("div",{staticClass:"uk-margin"},[s("div",{staticClass:"uk-inline"},[s("span",{staticClass:"uk-form-icon",attrs:{"uk-icon":"icon: mail"}}),s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"uk-input",attrs:{type:"text",placeholder:"Email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})])]),s("div",{staticClass:"uk-margin"},[s("div",{staticClass:"uk-inline"},[s("span",{staticClass:"uk-form-icon",attrs:{"uk-icon":"icon: lock"}}),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"uk-input",attrs:{type:"text",placeholder:"Password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})])]),s("div",{staticClass:"uk-margin uk-flex uk-flex-between"},[s("button",{staticClass:"uk-button uk-button-primary",attrs:{type:"submit"}},[t._v("Login")]),s("router-link",{staticClass:"uk-button uk-button-secondary",attrs:{to:"/register",tag:"button"}},[t._v("Register")])],1)])]),t.errors.length?s("div",t._l(t.errors,(function(t){return s("Error",{key:t,attrs:{errorMessage:t}})})),1):t._e()])},E=[],$=s("7424");const A=t=>{t?$["a"].defaults.headers.common["Authorization"]=`Bearer ${t}`:delete $["a"].defaults.headers.common["Authorization"]};var U=A,N=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"uk-alert-danger",attrs:{id:"error","uk-alert":""}},[t._v(t._s(t.errorMessage))])},L=[],M={name:"error",props:["errorMessage"]},D=M,z=Object(m["a"])(D,N,L,!1,null,null,null),I=z.exports,B={name:"login",components:{Error:I},data:()=>({email:"22liamaev@gmail.com",password:"ArtemMega",errors:[]}),methods:{...Object(l["b"])(["saveUserData","toggleAuthState"]),login(){const t={email:this.email,password:this.password};Object($["a"])({url:"/auth/login",method:"POST",data:t,crossdomain:!0}).then(t=>{localStorage.setItem("token",t.data.user.token),this.$store.dispatch("toggleAuthState",!0),this.$store.dispatch("saveUserData",t.data.user),U(t.data.user.token),this.$router.push({name:"news"})}).catch(t=>{this.errors=t.response.data.error}),setTimeout(()=>{this.errors=[]},1500)}}},G=B,R=Object(m["a"])(G,j,E,!1,null,null,null),q=R.exports,H=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"uk-container uk-flex uk-flex-middle uk-flex-column uk-flex-center",attrs:{id:"register"}},[s("form",{staticClass:"uk-width-auto",on:{submit:function(e){return e.preventDefault(),t.register(e)}}},[s("fieldset",{staticClass:"uk-fieldset"},[s("legend",{staticClass:"uk-legend"},[t._v("Register")]),s("div",{staticClass:"uk-margin"},[s("div",{staticClass:"uk-inline"},[s("span",{staticClass:"uk-form-icon",attrs:{"uk-icon":"icon: mail"}}),s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"uk-input",attrs:{type:"text",placeholder:"Email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})])]),s("div",{staticClass:"uk-margin"},[s("div",{staticClass:"uk-inline"},[s("span",{staticClass:"uk-form-icon",attrs:{"uk-icon":"icon: lock"}}),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"uk-input",attrs:{type:"text",placeholder:"Password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})])]),s("div",{staticClass:"uk-margin"},[s("div",{staticClass:"uk-inline"},[s("span",{staticClass:"uk-form-icon",attrs:{"uk-icon":"icon: lock"}}),s("input",{directives:[{name:"model",rawName:"v-model",value:t.confirmPassword,expression:"confirmPassword"}],staticClass:"uk-input",attrs:{type:"text",placeholder:"Confirm password"},domProps:{value:t.confirmPassword},on:{input:function(e){e.target.composing||(t.confirmPassword=e.target.value)}}})])]),s("div",{staticClass:"uk-margin"},[s("div",{staticClass:"uk-inline"},[s("span",{staticClass:"uk-form-icon",attrs:{"uk-icon":"icon: user"}}),s("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"uk-input",attrs:{type:"text",placeholder:"Name"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})])]),s("div",{staticClass:"uk-margin uk-flex uk-flex-between uk-width-auto"},[s("button",{staticClass:"uk-button uk-button-primary",attrs:{type:"submit"}},[t._v("Register")]),s("router-link",{staticClass:"uk-button uk-button-secondary",attrs:{to:"/login",tag:"button"}},[t._v("Login")])],1)])]),t.errors.length?s("div",{},t._l(t.errors,(function(t){return s("Error",{key:t,attrs:{errorMessage:t}})})),1):t._e()])},Y=[],F={name:"register",components:{Error:I},data:()=>({email:"",password:"",confirmPassword:"",name:"",errors:[]}),methods:{register(){let t={email:this.email,password:this.password,confirmPassword:this.confirmPassword,name:this.name};Object($["a"])({url:"/auth/register",method:"POST",data:t,crossdomain:!0}).then(t=>{localStorage.setItem("token",t.data.user.token),this.$store.dispatch("toggleAuthState",!0),this.$store.dispatch("saveUserData",t.data.user),U(t.data.user.token),this.$router.push({name:"News"})}).catch(t=>{this.errors=t.response.data.error}),setTimeout(()=>{this.errors=[]},1500)}}},W=F,J=Object(m["a"])(W,H,Y,!1,null,null,null),K=J.exports,Q=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"news"}},[s("h1",{staticClass:"uk-text-primary"},[t._v("News")]),s("CreatePost",{on:{newPost:t.fetchNewPost}}),t._l(t.posts,(function(t){return s("Post",{key:t._id,ref:t._id,refInFor:!0,staticClass:"uk-animation-fade",attrs:{post:t}})}))],2)},V=[],X=s("9c93"),Z=s("46fe"),tt=s("3891"),et={name:"news",components:{CreatePost:tt["a"],Post:X["a"]},data:function(){return{posts:[]}},methods:{async getPosts(){this.posts=await Z["a"].fetchPosts()},fetchNewPost(t){this.posts.unshift(t)}},created(){this.getPosts()},sockets:{deletePost:function(t){const e=this.posts.filter(e=>e._id===t),s=this.posts.indexOf(...e);this.posts.splice(s,1)},newComment:function(t){const e=t.post._id,s=this.$refs[e][0],a=s.post,n=s.comments;Object.assign(a,t.post),n.push(t.comment)},togglePostLike:function(t){const e=this.posts.filter(e=>e._id===t.targetPost),s=this.posts.indexOf(...e);this.posts[s].likes=t.likes},toggleCommentLike:function(t){const e=this.$refs[t.targetPost],s=e[0].comments.filter(e=>e._id===t.targetComment);s[0].likes=t.likes},deleteComment:function(t){const e=t.targetPost._id,s=this.$refs[e][0],a=s.post,n=s.comments,r=n.filter(e=>e._id===t),o=n.indexOf(...r);Object.assign(a,t.targetPost),n.splice(o,1)}}},st=et,at=(s("bec7"),Object(m["a"])(st,Q,V,!1,null,"51e675e3",null)),nt=at.exports,rt=s("c0d6");a["a"].use(T["a"]);const ot=new T["a"]({routes:[{path:"/login",name:"login",component:q,meta:{guest:!0}},{path:"/register",name:"register",component:K,meta:{guest:!0}},{path:"/",name:"news",component:nt,meta:{requiersAuth:!0}},{path:"/:userId",name:"profile",props:!0,component:function(){return s.e("chunk-92d273b0").then(s.bind(null,"c66d"))},meta:{requiersAuth:!0}},{path:"/messages",name:"messages",component:function(){return s.e("chunk-2d2302b5").then(s.bind(null,"eaad"))},meta:{requiersAuth:!0}},{path:"/settings",name:"settings",component:function(){return s.e("chunk-f9829394").then(s.bind(null,"26d3"))},meta:{requiersAuth:!0}}],linkActiveClass:"uk-active"});ot.beforeEach(async(t,e,s)=>{t.meta.requiersAuth?rt["a"].state.authState?s():(localStorage.clear(),s({name:"login"})):t.meta.guest&&rt["a"].state.authState?s({name:"news"}):s()});var it=ot,lt=s("5132"),ut=s.n(lt),ct=s("9483");Object(ct["a"])("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(t){console.error("Error during service worker registration:",t)}});var mt=s("5a0c"),dt=s.n(mt);a["a"].prototype.$parsedDate=function(t){return dt()(t).year<dt()().year?dt()(t).format("DD.MMM.YYYY"):dt()(t).format("DD MMM [at] HH:mm")},a["a"].use(new ut.a({connection:"http://localhost:4000",vuex:{store:rt["a"],actionPrefix:"SOCKET_",mutationPrefix:"SOCKET_"}})),a["a"].config.productionTip=!1,localStorage.token?U(localStorage.token):U(null),$["a"].interceptors.request.use((function(t){return t}),(function(t){return Promise.reject(t)})),new a["a"]({router:it,store:rt["a"],render:function(t){return t(S)}}).$mount("#app")},"5c0b":function(t,e,s){"use strict";var a=s("e332"),n=s.n(a);n.a},7424:function(t,e,s){"use strict";s.d(e,"a",(function(){return r}));var a=s("bc3a"),n=s.n(a);const r=n.a.create({baseURL:"http://localhost:4000/api",headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}})},"8ba8":function(t,e,s){},"9c93":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.post.user?s("div",{staticClass:"uk-card uk-card-default uk-margin"},[s("div",{staticClass:"uk-flex uk-padding-small uk-padding-remove-bottom"},[s("span",{attrs:{"uk-icon":"user",width:"50"}}),s("div",{staticClass:"uk-margin-small-left"},[s("router-link",{staticClass:"uk-margin-remove",staticStyle:{"font-size":"1.5rem"},attrs:{to:{name:"profile",params:{userId:t.post.user._id}}}},[t._v(t._s(t.post.user.name))]),s("p",{staticClass:"uk-margin-remove",staticStyle:{"font-size":"1.2rem"}},[t._v(t._s(this.$parsedDate(t.post.created)))])],1),t.isPostByCurrentUser?s("div",{staticClass:"uk-margin-auto-left"},[s("button",{staticClass:"uk-icon-button",attrs:{"uk-icon":"more-vertical"}}),s("div",{staticClass:"uk-card uk-card-default uk-width-auto uk-border-rounded",attrs:{"uk-drop":"mode: click; pos: bottom-center; offset: 5"}},[s("div",{staticClass:"uk-flex uk-flex-column uk-padding-small uk-padding-remove-left uk-padding-remove-right"},[s("button",{staticClass:"uk-icon-button",attrs:{"uk-icon":"trash",title:"delete"},on:{click:t.deletePost}})])])]):t._e()]),s("div",{staticClass:"uk-card-body uk-padding-small"},[s("p",{staticClass:"uk-text-large uk-text-lead",staticStyle:{"font-size":"1.4rem"}},[t._v(t._s(t.post.text))])]),s("hr",{staticClass:"uk-margin-remove"}),s("div",{staticClass:"uk-flex uk-flex-middle uk-margin-small-left",staticStyle:{padding:"10px 0"}},[s("Like",{attrs:{post:t.post}}),s("div",[s("button",{staticClass:"uk-margin-left uk-padding-remove uk-icon-button",attrs:{"uk-icon":"comment"},on:{"~click":function(e){return t.loadComments(e)},click:function(e){t.showComments=!t.showComments}}}),t.post.comments.length?s("span",{staticClass:"uk-padding-small-left"},[t._v(t._s(t.post.comments.length))]):t._e()])],1),t.showComments?s("div",[s("hr",{staticClass:"uk-margin-remove"}),s("div",{staticClass:"uk-padding-small uk-padding-remove-top"},[t._l(t.comments,(function(e,a){return s("Comment",{key:e._id,attrs:{comment:e,isLast:a===t.comments.length-1},on:{deleteComment:t.deleteComment}})})),s("form",{staticClass:"uk-form uk-flex uk-margin-top",on:{submit:function(e){return e.preventDefault(),t.addComment(e)}}},[s("span",{staticClass:"uk-margin-small-right",attrs:{"uk-icon":"user",width:"40"}}),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.commentText,expression:"commentText"}],staticClass:"uk-textarea",staticStyle:{resize:"none",overflow:"hidden"},attrs:{type:"text",placeholder:"What's up?"},domProps:{value:t.commentText},on:{input:[function(e){e.target.composing||(t.commentText=e.target.value)},t.mixin_autoResize_resize]}}),s("div",{staticClass:"uk-margin-small-top"},[s("button",{staticClass:"uk-button uk-button-small uk-button-primary uk-margin-small-left",attrs:{type:"submit",disabled:!t.commentText.length}},[t._v("comment")])])])],2)]):t._e()]):t._e()},n=[],r=s("2f62"),o=s("46fe"),i=s("7424"),l={async fetchComments(t){let e;try{e=await Object(i["a"])({url:`/posts/${t}/comments`,method:"GET",crossdomain:!0})}catch(s){console.log(s)}return e.data},async addComment(t,e){try{await Object(i["a"])({url:`/posts/${t}/comments/create`,method:"POST",data:e,crossdomain:!0})}catch(s){console.log(s)}},async deleteComment(t){try{await Object(i["a"])({url:`/comments/${t}/delete`,method:"DELETE",crossdomain:!0})}catch(e){console.log(e)}},async likeComment(t){try{await Object(i["a"])({url:`/comments/${t}/like`,method:"GET",crossdomain:!0})}catch(e){console.log(e)}}},u=function(){var t=this,e=t.$createElement,s=t._self._c||e;return this.parent?s("div",{attrs:{id:"like"}},[s("div",[s("button",{ref:"likeButton",staticClass:"uk-icon-button",attrs:{"uk-icon":"heart"},on:{click:t.toggleLike}}),t.parent.likes.length?s("span",{staticClass:"uk-padding-small-left"},[t._v(t._s(t.parent.likes.length))]):t._e()]),t.parent.likes.length?s("div",{staticClass:"uk-card uk-card-default uk-padding-small uk-width-small",attrs:{"uk-drop":"offset: 5; delay-show: 400; delay-hide: 200;"}},t._l(t.parent.likes,(function(e){return s("div",{key:e._id},[s("p",{staticClass:"uk-margin-small-bottom"},[t._v("Liked by:")]),s("router-link",{staticClass:"uk-icon-button",attrs:{"uk-icon":"user",to:{name:"profile",params:{userId:t.parent.user._id}},title:e.name}})],1)})),0):t._e()]):t._e()},c=[],m={name:"like",props:["post","comment"],data:function(){return{parent:this.post?this.post:this.comment}},computed:{...Object(r["c"])({currentUserId:t=>t.currentUser._id})},methods:{toggleLike:async function(){this.post?await o["a"].likePost(this.parent._id):this.comment&&await l.likeComment(this.parent._id),this.setButtonColor()},setButtonColor:function(){this.parent.likes.filter(t=>t.id===this.currentUserId).length?this.$refs.likeButton.style.color="red":this.$refs.likeButton.style.color="grey"}},mounted(){this.setButtonColor()}},d=m,p=s("2877"),f=Object(p["a"])(d,u,c,!1,null,null,null),k=f.exports,h=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"uk-card",staticStyle:{width:"100%"}},[s("div",{staticClass:"uk-width-expand"},[s("div",{staticClass:"uk-flex uk-padding-small uk-padding-remove-bottom",staticStyle:{"margin-bottom":"0.4em"}},[s("span",{attrs:{"uk-icon":"user",width:"40"}}),s("div",{staticClass:"uk-width-expand"},[s("div",{staticClass:"uk-margin-small-left"},[s("router-link",{staticClass:"uk-margin-remove",staticStyle:{"font-size":"1.3rem"},attrs:{to:{name:"profile",params:{userId:t.comment.user._id}}}},[t._v(t._s(t.comment.user.name))])],1),s("div",{staticClass:"uk-card-body uk-padding-remove uk-margin-small-left"},[s("p",{staticClass:"uk-text-lead",staticStyle:{"font-size":"1.2rem"}},[t._v(t._s(t.comment.text))])]),s("div",{staticClass:"uk-flex uk-flex-between uk-margin-small-left"},[s("span",{staticStyle:{"font-size":"1.1rem"}},[t._v(t._s(this.$parsedDate(t.comment.created)))])])]),s("div",{staticClass:"uk-flex uk-flex-column uk-flex-between"},[t.isCommentByCurrentUser?s("div",{},[s("button",{staticClass:"uk-icon-button",attrs:{"uk-icon":"more-vertical"}}),s("div",{staticClass:"uk-card uk-card-default uk-width-auto uk-border-rounded",attrs:{"uk-drop":"mode: click; pos: bottom-center; offset: 5"}},[s("div",{staticClass:"uk-flex uk-flex-column uk-padding-small uk-padding-remove-left uk-padding-remove-right"},[s("button",{staticClass:"uk-icon-button",attrs:{"uk-icon":"trash",title:"delete"},on:{click:function(e){return t.$emit("deleteComment",t.comment._id)}}})])])]):t._e(),s("Like",{attrs:{comment:t.comment}})],1)])]),t.isLast?t._e():s("hr",{staticClass:"uk-margin-remove"})])},g=[],v={name:"Comment",props:["comment","isLast"],components:{Like:k},computed:{...Object(r["c"])(["currentUser"]),isCommentByCurrentUser:function(){return this.comment.user._id===this.currentUser._id}}},b=v,C=Object(p["a"])(b,h,g,!1,null,null,null),_=C.exports,x=s("ee90"),w={name:"Post",mixins:[x["a"]],props:["post"],components:{Like:k,Comment:_},data:function(){return{commentText:"",comments:[],showComments:!1,likes:[]}},computed:{...Object(r["c"])(["currentUser"]),isPostByCurrentUser:function(){return this.post.user._id===this.currentUser._id}},methods:{loadComments:async function(){this.comments=await l.fetchComments(this.post._id)},addComment:async function(){l.addComment(this.post._id,{text:this.commentText}),this.commentText=""},deleteComment:async function(t){l.deleteComment(t)},deletePost:async function(){o["a"].deletePost(this.post._id)}}},y=w,P=Object(p["a"])(y,a,n,!1,null,null,null);e["a"]=P.exports},af3f:function(t,e,s){},bec7:function(t,e,s){"use strict";var a=s("8ba8"),n=s.n(a);n.a},c0d6:function(t,e,s){"use strict";var a=s("2b0e"),n=s("2f62"),r=s("0e44");a["a"].use(n["a"]),e["a"]=new n["a"].Store({plugins:[Object(r["a"])()],state:{authState:!1,currentUser:{}},mutations:{ASSIGN_USER_DATA:(t,e)=>{Object.assign(t.currentUser,e)},TOGGLE_AUTH_STATE:(t,e)=>{t.authState=e},RESET_STATE:t=>{t.authState=!1,t.currentUser={}}},actions:{saveUserData:(t,e)=>{t.commit("ASSIGN_USER_DATA",e)},toggleAuthState:(t,e)=>{t.commit("TOGGLE_AUTH_STATE",e)}}})},e332:function(t,e,s){},ee90:function(t,e,s){"use strict";e["a"]={methods:{mixin_autoResize_resize(t){t.target.style.height="auto",t.target.style.height=`${t.target.scrollHeight}px`}},mounted(){this.$nextTick(()=>{this.$el.setAttribute("style","height",`${this.$el.scrollHeight}px`)})}}},fced:function(t,e,s){"use strict";var a=s("af3f"),n=s.n(a);n.a}});
//# sourceMappingURL=app.be5baafb.js.map