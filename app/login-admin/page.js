"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginAdmin(){

const router = useRouter();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [error,setError] = useState("");

async function handleLogin(e){

e.preventDefault();

const res = await fetch("/api/admin-login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({email,password})

});

if(res.ok){

router.push("/admin");

}else{

setError("Identifiants incorrects");

}

}

return(

<div className="flex items-center justify-center min-h-screen bg-gray-100">

<form
onSubmit={handleLogin}
className="bg-white p-8 rounded-xl shadow-md w-96 space-y-4"
>

<h1 className="text-2xl font-bold text-center">
Admin Login
</h1>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full border p-3 rounded"
/>

<input
type="password"
placeholder="Mot de passe"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full border p-3 rounded"
/>

{error && (
<p className="text-red-500 text-sm">
{error}
</p>
)}

<button
className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
>

Se connecter

</button>

</form>

</div>

)

}