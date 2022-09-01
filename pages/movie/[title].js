import Image from 'next/image'
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
    const title = m.title.toLowerCase().replace(/ /g, '-').replace(/[.,\/#!$%\^&\*;:{}=]/g, "")
    return {
      // params: { id: m.title.toLowerCase().replace(/\: +/g, '-')}
      // params: { id: m.title.toLowerCase().replace(/\ +/g, '-') }
      // params: { id: m.title.toLowerCase().replace(/\: /g, '-') }
      params: { title }



    }
  })
  return {
    paths, fallback: false
  }
}
export async function getStaticProps({ params }) {
  // console.log(params , typeof(params) , params.id , params.title)
  // const movie = await fetchAPI(`https://mcuapi.herokuapp.com/api/v1/movies/${params.id}`)

  const movies = await fetchAPI("https://mcuapi.herokuapp.com/api/v1/movies")
  const data = movies.data
  const find = data.find(d => d.title.toLowerCase().replace(/ /g, '-').replace(/[.,\/#!$%\^&\*;:{}=]/g, "") == params.title) // find   is object ( Thor : id:4, url:https...)
  // const id = find.map(f => {
  //   return { id: f.id }
  // })
  const movie = await fetchAPI(`https://mcuapi.herokuapp.com/api/v1/movies/${find.id}`)

  return {
    props: { m: movie  }
  }

}
export default function Movie({ m }) {
  const related = m.related_movies
  console.table("related", related)
  console.log(m)
  // console.log(t)
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
