import React, { useEffect } from 'react'
import { redirect } from 'react-router-dom'
import { useGetPastriesQuery } from '../features/pastry'

const Pastry = () => {
  const { data, error, isLoading } = useGetPastriesQuery()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h2>Pastries</h2>
      {data && data.map((pastry) => (
        <div key={pastry.id}>
          <h3>{pastry.name}</h3>
          <p>{pastry.description}</p>
          <p>Price: {pastry.price}€</p>
        </div>
      ))}
    </div>
  )
}

export default Pastry;
