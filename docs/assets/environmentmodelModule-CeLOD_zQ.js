import{N as x,aS as V,r as b,aT as $,aU as C,p as m,q as n,H as v,s as e,R as U,S as w,V as u,W as d,aR as z,n as g,aV as I,t as F,aW as S,aX as R,aY as B,aZ as D,a_ as H,a$ as M,b0 as N,b1 as E,b2 as T,b3 as W,b4 as q}from"./index-R3KTXgeR.js";const L={id:"environmentmodel"},X={class:"skybox"},Y={class:"hdrcompilations"},Z=["src","onClick"],j={class:"groundboc"},A={class:"fogbox"},G={__name:"environmentmodelModule",setup(J){const i=V(),{skyimgs:f}=V(),y=b(null),k=p=>{y.value=p,q(p,i.skyvalue)},{grounddata:t}=$(),{fogdata:s,fogexp2data:a}=C();return(p,l)=>{const r=z;return g(),m("div",L,[n("div",X,[n("div",null,[v(r,{modelValue:e(i).skyvalue,"onUpdate:modelValue":l[0]||(l[0]=o=>e(i).skyvalue=o),label:"天空球",size:"large",onChange:l[1]||(l[1]=o=>e(I)(e(i).skyvalue))},null,8,["modelValue"])]),n("div",Y,[(g(!0),m(U,null,w(e(f),o=>(g(),m("img",{key:o.id,src:o.url,class:F({selected:y.value===o.id}),onClick:K=>k(o.id)},null,10,Z))),128))])]),n("div",j,[v(r,{modelValue:e(t).showvalue,"onUpdate:modelValue":l[2]||(l[2]=o=>e(t).showvalue=o),label:"网格地面",size:"large",onChange:l[3]||(l[3]=o=>e(S)(e(t).showvalue,e(t).sizevalue,e(t).divisionsvalue))},null,8,["modelValue"]),n("div",null,[u(n("input",{type:"text","onUpdate:modelValue":l[4]||(l[4]=o=>e(t).sizevalue=o),onInput:l[5]||(l[5]=o=>e(R)(e(t).sizevalue))},null,544),[[d,e(t).sizevalue]]),u(n("input",{type:"text","onUpdate:modelValue":l[6]||(l[6]=o=>e(t).divisionsvalue=o),onInput:l[7]||(l[7]=o=>e(B)(e(t).divisionsvalue))},null,544),[[d,e(t).divisionsvalue]])])]),n("div",A,[n("div",null,[v(r,{modelValue:e(s).show,"onUpdate:modelValue":l[8]||(l[8]=o=>e(s).show=o),label:"线性雾",size:"large",onChange:l[9]||(l[9]=o=>e(D)(e(s).show,e(s).near,e(s).far,e(s).color))},null,8,["modelValue"]),n("div",null,[u(n("input",{type:"text","onUpdate:modelValue":l[10]||(l[10]=o=>e(s).near=o),onInput:l[11]||(l[11]=o=>e(H)(e(s).near))},null,544),[[d,e(s).near]]),u(n("input",{type:"text","onUpdate:modelValue":l[12]||(l[12]=o=>e(s).far=o),onInput:l[13]||(l[13]=o=>e(M)(e(s).far))},null,544),[[d,e(s).far]]),u(n("input",{type:"color","onUpdate:modelValue":l[14]||(l[14]=o=>e(s).color=o),onInput:l[15]||(l[15]=o=>e(N)(e(s).color))},null,544),[[d,e(s).color]])])]),n("div",null,[v(r,{modelValue:e(a).show,"onUpdate:modelValue":l[16]||(l[16]=o=>e(a).show=o),label:"指数雾",size:"large",onChange:l[17]||(l[17]=o=>e(E)(e(a).show,e(a).color,e(a).density))},null,8,["modelValue"]),n("div",null,[u(n("input",{type:"text","onUpdate:modelValue":l[18]||(l[18]=o=>e(a).density=o),onInput:l[19]||(l[19]=o=>e(T)(e(a).density))},null,544),[[d,e(a).density]]),u(n("input",{type:"color","onUpdate:modelValue":l[20]||(l[20]=o=>e(a).color=o),onInput:l[21]||(l[21]=o=>e(W)(e(a).color))},null,544),[[d,e(a).color]])])])])])}}},P=x(G,[["__scopeId","data-v-168fc058"]]);export{P as default};