import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const stories = [
    { id: 'huma-vuzd', title: 'Story of Huma Vuzd' },
    { id: 'another-story', title: 'Another Story' },
  ];

  return (
    <div>
      <h1>Welcome to Camrin Films Stories</h1>
      <ul>
        {stories.map((story) => (
          <li key={story.id}>
            <Link to={`/${story.id}`}>{story.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;




