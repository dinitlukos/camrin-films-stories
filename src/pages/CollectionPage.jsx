import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CollectionPage = () => {
  const { storyId } = useParams();
  const [collectionData, setCollectionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollectionData = async () => {
      setLoading(true);
      try {
        // const response = await fetch(
        //   `https://api.premagic.com/view/savethedate/camrinfilms/${storyId}`,
        //   {
        //     headers: {
        //       Accept: "application/json",
        //       "Content-Type": "application/json",
        //       "Access-Control-Allow-Origin": "*",
        //     },
        //   }
        // );
        // const data = await response.json();
        // setCollectionData(data);
        // console.log("DATA", data);
      } catch (error) {
        console.error("Error fetching story data:", error);
        setCollectionData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionData();
  }, [storyId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!collectionData) {
    return <div>Story not found</div>;
  }

  return (
    <div>
      <h1>{collectionData.title}</h1>
      <p>{collectionData.content}</p>
    </div>
  );
};

export default CollectionPage;
