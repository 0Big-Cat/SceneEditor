import{R as c,a6 as y,q as g,s as o,Z as s,$ as e,t as l,a7 as p,a8 as v,a9 as x,p as b}from"./index-k3IKlCvZ.js";const z={id:"pointmodule"},f={__name:"cameraModule",setup(V){const t=y(),r=()=>{const a=`${t.camerapoint.x},${t.camerapoint.y},${t.camerapoint.z}`;navigator.clipboard.writeText(a).then(()=>{p({message:"复制成功",type:"success"})}).catch(()=>{p({message:"复制失败",type:"warning"})})},u=()=>{const a=`${t.controlspoint.x},${t.controlspoint.y},${t.controlspoint.z}`;navigator.clipboard.writeText(a).then(()=>{p({message:"复制成功",type:"success"})}).catch(()=>{p({message:"复制失败",type:"warning"})})},m=()=>{v()},d=()=>{x()};return(a,n)=>(b(),g("div",z,[o("div",{class:"titlebox"},[n[6]||(n[6]=o("h4",null,"相机坐标",-1)),o("div",null,[o("button",{onClick:m,class:"iconfont icon-zhongzhi"}),o("button",{onClick:r,class:"iconfont icon-fuzhi"})])]),o("div",null,[n[7]||(n[7]=o("span",null,"position-x",-1)),s(o("input",{type:"number","onUpdate:modelValue":n[0]||(n[0]=i=>l(t).camerapoint.x=i)},null,512),[[e,l(t).camerapoint.x]])]),o("div",null,[n[8]||(n[8]=o("span",null,"position-y",-1)),s(o("input",{type:"number","onUpdate:modelValue":n[1]||(n[1]=i=>l(t).camerapoint.y=i)},null,512),[[e,l(t).camerapoint.y]])]),o("div",null,[n[9]||(n[9]=o("span",null,"position-z",-1)),s(o("input",{type:"number","onUpdate:modelValue":n[2]||(n[2]=i=>l(t).camerapoint.z=i)},null,512),[[e,l(t).camerapoint.z]])]),o("div",{class:"titlebox"},[n[10]||(n[10]=o("h4",null,"旋转中心坐标",-1)),o("div",null,[o("button",{onClick:d,class:"iconfont icon-zhongzhi"}),o("button",{onClick:u,class:"iconfont icon-fuzhi"})])]),o("div",null,[n[11]||(n[11]=o("span",null,"target-x",-1)),s(o("input",{type:"number","onUpdate:modelValue":n[3]||(n[3]=i=>l(t).controlspoint.x=i)},null,512),[[e,l(t).controlspoint.x]])]),o("div",null,[n[12]||(n[12]=o("span",null,"target-y",-1)),s(o("input",{type:"number","onUpdate:modelValue":n[4]||(n[4]=i=>l(t).controlspoint.y=i)},null,512),[[e,l(t).controlspoint.y]])]),o("div",null,[n[13]||(n[13]=o("span",null,"target-z",-1)),s(o("input",{type:"number","onUpdate:modelValue":n[5]||(n[5]=i=>l(t).controlspoint.z=i)},null,512),[[e,l(t).controlspoint.z]])])]))}},k=c(f,[["__scopeId","data-v-5061fd88"]]);export{k as default};