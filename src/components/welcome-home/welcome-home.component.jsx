import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./welcome-home.styles.scss";

const WelcomeHome = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { userName, assignedTasks } = currentUser;
  const [timeOfDay, setTimeOfDay] = useState(null);

  /* const name = userName.split(" ")[0]; */ // ne radi za ime jednog rijeci

  const name = userName;
  let time = new Date();

  useEffect(() => {
    let h = time.getHours();
    console.log(h);

    if (h >= 0 && h <= 12) {
      setTimeOfDay("Good morning");
    }
    if (h > 12 && h <= 18) {
      setTimeOfDay("Good afternoon");
    }
    if (h > 18 && h <= 24) {
      setTimeOfDay("Good evening");
    }
  }, [time]);
  return (
    <div className="welcomeHome">
      <h3>
        {timeOfDay}, {name}! <span>👋</span>
      </h3>
      {assignedTasks.length === 0 && (
        <p>You have nothing for today, take a nap!</p>
      )}
    </div>
  );
};

export default WelcomeHome;
