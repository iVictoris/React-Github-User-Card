import React from "react";

const GithubCard = ({ avatar_url, name, location, bio, login, html_url }) => {
  return (
    // Card component
    <section className="card">
      <img src={avatar_url} alt="github avatar" className="card-img-top" />
      <section className="name card-text">
        {name ? (
          `${name}` && (
            <>
              <a href={html_url} className="card-text">
                (@{login})
              </a>
            </>
          )
        ) : (
          <a href={html_url} className="card-text">
            {login}
          </a>
        )}
        {name}
      </section>
      <section className="location card-text">
        {location ? `Located: ${location}` : null}
      </section>
      <section className="bio card-text">{bio ? `Bio: ${bio}` : null}</section>
    </section>
  );
};

export default GithubCard;
