import useSWR from 'swr'
import Link from 'next/link'

const fetcher = url => fetch(url).then(r => r.json());

export default function Home(){
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`, fetcher);
  return (
    <div style={{ padding: 20 }}>
      <h1>InAI</h1>
      <Link href="/login">Login</Link>
      <h2>Courses</h2>
      <ul>
        {data?.map(c => <li key={c.id}>{c.title}</li>)}
      </ul>
    </div>
  )
}
