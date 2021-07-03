import React, { memo, useState, useEffect } from "react";
import CreatedBy from "../created-by/created-by.component";

const LoadModule = memo(({ moduleData }) => {
  const [createdBy, setCreatedBy] = useState(true);
  /* 
  useEffect(() => {
    let cbi = moduleData.findIndex((item) => item.name === "CreatedBy");
    setCreatedBy(moduleData[cbi].active);
  }, [moduleData]); */

  return <div>{createdBy && <CreatedBy />}</div>;
});

export default LoadModule;
