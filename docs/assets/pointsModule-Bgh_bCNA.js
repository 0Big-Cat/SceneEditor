import{R as b,bC as m,q as c,K as r,t as o,s as l,B as p,a6 as d,b0 as g,p as v,bD as x,bE as f,bF as k,bG as C}from"./index-ABRdZyaC.js";const V={id:"modelpoint"},$={__name:"pointsModule",setup(y){let n=m();function a(s){const e=parseFloat(s);return isNaN(e)?"0.000":e.toFixed(3)}const u=(s,e,i)=>{const t=`${s},${e},${i}`;navigator.clipboard.writeText(t).then(()=>{d({message:"复制成功",type:"success"})}).catch(()=>{d({message:"复制失败",type:"warning"})})};return(s,e)=>{const i=g;return v(),c("div",V,[r(i,{modelValue:o(n).pointlabel,"onUpdate:modelValue":e[0]||(e[0]=t=>o(n).pointlabel=t),label:"标点",size:"large",onChange:e[1]||(e[1]=t=>o(x)(o(n).pointlabel))},null,8,["modelValue"]),l("div",null,[e[7]||(e[7]=l("span",null,"坐标:",-1)),l("span",null,p(a(o(n).pointcoordinate.x)),1),l("span",null,p(a(o(n).pointcoordinate.y)),1),l("span",null,p(a(o(n).pointcoordinate.z)),1),l("button",{onClick:e[2]||(e[2]=t=>u(a(o(n).pointcoordinate.x),a(o(n).pointcoordinate.y),a(o(n).pointcoordinate.z)))},"复制")]),r(i,{modelValue:o(n).pathlabel,"onUpdate:modelValue":e[3]||(e[3]=t=>o(n).pathlabel=t),label:"路径",size:"large"},null,8,["modelValue"]),l("div",null,[l("button",{onClick:e[4]||(e[4]=t=>o(f)())},"全部清除"),l("button",{onClick:e[5]||(e[5]=t=>o(k)())},"回退"),l("button",{onClick:e[6]||(e[6]=t=>o(C)())},"json格式导出")])])}}},B=b($,[["__scopeId","data-v-defd6f59"]]);export{B as default};