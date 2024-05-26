import { useState } from 'react';

export default async function CreateLinkPage() {
    const accessToken = ""
    const userId = ""
    const apiUrl = ``;

   
    const fetchPost =  await fetch(apiUrl)
    const data = await fetchPost.json()
    console.log(data)

    return (
        <div>
            <form action="">
                <div className="grid gap-1">
                    <label htmlFor="link">Insira o link do post</label>
                    <input type="url"  className="h-full border p-3 rounded"/>
                </div>
                <button type="submit" className="mt-6 bg-slate-800 text-slate-100 px-5 py-3 rounded">Cadastrar link</button>
            </form>
        </div>
    )
} 