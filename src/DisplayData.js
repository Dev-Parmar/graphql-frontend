import React, { useState } from 'react'
import { useQuery, useLazyQuery, gql } from '@apollo/client'


const QUERY_ALL_USERS = gql`
query getAllUsers{
  users {
    id
    name
  }
}
`

const QUERY_FIND_MOVIE = gql`
query Movie($name:String!){
  movie(name:$name) {
    name
    realeaseYear
  }
}
`

const QUERY_ALL_MOVIES = gql`
query getAllMovies{
  movies {
    name
  }
}
`

function DisplayData() {

  const [searchMovie, setSearchMovie] = useState("")

  const us = useQuery(QUERY_ALL_USERS)
  const mo = useQuery(QUERY_ALL_MOVIES)
  const [fetchMovie, movieFound] = useLazyQuery(QUERY_FIND_MOVIE)


  return (
    <div className='container'>
      <h1>List of users</h1>
      <ul>
        {us.data && us.data.users.map((e) => {
          return <li key={e.name}>{e.name}</li>
        })}
      </ul>
      <br />

      <h1>List of Movies</h1>
      <ul>
        {mo.data && mo.data.movies.map((e) => {
          return <li key={e.name}>{e.name}</li>
        })}
      </ul>
      <br />
      <h1>Search for users:</h1>
      <input type='text' placeholder='Enter the movie name...' onChange={(e) => setSearchMovie(e.target.value)} />
      <button onClick={() => { fetchMovie({ variables: { name: searchMovie } }) }}>Search</button>
      <div>
        {movieFound.data && (
          <div>
            <h3>Name:{movieFound.data.movie.name}</h3>
            {console.log(movieFound.data)}
            <h3>Year Released:{movieFound.data.movie.realeaseYear}</h3>
          </div>
        )}
        {movieFound.error && (
          <div>
            <h3>No movies found!</h3>
          </div>
        )}
      </div>
    </div>

  )
}

export default DisplayData