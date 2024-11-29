import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StoryPage = () => {
  const { storyId } = useParams();
  const [storyData, setStoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoryData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.premagic.com/view/savethedate/camrinfilms/${storyId}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        const data = await response.json();
        setStoryData(data);
        console.log("DATA", data);
      } catch (error) {
        console.error("Error fetching story data:", error);
        setStoryData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStoryData();
  }, [storyId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!storyData) {
    return <div>Story not found</div>;
  }

  return (
    <div>
      <h1>{storyData.title}</h1>
      <p>{storyData.content}</p>
    </div>
  );
};

export default StoryPage;
