import{a as h,o as n}from"./chunk-DGVE3CBX.js";import{B as i,q as s,qa as p}from"./chunk-3BEEKYPC.js";var a=class{constructor(t){this.http=p(h),this.baseUrl=n.baseUrl,this.baseUrl=this.baseUrl+t}search(t){let r=t?`${this.baseUrl}${l(t)}`:this.baseUrl;return this.http.get(r).pipe(i(e=>s(()=>e.error)))}get(t){return this.http.get(`${this.baseUrl}/${t}`).pipe(i(r=>s(()=>r.error)))}create(t){return this.http.post(this.baseUrl,t).pipe(i(r=>s(()=>r.error)))}update(t){return this.http.put(`${this.baseUrl}/${t.id}`,t).pipe(i(r=>s(()=>r.error)))}delete(t){return this.http.delete(`${this.baseUrl}/${t}`).pipe(i(r=>s(()=>r.error)))}};function l(o){let t=new URLSearchParams;for(let r in o){let e=o[r];(typeof e=="number"||typeof e=="boolean")&&t.set(r,e.toString()),typeof e=="string"&&t.set(r,e)}return`?${t.toString()}`}export{a};
