import React from 'react'
import GithubCard from './GithubCard';

const GithubCards = ({followers = []}) => {
  const cards = followers.length > 0 ? followers.map(({avatar_url, name, location, bio, login, html_url, id}) => {
    const props = {
      avatar_url, 
      name, 
      location, 
      bio, 
      login, 
      html_url
    }
    return <GithubCard key={id} {...props} />
  }): null
  return (
    <section className='github-cards'>
      {followers.length > 0 && <h3>Followers</h3>}
      <section className='list-horizontal'>
      {cards}
      </section>
    </section>
  )
}

export default GithubCards
