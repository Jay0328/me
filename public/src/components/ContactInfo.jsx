import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { facebook, github } from '../../config';
import { themeColor } from './theme/colors';

const contacts = [
  {
    url: facebook,
    icon: 'fab fa-facebook'
  },
  {
    url: github,
    icon: 'fab fa-github'
  }
];

const styles = {
  contactInfo: {
    width: '200px',
    textAlign: 'center'
  },
  icon: {
    color: props => props.color,
    fontSize: props => props.fontSize,
    margin: props => `0 ${props.fontSize / 2}px`,
    '&:hover': {
      color: themeColor
    }
  }
};

@injectSheet(styles)
class ContactInfo extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.contactInfo}>
        {
          contacts.map(({ url, icon }) => (
            <a
              key={url}
              className={classes.icon}
              target="_blank"
              rel="external nofollow noopener noreferrer"
              href={url}
            >
              <i className={icon} aria-hidden="true"></i>
            </a>
          ))
        }
      </div>
    );
  }
}

export default ContactInfo;
