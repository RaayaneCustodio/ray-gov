import { useState } from 'react';

export default async function CreateLinkPage() {
    const accessToken = "EAAQeLBQkr3UBO0xyVB0yK4y7D5gqgAURz5lJbrY56hUuovyvXzZA7L0El6pZBlRysGORBM0adiPlH9XxZCcu0mPjBSiAJHCNcVY1HTcpZAY2CiewoLVCWARpVvuJZCVE3S3TAgBXUKOuA3LwEPloZA34WPMXwrdzk0rFeZBXRUodfjMHmuUeZABIfKP3Ll9E2Xlo9BMGuxZCJEkUduGOlpN03T2ufwiNZAWEle4QdByS06pJM4kZBSnQWhKZB3WW33ZBN4ZCoZD"
    const userId = "3144917115638952"
    const apiUrl = `https://graph.facebook.com/${userId}?fields=id,name,email,birthday&access_token=${accessToken}`;
    // const apiUrl = `https://graph.facebook.com/v19.0/${postId}?fields=likes.summary(true),comments.summary(true),shares&access_token=${accessToken}`;
   
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