import React from 'react';
import { pure } from 'recompose';
import { facebook, github } from '../../config';

const ContactInfo = () => {
  return (
    <div className="contact-info">
      <a
        className="contact-info-icon"
        target="_blank"
        rel="external nofollow noopener noreferrer"
        href={facebook}
      >
        <i className="fa fa-facebook-square" aria-hidden="true"></i>
      </a>
      <a
        className="contact-info-icon"
        target="_blank"
        rel="external nofollow noopener noreferrer"
        href={github}
      >
        <i className="fa fa-github" aria-hidden="true"></i>
      </a>
    </div>
  );
};

export default pure(ContactInfo);
