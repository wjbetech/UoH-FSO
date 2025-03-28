import React, { useState } from 'react'
import { gql, useMutation } from "@apollo/client"

const ALL_PERSONS = gql`
  query  {
    allPersons  {
      name
      phone
      id
    }
  }
`

const CREATE_PERSON = gql`
  mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
    addPerson(
      name: $name,
      street: $street,
      city: $city,
      phone: $phone
    ) {
      name
      phone
      id
      address {
        street
        city
      }  
    }
  }
`

const PersonForm = (props) => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")

  const [ createPerson ] = useMutation(CREATE_PERSON, {
    refetchQueries: [ { query: ALL_PERSONS } ]
  }) 

  const handleSubmit = (event) => {
    event.preventDefault()

    createPerson({
      variables: {
        name,
        phone,
        street,
        city
      }
    })

    setName("");
    setPhone("");
    setStreet("");
    setCity("");
  }

  return (
    <div>
      <h2>New Contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input type="text" value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          Phone: <input type="text" value={phone} onChange={({ target }) => setPhone(target.value)} />
        </div>
        <div>
          Street: <input type="text" value={street} onChange={({ target }) => setStreet(target.value)} />
        </div>
        <div>
          City: <input type="text" value={city} onChange={({ target }) => setCity(target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default PersonForm;