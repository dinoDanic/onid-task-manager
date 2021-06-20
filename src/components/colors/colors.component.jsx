import React from "react";

import "./colors.styles.scss";

function Colors({ returnColor }) {
  return (
    <div className="colors">
      <div
        className="colors__color color1"
        onClick={() => returnColor("#8f00ff")}
      ></div>
      <div
        className="colors__color color2"
        onClick={() => returnColor("#e2445c")}
      ></div>
      <div
        className="colors__color color3"
        onClick={() => returnColor("#40ca71")}
      ></div>
      <div
        className="colors__color color4"
        onClick={() => returnColor("#a358d0")}
      ></div>
      <div
        className="colors__color color5"
        onClick={() => returnColor("#2876c3")}
      ></div>
      <div
        className="colors__color color6"
        onClick={() => returnColor("#1c1f3b")}
      ></div>
      <div
        className="colors__color color7"
        onClick={() => returnColor("#fbcb00")}
      ></div>
      <div
        className="colors__color color8"
        onClick={() => returnColor("#379afe")}
      ></div>
      <div
        className="colors__color color9"
        onClick={() => returnColor("#f55f7b")}
      ></div>
      <div
        className="colors__color color10"
        onClick={() => returnColor("#267e4c")}
      ></div>
      <div
        className="colors__color color11"
        onClick={() => returnColor("#e1445c")}
      ></div>
      <div
        className="colors__color color12"
        onClick={() => returnColor("#f65bc4")}
      ></div>
    </div>
  );
}

export default Colors;
