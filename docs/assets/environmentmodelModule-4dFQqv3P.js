import{R as f,b1 as V,r as k,b2 as $,b3 as C,q as m,s as n,K as r,t as e,W as U,X as z,Z as a,$ as d,b0 as w,p as b,b4 as I,v as F,b5 as B,b6 as D,b7 as M,b8 as R,b9 as S,ba as E,bb as H,bc as N,bd as q,be as K,bf as L,bg as T}from"./index-ABRdZyaC.js";const W={id:"environmentmodel"},X={class:"skybox"},Z={class:"hdrcompilations"},j=["src","onClick"],A={class:"groundboc"},G={class:"axeshelper"},J={class:"fogbox"},O={__name:"environmentmodelModule",setup(P){const v=V(),{skyimgs:y}=V(),g=k(null),x=p=>{g.value=p,T(p,v.skyvalue)},{grounddata:t}=$(),{fogdata:s,fogexp2data:u}=C();return(p,l)=>{const i=w;return b(),m("div",W,[n("div",X,[n("div",null,[r(i,{modelValue:e(v).skyvalue,"onUpdate:modelValue":l[0]||(l[0]=o=>e(v).skyvalue=o),label:"天空球",size:"large",onChange:l[1]||(l[1]=o=>e(I)(e(v).skyvalue))},null,8,["modelValue"])]),n("div",Z,[(b(!0),m(U,null,z(e(y),o=>(b(),m("img",{key:o.id,src:o.url,class:F({selected:g.value===o.id}),onClick:Q=>x(o.id)},null,10,j))),128))])]),n("div",A,[r(i,{modelValue:e(t).showvalue,"onUpdate:modelValue":l[2]||(l[2]=o=>e(t).showvalue=o),label:"网格地面",size:"large",onChange:l[3]||(l[3]=o=>e(B)(e(t).showvalue,e(t).sizevalue,e(t).divisionsvalue))},null,8,["modelValue"]),n("div",null,[a(n("input",{type:"text","onUpdate:modelValue":l[4]||(l[4]=o=>e(t).sizevalue=o),onInput:l[5]||(l[5]=o=>e(D)(e(t).sizevalue))},null,544),[[d,e(t).sizevalue]]),a(n("input",{type:"text","onUpdate:modelValue":l[6]||(l[6]=o=>e(t).divisionsvalue=o),onInput:l[7]||(l[7]=o=>e(M)(e(t).divisionsvalue))},null,544),[[d,e(t).divisionsvalue]])])]),n("div",G,[r(i,{modelValue:e(t).axeshelper,"onUpdate:modelValue":l[8]||(l[8]=o=>e(t).axeshelper=o),label:"坐标辅助器",size:"large",onClick:l[9]||(l[9]=o=>e(R)(e(t).axeshelper))},null,8,["modelValue"])]),n("div",J,[n("div",null,[r(i,{modelValue:e(s).show,"onUpdate:modelValue":l[10]||(l[10]=o=>e(s).show=o),label:"线性雾",size:"large",onChange:l[11]||(l[11]=o=>e(S)(e(s).show,e(s).near,e(s).far,e(s).color))},null,8,["modelValue"]),n("div",null,[a(n("input",{type:"text","onUpdate:modelValue":l[12]||(l[12]=o=>e(s).near=o),onInput:l[13]||(l[13]=o=>e(E)(e(s).near))},null,544),[[d,e(s).near]]),a(n("input",{type:"text","onUpdate:modelValue":l[14]||(l[14]=o=>e(s).far=o),onInput:l[15]||(l[15]=o=>e(H)(e(s).far))},null,544),[[d,e(s).far]]),a(n("input",{type:"color","onUpdate:modelValue":l[16]||(l[16]=o=>e(s).color=o),onInput:l[17]||(l[17]=o=>e(N)(e(s).color))},null,544),[[d,e(s).color]])])]),n("div",null,[r(i,{modelValue:e(u).show,"onUpdate:modelValue":l[18]||(l[18]=o=>e(u).show=o),label:"指数雾",size:"large",onChange:l[19]||(l[19]=o=>e(q)(e(u).show,e(u).color,e(u).density))},null,8,["modelValue"]),n("div",null,[a(n("input",{type:"text","onUpdate:modelValue":l[20]||(l[20]=o=>e(u).density=o),onInput:l[21]||(l[21]=o=>e(K)(e(u).density))},null,544),[[d,e(u).density]]),a(n("input",{type:"color","onUpdate:modelValue":l[22]||(l[22]=o=>e(u).color=o),onInput:l[23]||(l[23]=o=>e(L)(e(u).color))},null,544),[[d,e(u).color]])])])])])}}},h=f(O,[["__scopeId","data-v-6fcdc755"]]);export{h as default};
