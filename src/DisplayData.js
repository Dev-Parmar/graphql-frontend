import React from 'react'
import { useQuery, gql } from '@apollo/client'


const QUERY_ALL_USERS = gql`
query getAllUsers{
  users {
    id
    name
  }
}
`

function DisplayData() {

  const us = useQuery(QUERY_ALL_USERS)

  return (
    <div>
      {us.data && us.data.users.map((e) => {
        console.log(e.name)
        return <div><h1>{e.name}</h1></div>
      })
      }
    </div>
  )
}

export default DisplayData