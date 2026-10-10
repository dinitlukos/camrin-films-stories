import React, { useEffect, useState,useRef,useCallback } from "react";
import { useParams } from "react-router-dom";
import { getStorage, ref, listAll, getDownloadURL, } from "firebase/storage";
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
// import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-video.css';


const CollectionPage = () => {
  const { storyId } = useParams();
  const [collectionData, setCollectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([])
  const storage = getStorage();

  const lightGallery = useRef(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCollectionData = async () => {
      setLoading(true);
      try {
        const listRef = ref(storage, `${storyId}/betrothal_eve/thumb`);
        const images = (await listAll(listRef)).items
        var item = []
        for(let i=0;i<images.length;i++){
          var gallaryObj = {}
          const tUrl = await getDownloadURL(images[i])
          const imgName = images[i].name
          gallaryObj["thumb"] = tUrl
          gallaryObj["size"] = '1400-933'
          gallaryObj["id"] = imgName.split(".")[0]
          const oRef = ref(storage, `${storyId}/betrothal_eve/${images[i].name}`)
          const oUrl = await getDownloadURL(oRef)
          gallaryObj["src"] = oUrl
          item.push(gallaryObj)
        }
        setItems(item)
      } catch (error) {
        console.error("Error fetching story data:", error);
        setCollectionData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionData();
  }, [storyId]);

  
  const onInit = useCallback((detail) => {
    if (detail) {
      lightGallery.current = detail.instance;
    }
  }, []);

  const getItems = useCallback(() => {
    return items.map((item) => {
      return (
        <a
          key={item.id}
          data-lg-size={item.size}
          className="gallery-item"
          data-src={item.src}
          style={{height:'350px'}}
        >
          <img
            style={{ maxWidth: '280px' }}
            className="img-responsive"
            src={item.thumb}
          />
        </a>
      );
    });
  }, [items]);

  // useEffect(() => {
  //   lightGallery.current.refresh();
  // }, [items]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (items.length == 0) {
    return <div>Story not found</div>;
  }

  return (
    <div>
      <LightGallery
        plugins={[lgVideo, lgZoom]}
        elementClassNames="custom-class-name"
        onInit={onInit}
      >
        {getItems()}
      </LightGallery>
    </div>
  );
};

export default CollectionPage;
