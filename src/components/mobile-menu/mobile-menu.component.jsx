import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import "./mobile-menu.styles.scss";

import {
  faBars,
  faChevronLeft,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RetroButton from "../retro/button/retro-button.component";

const MobileMenu = () => {
  const [homePage, setHomePage] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setHomePage(true);
    } else {
      setHomePage(false);
    }
  }, [location]);
  return (
    <div className="mobileMenu">
      {homePage && (
        <RetroButton onClick={() => history.goBack()}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </RetroButton>
      )}
      <RetroButton onClick={() => history.push("/")}>
        <FontAwesomeIcon icon={faHome} />
      </RetroButton>
    </div>
  );
};

export default MobileMenu;
