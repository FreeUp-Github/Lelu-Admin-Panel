import{j as e,L as j,r as c,A as b}from"./index-52ff918f.js";import{u as m}from"./useQuery-45c5adc9.js";async function f({queryKey:n}){const{type:t,location:a,breed:o}=n[1],r=await fetch(`http://pets-v2.dev-apis.com/pets?animal=${t}&location=${a}&breed=${o}`);if(!r.ok)throw new Error(`fetch search with ${t}, ${a}, ${o} is not ok`);return r.json()}const y=n=>{var t;return e.jsxs(j,{to:`/detail/${n.id}`,children:[e.jsx("img",{src:(t=n.images)==null?void 0:t[0],alt:n.name,width:"50px",height:"50px"}),e.jsx("h1",{children:n.name}),e.jsx("h2",{children:n.type})]})};function g({pets:n}){return n.length===0?e.jsx("span",{children:"not found"}):n.map(t=>c.createElement(y,{...t,key:t.id,location:`${t.city} - ${t.state}`}))}async function v({queryKey:n}){const t=n[1];if(!t)return[];const a=await fetch("http://pets-v2.dev-apis.com/breeds?animal="+t);if(!a.ok)throw new Error("fetch breeds with animal: "+t+" is not ok");return a.json()}function w(n){var a;const t=m(["breeds",n],v);return{breedList:((a=t==null?void 0:t.data)==null?void 0:a.breeds)??[]}}function S(){var h;const n=["cat","dog","bird"],[t,a]=c.useState(""),[o,r]=c.useState({type:"",location:"",breed:""}),i=m(["search",o],f),p=((h=i==null?void 0:i.data)==null?void 0:h.pets)??[],{breedList:u,status:x}=w(t),[l]=c.useContext(b);return i.isLoading?e.jsx("h1",{children:"loading"}):e.jsxs("div",{children:["adopted:",l?e.jsx("img",{src:l.images[0],alt:"adopted pet",width:"100px",height:"100px"}):"not yet",e.jsxs("form",{onSubmit:s=>{s.preventDefault();const d=new FormData(s.target);r({type:d.get("type")||"",breed:d.get("breed")||"",location:d.get("location")||""})},children:[e.jsx("label",{htmlFor:"location",children:"location"}),e.jsx("input",{id:"location",placeholder:"location",name:"location"}),e.jsx("br",{}),e.jsx("label",{htmlFor:"type",children:e.jsxs("select",{id:"type",name:"type",value:t,onChange:s=>a(s.target.value),children:[e.jsx("option",{value:"",children:"-"}),n.map(s=>e.jsx("option",{value:s,children:s},s))]})}),e.jsx("br",{}),x,e.jsx("label",{htmlFor:"breed",children:e.jsxs("select",{id:"breed",name:"breed",children:[e.jsx("option",{value:"",children:"-"}),u.map(s=>e.jsx("option",{value:s,children:s},s))]})}),e.jsx("br",{}),e.jsx("button",{type:"submit",children:"submit"})]}),e.jsx(g,{pets:p})]})}export{S as default};