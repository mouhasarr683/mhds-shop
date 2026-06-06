import { NextResponse } from "next/server";

export async function POST(req){

const body = await req.json();

const email = body.email;
const password = body.password;

/* verification admin */

if(
email ===mouhasarr676@gmail.com &&
password === Mhdsarr05
){

/* creer la reponse */

const response = NextResponse.json({
success:true
});

/* ajouter cookie admin */

response.cookies.set("admin","true",{
httpOnly:false,
path:"/",
maxAge:60*60*24
});

return response;

}

return NextResponse.json(
{error:"Identifiants incorrects"},
{status:401}
);

}
