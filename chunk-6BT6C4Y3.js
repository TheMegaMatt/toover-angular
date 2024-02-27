import{j as L,k as g}from"./chunk-DGVE3CBX.js";import{$b as b,Cb as p,Db as F,Eb as v,Ia as r,Oa as T,S,T as u,W as f,X as x,_a as y,ba as h,ca as w,db as s,eb as D,fb as M,gb as k,hb as n,ib as o,jb as E,lb as B,mb as m,sb as l,tb as c,ub as I,xb as _}from"./chunk-3BEEKYPC.js";var A=(()=>{let t=class t{constructor(){this.error=u.required(),this.dismiss=new S,this.errorMessage=T(()=>this.error()?this.error().message:null)}};t.\u0275fac=function(a){return new(a||t)},t.\u0275cmp=x({type:t,selectors:[["oa-error-display"]],inputs:{error:[f.SignalBased,"error"]},outputs:{dismiss:"dismiss"},standalone:!0,features:[_],decls:15,vars:1,consts:[[1,"rounded-md","bg-red-50","mb-2.5","p-4","mt-2.5"],[1,"flex"],[1,"flex-shrink-0"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 20 20","fill","currentColor","aria-hidden","true",1,"h-5","w-5","text-red-400"],["fill-rule","evenodd","d","M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule","evenodd"],[1,"ml-3"],[1,"text-sm","font-medium","text-red-800"],[1,"ml-auto","pl-3"],[1,"-mx-1.5","-my-1.5"],["type","button",1,"inline-flex","bg-red-50","rounded-md","p-1.5","text-red-500","hover:bg-red-100","focus:outline-none","focus:ring-2","focus:ring-offset-2","focus:ring-offset-red-50","focus:ring-red-600",3,"click"],[1,"sr-only"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 20 20","fill","currentColor","aria-hidden","true",1,"h-5","w-5"],["fill-rule","evenodd","d","M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule","evenodd"]],template:function(a,d){a&1&&(n(0,"div",0)(1,"div",1)(2,"div",2),h(),n(3,"svg",3),E(4,"path",4),o()(),w(),n(5,"div",5)(6,"p",6),l(7),o()(),n(8,"div",7)(9,"div",8)(10,"button",9),B("click",function(){return d.dismiss.emit()}),n(11,"span",10),l(12,"Dismiss"),o(),h(),n(13,"svg",11),E(14,"path",12),o()()()()()()),a&2&&(r(7),I(" ",d.errorMessage(),""))},dependencies:[g],encapsulation:2});let e=t;return e})();function $(e,t){e&1&&(n(0,"p",1),l(1),p(2,"translate"),o()),e&2&&(r(),c(F(2,1,"general.form.errors.required")))}function z(e,t){if(e&1&&(n(0,"p",1),l(1),p(2,"translate"),o()),e&2){let i=m().$implicit;r(),c(v(2,1,"general.form.errors.min-length",i.value))}}function P(e,t){if(e&1&&(n(0,"p",1),l(1),p(2,"translate"),o()),e&2){let i=m().$implicit;r(),c(v(2,1,"general.form.errors.max-length",i.value))}}function V(e,t){if(e&1&&(n(0,"p",1),l(1),p(2,"translate"),o()),e&2){let i=m().$implicit;r(),c(v(2,1,"general.form.errors.valid-url",i.value))}}function G(e,t){if(e&1&&y(0,$,3,3,"p",0)(1,z,3,4,"p",0)(2,P,3,4,"p",0)(3,V,3,4,"p",0),e&2){let i=t.$implicit;s(0,i.key=="required"?0:-1),r(),s(1,i.key=="minlength"?1:-1),r(),s(2,i.key=="maxlength"?2:-1),r(),s(3,i.key=="invalidUrl"?3:-1)}}function O(e,t){if(e&1&&(M(0,G,4,4,null,null,D),p(2,"keyvalue")),e&2){let i=m();k(F(2,0,i.control().errors))}}var ee=(()=>{let t=class t{constructor(){this.control=u.required()}ngOnInit(){}};t.\u0275fac=function(a){return new(a||t)},t.\u0275cmp=x({type:t,selectors:[["oa-form-error-display"]],inputs:{control:[f.SignalBased,"control"]},standalone:!0,features:[_],decls:1,vars:1,consts:[["class","mt-2 text-sm text-red-600"],[1,"mt-2","text-sm","text-red-600"]],template:function(a,d){a&1&&y(0,O,3,2),a&2&&s(0,d.control().errors&&d.control().touched?0:-1)},dependencies:[b,g,L],encapsulation:2});let e=t;return e})();export{A as a,ee as b};
