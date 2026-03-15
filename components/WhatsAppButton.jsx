"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton(){

const phone = "221774865299";

const message = "Bonjour MHDS SHOP, je veux des informations.";

const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

return(

<a
href={url}
target="_blank"
className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition z-50"
>

<FaWhatsapp size={28}/>

</a>

)

}