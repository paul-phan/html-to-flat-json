import{l as h,v as i,d as m,T as f,S as g}from"./vendor.957044f4.js";const y=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}};y();const v=l=>{var r=document.createElement("div");return r.innerHTML=l,r},p=l=>{let r=l.attributes,s={};for(var n=0;n<r.length;n++)s[r[n].name]=r[n].value;return s},w=l=>{let r=0,s=[];const n=e=>{let t=[];return e.forEach(o=>{var u,c;let a=++r;if(t.push(a),o instanceof HTMLElement)s.push({id:a,type:o.tagName.toLowerCase(),attributes:p(o),children:n(o.childNodes)});else{let d=(c=(u=o.nodeValue)==null?void 0:u.toString())==null?void 0:c.trim();d&&s.push({id:a,type:"text",value:d})}}),t};return s.push({type:l.tagName.toLowerCase(),id:r,attributes:p(l),children:n(l.childNodes)}),s};function L(){let[l,r]=h("");return i(m,null,i("h3",null,"HTML to Flat JSON"),i("div",null,i(f,{onChange:n=>{let e=n.target.value;const t=v(e);try{console.log("root",t);let o=w(t).sort((a,u)=>a.id>u.id?1:-1);console.log("jsonData",o),r(JSON.stringify(o,null,2))}catch(o){console.warn(o)}},placeholder:"input HTML here",minRows:30,maxRows:30,style:{width:"100%"}})),i("div",null,i(f,{placeholder:"JSON output",minRows:30,maxRows:30,style:{width:"100%"},value:l})))}g(i(L,null),document.getElementById("app"));
