import"./base-Igt8SpnK.js";import{E as b}from"./el-popper-BkkWLrds.js";import"./el-input-number-DwCku-st.js";import{d as z,r as k,_ as w,l as C,c as s,a,b as N,F as m,e as c,u as V,f as M,o as u,t as r,g as S,h as I,p as f,w as $}from"./index-Bkz5ez3j.js";import"./plugin-vue_export-helper-EIZTjqhQ.js";import"./index-BpnjQUtM.js";import"./index-D6Xh0kVl.js";const B=z("upload",()=>({uploadvalue:k([{name:"",x:0,y:0,z:0,s:1,showhidden:!0}])})),E={id:"uploadmodule"},F={class:"custom-file-upload"},D={class:"modelName"},T=["onClick"],U=["onClick"],W=["onClick"],A={__name:"uploadModule",setup(h){const i=C();let d=B();const v=n=>{const e=n.target.files;d.uploadvalue=d.uploadvalue.filter(o=>o.name!==""),Array.from(e).filter(o=>o.name.endsWith(".gltf")||o.name.endsWith(".glb")).map(o=>{const l={name:o.name,x:0,y:0,z:0,s:1,showhidden:!0};d.uploadvalue.push(l)}),i.loadingvalue=0,i.loadingshow=!0,M(e),console.log(d.uploadvalue)},_=n=>{n&&(d.uploadvalue=d.uploadvalue.filter(e=>e.name!==n),I(n)),d.uploadvalue.length===0&&d.uploadvalue.push({name:"",x:0,y:0,z:0,s:1})},y=(n,e)=>{const o=d.uploadvalue.find(l=>l.name===n);o&&(o.x=Number(e.x),o.y=Number(e.y),o.z=Number(e.z),o.s=Number(e.s),f(n,{x:o.x,y:o.y,z:o.z,s:o.s}))},g=n=>{const e=d.uploadvalue.find(o=>o.name===n);e&&(e.x=0,e.y=0,e.z=0,e.s=1,f(n,{x:e.x,y:e.y,z:e.z,s:e.s}))},x=n=>{const e=d.uploadvalue.find(o=>o.name===n);e&&(e.showhidden=!e.showhidden,$(n,e.showhidden))};return(n,e)=>{const o=b;return u(),s("div",E,[a("div",null,[a("label",F,[e[0]||(e[0]=N(" 上传模型 ")),a("input",{type:"file",id:"fileInput",multiple:"",onChange:v},null,32)]),e[1]||(e[1]=a("h6",null,"Tips: gltf 需与.bin 纹理一同上传",-1))]),a("ul",null,[(u(!0),s(m,null,c(V(d).uploadvalue,l=>(u(),s("li",{key:l.name},[a("div",D,"模型名称:"+r(l.name),1),(u(),s(m,null,c(["x","y","z","s"],t=>a("div",{key:t},[a("label",null,[a("span",null,r(t)+":",1),S(o,{type:"range",step:"0.5",min:t==="s"?1:-100,max:100,modelValue:l[t],"onUpdate:modelValue":p=>l[t]=p,onInput:p=>y(l.name,{x:l.x,y:l.y,z:l.z,s:l.s})},null,8,["min","max","modelValue","onUpdate:modelValue","onInput"])])])),64)),a("div",null,[a("button",{onClick:t=>_(l.name)},"删除",8,T),a("button",{onClick:t=>g(l.name)},"还原",8,U),a("button",{onClick:t=>x(l.name)},r(l.showhidden?"隐藏":"显示"),9,W)])]))),128))])])}}},O=w(A,[["__scopeId","data-v-4fab6c9a"]]);export{O as default};