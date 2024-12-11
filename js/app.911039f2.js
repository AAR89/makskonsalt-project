(function(){"use strict";var t={4438:function(t,e,o){var i=o(5471),n=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("nav",[e("router-link",{attrs:{to:"/one"}},[t._v("Посты")]),t._v(" | "),e("router-link",{attrs:{to:"/two"}},[t._v("Загрузка")])],1),e("router-view")],1)},s=[],r=o(1656),a={},l=(0,r.A)(a,n,s,!1,null,null,null),c=l.exports,d=o(5453);i.Ay.use(d.A);var u=new d.A({}),f=o(173),p=o(6521),h=o(1689),v=o(8834),m=o(9867),y=o(503),k=o(4089),b=o(9940),g=o(7402),A=function(){var t=this,e=t._self._c;return e(m.A,[e(p.A,{on:{click:t.openCreatePostDialog}},[t._v("Добавить пост")]),e(y.A,{attrs:{headers:t.headers,items:t.posts,"item-key":"id",options:t.options},on:{"update:options":function(e){t.options=e},"click:row":t.openPostDetails},scopedSlots:t._u([{key:"item.actions",fn:function({item:o}){return[e(p.A,{on:{click:function(e){return e.stopPropagation(),t.editPost(o)}}},[t._v("Редактировать")]),e(p.A,{on:{click:function(e){return e.stopPropagation(),t.deletePost(o)}}},[t._v("Удалить")])]}}])}),[e(k.A,{attrs:{"max-width":"500px",attach:"#app"},model:{value:t.createDialog,callback:function(e){t.createDialog=e},expression:"createDialog"}},[e(h.A,[e(v.ri,[t._v(t._s(t.isEditMode?"Edit Post":"Add Post"))]),e(v.OQ,[e(b.A,{attrs:{label:"Title"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}}),e(g.A,{attrs:{label:"Body"},model:{value:t.form.body,callback:function(e){t.$set(t.form,"body",e)},expression:"form.body"}})],1),e(v.SL,{staticClass:"posts-bottons-section"},[e(p.A,{attrs:{color:"black"},on:{click:t.savePost}},[t._v("Сохранитьь")]),e(p.A,{attrs:{color:"black"},on:{click:t.closeDialog}},[t._v("Отмена")])],1)],1)],1)]],2)},w=[],_=o(3957),P=o.n(_),F={data(){return{posts:[],headers:[{text:"ID",value:"id"},{text:"Title",value:"title"},{text:"Body",value:"body"},{text:"Actions",value:"actions"}],options:{page:1,itemsPerPage:5,sortBy:[],sortDesc:[]},createDialog:!1,isEditMode:!1,form:{id:null,title:"",body:""}}},methods:{async fetchPosts(){try{const t=await P().get("https://2264c69973bfa56d.mokky.dev/posts");this.posts=t.data}catch(t){console.error("Error fetching posts:",t)}},openCreatePostDialog(){this.form={title:"",body:""},this.isEditMode=!1,this.createDialog=!0},async savePost(){try{if(this.isEditMode){const t=await P().patch(`https://2264c69973bfa56d.mokky.dev/posts/${this.form.id}`,this.form);console.log("Пост отредактирован.",t.data),alert("Пост отредактирован.")}else{const t=await P().post("https://2264c69973bfa56d.mokky.dev/posts",this.form);console.log("Пост создан",t.data),alert("Пост отредактирован.")}this.createDialog=!1,this.fetchPosts()}catch(t){console.error("Error saving post:",t),alert("Ошибка при сохранении поста.")}},async editPost(t){this.form={...t},this.isEditMode=!0,this.createDialog=!0},async deletePost(t){const e=confirm("Вы уверенны что хотите удалить этот пост?");e&&(await P()["delete"](`https://2264c69973bfa56d.mokky.dev/posts/${t.id}`),this.fetchPosts())},openPostDetails(t){this.editPost(t),console.log(t)},closeDialog(){this.createDialog=!1}},mounted(){this.fetchPosts()}},x=F,D=(0,r.A)(x,A,w,!1,null,null,null),O=D.exports,C=o(8),j=o(9456),S=o(2987),E=o(1075),M=o(6315),T=o(380),N=function(){var t=this,e=t._self._c;return e(m.A,[e(C.A,{attrs:{label:"Выберите файл"},on:{change:t.onFileChange},model:{value:t.file,callback:function(e){t.file=e},expression:"file"}}),e("section",{staticClass:"bottons-section"},[e(p.A,{attrs:{disabled:!t.file},on:{click:t.sendFile}},[t._v("Отправить")]),e(p.A,{attrs:{disabled:!t.fileSent},on:{click:t.downloadFile}},[t._v("Скачать")])],1),e(S.A,t._l(t.reversedFiles,(function(o){return e(E.A,{key:o.id,staticClass:"file-item"},[e(T.pr,[e(T.UZ,[t._v(t._s(o.fileName))]),e(T.w,[t._v(t._s(o.url))])],1),e(M.A,[e(p.A,{attrs:{icon:""},on:{click:function(e){return t.downloadFileFromList(o.url,o.fileName)}}},[e(j.A,[t._v("mdi-download")])],1),e(p.A,{attrs:{icon:"",color:"red"},on:{click:function(e){return t.deleteFile(o.id)}}},[e(j.A,[t._v("mdi-delete")])],1)],1)],1)})),1)],1)},U=[],$=(o(8992),o(4520),o(4213)),B={data(){return{file:null,fileSent:!1,downloadUrl:null,fileName:null,files:[]}},computed:{reversedFiles(){return[...this.files].reverse()}},methods:{onFileChange(t){this.file=t},async sendFile(){try{const t=new FormData;t.append("file",this.file);const e=await P().post("https://2264c69973bfa56d.mokky.dev/uploads",t,{headers:{"Content-Type":"multipart/form-data"}});this.downloadUrl=e.data.url,this.fileName=e.data.fileName,this.fileSent=!0,this.fetchFiles(),alert("Файл успешно отправлен")}catch(t){console.error("Ошибка при отправке файла",t)}},downloadFile(){this.downloadUrl&&((0,$.saveAs)(this.downloadUrl,this.fileName),this.fileName=null)},downloadFileFromList(t,e){(0,$.saveAs)(t,e)},async deleteFile(t){try{await P()["delete"](`https://2264c69973bfa56d.mokky.dev/uploads/${t}`),this.files=this.files.filter((e=>e.id!==t)),alert("Файл успешно удалён")}catch(e){console.error("Ошибка при удалении файла",e)}},async fetchFiles(){try{const t=await P().get("https://2264c69973bfa56d.mokky.dev/uploads");this.files=t.data}catch(t){console.error("Ошибка при загрузке списка файлов",t)}}},mounted(){this.fetchFiles()}},L=B,I=(0,r.A)(L,N,U,!1,null,"90f0cddc",null),Q=I.exports;i.Ay.use(f.Ay);const Z=[{path:"*",name:"PostsComp",component:O},{path:"/two",name:"UploudComp",component:Q}],q=new f.Ay({mode:"history",base:"/makskonsalt-project/",routes:Z});var z=q;i.Ay.config.productionTip=!1,new i.Ay({vuetify:u,router:z,render:t=>t(c)}).$mount("#app")}},e={};function o(i){var n=e[i];if(void 0!==n)return n.exports;var s=e[i]={exports:{}};return t[i].call(s.exports,s,s.exports,o),s.exports}o.m=t,function(){var t=[];o.O=function(e,i,n,s){if(!i){var r=1/0;for(d=0;d<t.length;d++){i=t[d][0],n=t[d][1],s=t[d][2];for(var a=!0,l=0;l<i.length;l++)(!1&s||r>=s)&&Object.keys(o.O).every((function(t){return o.O[t](i[l])}))?i.splice(l--,1):(a=!1,s<r&&(r=s));if(a){t.splice(d--,1);var c=n();void 0!==c&&(e=c)}}return e}s=s||0;for(var d=t.length;d>0&&t[d-1][2]>s;d--)t[d]=t[d-1];t[d]=[i,n,s]}}(),function(){o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,{a:e}),e}}(),function(){o.d=function(t,e){for(var i in e)o.o(e,i)&&!o.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={524:0};o.O.j=function(e){return 0===t[e]};var e=function(e,i){var n,s,r=i[0],a=i[1],l=i[2],c=0;if(r.some((function(e){return 0!==t[e]}))){for(n in a)o.o(a,n)&&(o.m[n]=a[n]);if(l)var d=l(o)}for(e&&e(i);c<r.length;c++)s=r[c],o.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return o.O(d)},i=self["webpackChunkmakskonsalt_project"]=self["webpackChunkmakskonsalt_project"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=o.O(void 0,[504],(function(){return o(4438)}));i=o.O(i)})();
//# sourceMappingURL=app.911039f2.js.map