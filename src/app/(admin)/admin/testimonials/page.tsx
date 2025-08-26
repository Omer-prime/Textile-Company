"use client";
import { useEffect, useState } from "react";

type T = { id:string; name:string; avatar?:string|null; rating:number; review:string; createdAt:string };

export default function AdminTestimonials() {
  const [items,setItems]=useState<T[]>([]);
  const [form,setForm]=useState({name:"",avatar:"",rating:5,review:""});

  const load = async()=> setItems(await (await fetch("/api/testimonials")).json());
  useEffect(()=>{ load(); },[]);

  const submit = async(e:any)=>{ e.preventDefault();
    const res = await fetch("/api/testimonials",{ method:"POST", body: JSON.stringify(form) });
    if(res.ok){ setForm({name:"",avatar:"",rating:5,review:""}); load(); }
  };

  const del = async(id:string)=>{ if(!confirm("Delete?"))return;
    const res = await fetch(`/api/testimonials/${id}`,{method:"DELETE"});
    if(res.ok) load();
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Testimonials</h1>

      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4 p-4 border rounded mb-8">
        <input className="border rounded px-3 py-2" placeholder="Name"
          value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input className="border rounded px-3 py-2" placeholder="Avatar URL"
          value={form.avatar} onChange={e=>setForm({...form,avatar:e.target.value})}/>
        <input className="border rounded px-3 py-2" type="number" min={1} max={5} placeholder="Rating"
          value={form.rating} onChange={e=>setForm({...form,rating:Number(e.target.value)})}/>
        <textarea className="border rounded px-3 py-2 md:col-span-2" placeholder="Review"
          value={form.review} onChange={e=>setForm({...form,review:e.target.value})}/>
        <button className="bg-blue-600 text-white rounded px-4 py-2 md:col-span-2">Add Testimonial</button>
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {items.map(t=>(
          <div key={t.id} className="border rounded p-4">
            <div className="flex items-center gap-3">
              {t.avatar && <img src={t.avatar} className="w-10 h-10 rounded-full" alt={t.name} />}
              <div className="font-semibold">{t.name}</div>
              <div className="ml-auto text-sm text-gray-500">{t.rating}★</div>
            </div>
            <p className="mt-2 text-gray-700">{t.review}</p>
            <button onClick={()=>del(t.id)} className="text-red-600 mt-2 underline">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
