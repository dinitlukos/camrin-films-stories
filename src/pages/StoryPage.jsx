import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {db} from "../firebase"
import { addDoc, collection, doc, getDoc } from "firebase/firestore";

const StoryPage = () => {
  const { storyId } = useParams();
  const [storyData, setStoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoryData = async () => {
      setLoading(true);
      try {
        console.log(storyId)
         const docSnap = await getDoc(doc(db,"stories",storyId))
         if(docSnap.exists()){
          console.log(docSnap.data())

        setStoryData(docSnap.data());

         }
         else{
          console.log("No stories found")
         }
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
      <h1>{storyData.groom.name}</h1>
      <p>{storyData.groom.father}</p>
    </div>
  );
};

export default StoryPage;
