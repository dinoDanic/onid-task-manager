import React, { memo } from "react";

import Avatar from "../../retro/avatar/avatar.component";

const CreatedBy = () => {
  return (
    <div className="createdBy">
      <Avatar src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" />
      by
    </div>
  );
};

export default CreatedBy;
