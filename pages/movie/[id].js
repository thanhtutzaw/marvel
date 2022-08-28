import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

const fetchAPI = async (apiURL) => {
  const resp = await fetch(`${apiURL}`)
  const data = await resp.json()
  return data
}

export async function getStaticPaths() {
  const movies = await fetchAPI("https://mcuapi.herokuapp.com/api/v1/movies")
  const data = movies.data
  const paths = data.map((m) => {
    return {
      params: { id: m.id.toString() }
    }
  })
  return {
    paths, fallback: false
  }
}
export async function getStaticProps({ params }) {
  const movie = await fetchAPI(`https://mcuapi.herokuapp.com/api/v1/movies/${params.id}`)
  return {
    props: { m: movie }
  }

}
export default function Movie({ m }) {
  const related = m.related_movies
  console.log(related)
  return (
    <div>
      <h1>{m.title}</h1>
      <Image key={m.id} alt={`${m.title}`} width="382" height="566" layout='fixed' src={`${m.cover_url}`}></Image>
      {
        related.length != 0 ? <h2>Related Movies</h2> : null
      }
      {related.map(r => (
            <Image width="382" height="566" layout='fixed' key={r.id} src={`${r.cover_url}`} alt={`${r.title}`} />
          ))}
    </div>
  )
}
