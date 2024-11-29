import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import "./StoryPage.css";
import moment from "moment";
import logo from "../assets/logo.png";

const StoryPage = () => {
  const { storyId } = useParams();
  const [storyData, setStoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoryData = async () => {
      setLoading(true);
      try {
        console.log(storyId);
        const docSnap = await getDoc(doc(db, "stories", storyId));
        if (docSnap.exists()) {
          console.log(docSnap.data());

          setStoryData(docSnap.data());
        } else {
          console.log("No stories found");
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

  var duration = moment.duration(
    moment().diff(storyData?.wedding?.date?.seconds)
  );
  var days = duration.asDays().toFixed(0);

  return (
    <div className="wedding-invitation">
      <div className="header-invitation-wrapper">
        <div className="header-wrapper">
          <header className="header">
            <h2>{moment(storyData?.wedding?.date?.seconds).format("dddd")}</h2>
            <h1>
              {moment(storyData?.wedding?.date?.seconds).format("DD MMMM yyyy")}
            </h1>
            <p>{moment(storyData?.wedding?.date?.seconds).format("hh:mm a")}</p>
            <h3>{days} DAYS AGO</h3>
          </header>

          <div className="invitation-content">
            <h3>{storyData?.groom?.name}</h3>
            <p>
              {`s/o Mr. ${storyData?.groom?.father} & Mrs. ${storyData?.groom?.mother}`}
            </p>
            <h3>&</h3>
            <h3>{storyData?.bride?.name}</h3>
            <p>
              {`d/o Mr. ${storyData?.bride?.father} & Mrs. ${storyData?.bride?.mother}`}
            </p>
            <p className="guest-contact">
              Guest contact: <b>{storyData?.guest_contact}</b>
            </p>
          </div>
        </div>
        <div className="image-wrapper">
          <img
            width={"100%"}
            alt=""
            src="https://images.premagic.com/DBX7QtIs9ptLEsrsOJ5qDa3o92w%3D%2Ffit-in%2F860x0%2Ffilters%3Aquality%2870%29%3Asharpen%28-0.2%29%3Astrip_icc%28%29%3Astrip_exif%28%29%2FmJIDv4VSj0Uu0qbE-7rj7utL55Ag-b%27WDk3UFZ3N2twSkotYWJlbnBuUkdfaDVpTnFVPS1maXQtaW4tMTI4MHgwLWZpbHRlcnMtcXVhbGl0eSg3MCktc2hhcnBlbigtMC4yKS1zdHJpcF9pY2MoKS1zdHJpcF9leGlmKCktbUpJRHY0VlNqMFV1MHFiRS1Vbks3RDc1MnoyZy1iJ1kyaGhibVJwYm1rdWFuQm4nLmpwZy53ZWJw%27.webp"
          />
        </div>
      </div>

      <div className="details">
        <h3>
          {moment(storyData?.wedding?.date?.seconds).format("DD ddd MMM")}
        </h3>
        <p>
          Wedding <br />
          10:00 am - 2:00 pm <br />
          {storyData?.wedding?.location} <br />
          {storyData?.wedding?.notes}
        </p>
      </div>

      <div className="footer-note">
        <div className="scrollable-container">
          {storyData?.wishes?.map((card, index) => (
            <div className="card" key={index}>
              <h3>{card.name}</h3>
              <p>{card.message}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <div className="add-to-calendar-wrapper">
          <span className="add-to-calendar">Add to calendar</span>
        </div>
        <div className="logo-wrapper">
          <div className="footer-left">
            <img src={logo} alt="Camrin Films Logo" className="footer-logo" />
          </div>
          <div className="footer-right">
            <span className="powered-by">
              Powered By <strong>PREMAGIC</strong>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StoryPage;
