import React, { useRef, useEffect } from "react";

import SignIn from "../sing-in/sign-in.component.class";

import Parallax from "parallax-js";
import layer1 from "../../img/parallax/layer1.svg";
import layer2 from "../../img/parallax/layer2.svg";
import layer3 from "../../img/parallax/layer3.svg";
import layer4 from "../../img/parallax/layer4.svg";
import rocket from "../../img/parallax/rocket.svg";

import "./welcome-page.styles.scss";

const WelcomePage = () => {
  const sceneEl = useRef(null);

  useEffect(() => {
    const parallaxInstance = new Parallax(sceneEl.current, {
      relativeInput: true,
      hoverOnly: true,
    });

    parallaxInstance.enable();

    return () => parallaxInstance.disable();
  }, []);
  return (
    <div className="welcomePage">
      <div className="wp__startUp">
        <div className="wp__startUp-content">
          {/* <div className="wp__startUp-items">
            <h1>Start Up</h1>
            <h4>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </h4>
          </div> */}
          <SignIn />
        </div>
      </div>
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
      </ul>
    </div>
  );
};

export default WelcomePage;
