import{N as V,b6 as _,p as t,R as b,S as c,s as a,n,q as o,A as m,H as d,b7 as i,b8 as h,b9 as C,ba as y,aR as U}from"./index-R3KTXgeR.js";import{E as f}from"./el-input-number-BZtHojoK.js";import"./index-BCRq0Onf.js";import"./index-Bw3keCET.js";const k={id:"animatemodule"},N={__name:"animateModule",setup(z){const{animatevalue:u}=_();return console.log(u),(A,r)=>{const p=U,g=f;return n(),t("div",k,[(n(!0),t(b,null,c(a(u),(v,s)=>(n(),t("ul",{key:s},[o("h4",null,"模型名称:"+m(v.modelName),1),(n(!0),t(b,null,c(v.animateData,e=>(n(),t("li",{key:e.uuid},[o("h4",null,"动画名称:"+m(e.name),1),o("div",null,[d(p,{modelValue:e.startandstop,"onUpdate:modelValue":l=>e.startandstop=l,label:e.startandstop?"播放":"停止",size:"large",onChange:l=>a(i)(e.uuid,e.startandstop,a(u)[s].serialnumber)},null,8,["modelValue","onUpdate:modelValue","label","onChange"]),d(p,{modelValue:e.pauserecovery,"onUpdate:modelValue":l=>e.pauserecovery=l,label:e.pauserecovery?"恢复":"暂停",size:"large",onChange:l=>a(h)(e.uuid,e.pauserecovery,a(u)[s].serialnumber)},null,8,["modelValue","onUpdate:modelValue","label","onChange"]),d(p,{modelValue:e.positivenegative,"onUpdate:modelValue":l=>e.positivenegative=l,label:e.positivenegative?"正放":"倒放",size:"large",onChange:l=>a(C)(e.uuid,e.positivenegative,a(u)[s].serialnumber)},null,8,["modelValue","onUpdate:modelValue","label","onChange"])]),o("div",null,[r[0]||(r[0]=o("span",null,"动画进度:",-1)),o("span",null,m(e.progress.toFixed(0))+"%",1)]),o("div",null,[r[1]||(r[1]=o("span",null,"播放次数:",-1)),d(g,{modelValue:e.animateloop,"onUpdate:modelValue":l=>e.animateloop=l,size:"small",min:"1",onChange:l=>a(y)(e.uuid,e.animateloop,a(u)[s].serialnumber)},null,8,["modelValue","onUpdate:modelValue","onChange"])])]))),128))]))),128))])}}},D=V(N,[["__scopeId","data-v-aa5eeb39"]]);export{D as default};