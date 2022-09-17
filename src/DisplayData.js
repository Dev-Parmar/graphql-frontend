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

const QUERY_FIND_USER = gql`
query User($id:ID!){
  user(id:$id) {
    id
    name
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

  const [searchUser, setSearchUser] = useState("")

  const us = useQuery(QUERY_ALL_USERS)
  const mo = useQuery(QUERY_ALL_MOVIES)
  const [fetchUser, userFound] = useLazyQuery(QUERY_FIND_USER)


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
      <input type='text' placeholder='Enter the username...' onChange={(e) => setSearchUser(e.target.value)} />
      <button onClick={() => { fetchUser({ variables: { id: searchUser } }) }}>Search</button>
      <div>
        {userFound.data && (
          <div>
            <h3>Id: {userFound.data.user.id}</h3>
            <h3>Name:{userFound.data.user.name}</h3>
          </div>
        )}
      </div>
    </div>

  )
}

export default DisplayData