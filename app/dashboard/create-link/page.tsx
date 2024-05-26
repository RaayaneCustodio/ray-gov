import React from 'react';

export default function CreateLinkPage() {
    return (
        <div>
            <form action="">
                <div className="grid gap-1">
                    <label htmlFor="link">Insira o link do post</label>
                    <input type="url" className="h-full border p-3 rounded" />
                </div>
                <button type="submit" className="mt-6 bg-slate-800 text-slate-100 px-5 py-3 rounded">Cadastrar link</button>
            </form>
        </div>
    )
} 
