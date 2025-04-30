import React from 'react'

type Props = {
  courseName: string
}

export default function Content({courseName}: Props) {
  return (
    <h1>{courseName}</h1>
  )
}