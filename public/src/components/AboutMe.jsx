import React from 'react';
import { pure } from 'recompose';

const AboutMe = () => {
  return (
    <div className="about-me">
      <img src="/images/profile.png" alt="me" />
      <h4>Taku</h4>
      <p>人生就是&nbsp;!#$(%^(@#^$*#@!$^&@$!(</p>
    </div>
  );
};

export default pure(AboutMe);
