import { useState } from 'react'

export default function Login(){
  const [email, setEmail] = useState('')
  async function submit(e){
    e.preventDefault();
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/auth/login', {
      method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email })
    });
    const data = await res.json();
    localStorage.setItem('token', data.token);
    window.location.href = '/';
  }
  return (
    <form onSubmit={submit} style={{ padding: 20 }}>
      <h1>Login</h1>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" />
      <button>Login</button>
    </form>
  )
}
