import React from 'react'

const GithubCard = ({avatar_url, name, location, bio, login, html_url}) => {
  return (
    // Card component
    <section className="card">
      <img
        src={avatar_url}
        alt="github avatar"
        className="card-img-top"
      />
      <section className="name card-text">
        {name}
        <a href={html_url} className="card-text">
          (@{login})
        </a>
      </section>
      <section className="location card-text">
        Located: {location}
      </section>
      <section className="bio card-text">Bio: {bio}</section>
    </section>
  )
}

export default GithubCard
