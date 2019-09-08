import React from 'react';

const Imprint = ({ close, src, visible }) => {
  return (
    <div className={"clip" + (visible ? " visible" : "")} onClick={close}>
      <iframe
        src={src}
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default Imprint;