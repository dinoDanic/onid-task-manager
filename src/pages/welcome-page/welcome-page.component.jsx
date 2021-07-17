import React, { useRef, useEffect, useState } from "react";

import SignIn from "../sing-in/sign-in.component.class";

import Parallax from "parallax-js";
import layer1 from "../../img/parallax/layer1.svg";
import layer2 from "../../img/parallax/layer2.svg";
import layer3 from "../../img/parallax/layer3.svg";
import layer4 from "../../img/parallax/layer4.svg";
import rocket from "../../img/parallax/rocket.svg";

import "./welcome-page.styles.scss";

import RetroButton from "../../components/retro/button/retro-button.component";
import BoxLayer from "../../components/retro/box-layer/box-layer.component";

const WelcomePage = () => {
  const sceneEl = useRef(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const parallaxInstance = new Parallax(sceneEl.current, {
      relativeInput: true,
    });

    parallaxInstance.enable();

    return () => parallaxInstance.disable();
  }, []);
  return (
    <div className="welcomePage">
      <ul id="scene" ref={sceneEl}>
        <li className="layer layer4" data-depth="0.05">
          <img src={layer4} alt="" />
        </li>
        <li className="layer layer-rocket" data-depth="0.25">
          <img src={rocket} alt="" />
        </li>

        <li className="layer layer3" data-depth="0.1">
          <img src={layer3} alt="" />
        </li>
        <li className="layer layer2" data-depth="0.15">
          <img src={layer2} alt="" />
        </li>

        <li className="layer layer1" data-depth="0.2">
          <img src={layer1} alt="" />
        </li>
        <li className="layer-startUp-li" data-depth="0.25">
          <div className="layer-startUp-container">
            <div className="layer-startUp">
              <h1>onid</h1>
              <h4>Task manager done bad</h4>
              <RetroButton onClick={() => setShowLogin(!showLogin)}>
                Login or Register
              </RetroButton>
            </div>
          </div>
        </li>
      </ul>
      {showLogin && (
        <BoxLayer setLayer={setShowLogin}>
          <SignIn />
        </BoxLayer>
      )}
    </div>
  );
};

export default WelcomePage;
