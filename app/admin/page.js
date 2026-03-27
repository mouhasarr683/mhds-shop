"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function AdminPage() {

const router = useRouter();

const [products,setProducts] = useState([]);
const [editingId,setEditingId] = useState(null);
const [uploading,setUploading] = useState(false);

const [form,setForm] = useState({
name:"",
description:"",
price:"",
image:"",
category:"",
variants:""
});

/* ================= ADMIN CHECK ================= */
useEffect(()=>{
if(!document.cookie.includes("admin=true")){
router.push("/login-admin");
}
},[]);

/* ================= LOAD ================= */
async function loadProducts(){
const res = await fetch("/api/products");
const data = await res.json();
setProducts(data);
}

useEffect(()=>{ loadProducts(); },[]);

/* ================= FORM ================= */
function handleChange(e){
setForm({...form,[e.target.name]:e.target.value});
}

/* ================= PARSE VARIANTS ================= */
function parseVariants(input){

return input.split(",").map(v=>{
const parts = v.split(":").map(x=>x.trim());

if(parts.length === 3){
return {
size: parts[0],
color: parts[1],
stock: Number(parts[2]) || 0
};
}

if(parts.length === 2){
return {
size: parts[0],
stock: Number(parts[1]) || 0
};
}

return null;

}).filter(Boolean);

}

/* ================= SUBMIT ================= */
async function handleSubmit(e){
e.preventDefault();

const variantsArray = parseVariants(form.variants);

const totalStock = variantsArray.reduce((t,v)=>t+v.stock,0);

const productData = {
name:form.name,
description:form.description,
price:Number(form.price),
image:form.image,
category:form.category,
variants:variantsArray,
totalStock
};

if(editingId){
await fetch(`/api/products/${editingId}`,{
method:"PUT",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify(productData)
});
setEditingId(null);
}else{
await fetch("/api/products",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify(productData)
});
}

/* RESET */
setForm({
name:"",
description:"",
price:"",
image:"",
category:"",
variants:""
});

loadProducts();
}

/* ================= DELETE ================= */
async function deleteProduct(id){
if(!confirm("Supprimer ?")) return;
await fetch(`/api/products/${id}`,{method:"DELETE"});
loadProducts();
}

/* ================= EDIT ================= */
function editProduct(p){

setEditingId(p._id);

const variantsString = p.variants.map(v=>{
if(v.color) return `${v.size}:${v.color}:${v.stock}`;
return `${v.size}:${v.stock}`;
}).join(",");

setForm({
name:p.name,
description:p.description,
price:p.price,
image:p.image,
category:p.category,
variants:variantsString
});
}

/* ================= CLOUDINARY UPLOAD ================= */
async function handleImageUpload(e){

const file = e.target.files[0];
if(!file) return;

setUploading(true);

const reader = new FileReader();

reader.readAsDataURL(file);

reader.onloadend = async ()=>{

const res = await fetch("/api/upload",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({ image: reader.result })
});

const data = await res.json();

setForm(prev=>({
...prev,
image:data.url
}));

setUploading(false);

};

}

/* ================= UI ================= */
return(
<div className="bg-gray-100 min-h-screen">

<Navbar/>

<section className="max-w-6xl mx-auto px-6 py-12">

<h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

<form onSubmit={handleSubmit}
className="bg-white p-6 rounded-xl shadow space-y-4 mb-10">

<input name="name" placeholder="Nom"
value={form.name} onChange={handleChange}
className="w-full border p-3 rounded"/>

<input name="description" placeholder="Description"
value={form.description} onChange={handleChange}
className="w-full border p-3 rounded"/>

<input name="price" placeholder="Prix"
value={form.price} onChange={handleChange}
className="w-full border p-3 rounded"/>

<input name="category" placeholder="Categorie"
value={form.category} onChange={handleChange}
className="w-full border p-3 rounded"/>

{/* UPLOAD IMAGE */}
<input
type="file"
onChange={handleImageUpload}
className="w-full border p-3 rounded"
/>

{uploading && (
<p className="text-blue-500 text-sm">Upload en cours...</p>
)}

{form.image && (
<img src={form.image}
className="w-32 h-32 object-cover rounded"/>
)}

<input name="variants"
placeholder="S:rouge:5,S:bleu:3,M:10"
value={form.variants}
onChange={handleChange}
className="w-full border p-3 rounded"/>

<button className="bg-blue-600 text-white px-6 py-3 rounded">
{editingId ? "Modifier" : "Ajouter"}
</button>

</form>

<div className="grid md:grid-cols-3 gap-6">

{products.map(p=>{

const total = p.variants?.reduce((t,v)=>t+v.stock,0) || 0;

return(
<div key={p._id} className="bg-white p-4 rounded-xl shadow">

<img src={p.image}
className="w-full h-40 object-cover rounded mb-3"/>

<h2 className="font-bold">{p.name}</h2>

<p className="text-blue-600 font-bold">{p.price} FCFA</p>

<p className="text-sm text-gray-500">
Stock total : {total}
</p>

<div className="text-xs mt-2 space-y-1">
{p.variants?.map((v,i)=>(
<div key={i}>
{v.size} {v.color && `- ${v.color}`} : {v.stock}
</div>
))}
</div>

<div className="flex gap-2 mt-3">
<button onClick={()=>editProduct(p)}
className="bg-yellow-500 text-white px-3 py-1 rounded">
Edit
</button>

<button onClick={()=>deleteProduct(p._id)}
className="bg-red-500 text-white px-3 py-1 rounded">
Delete
</button>
</div>

</div>
);
})}

</div>

</section>
</div>
);
}