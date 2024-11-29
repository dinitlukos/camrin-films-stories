import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const stories = [
    { id: "huma-vuzd", title: "Story of Huma Vuzd" },
    { id: "another-story", title: "Another Story" },
  ];

  return (
    <div>
      <h1>Welcome to Camrin Films Stories</h1>
      <ul>
        {stories.map((story) => (
          <li key={story.id}>
            <div className="route-container">
              <Link to={`/solo/${story.id}`}>{`${story.title} Greetings`}</Link>
              <Link
                to={`/collection/${story.id}`}
              >{`${story.title} Collections`}</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
