import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Icon from 'Components/atoms/Icon';
import styles from './styles';
import contacts from './contacts';

@injectSheet(styles)
class ContactInfo extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  }

  render() {
    const { classes, ...props } = this.props;
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
              <Icon
                name={icon}
                {...props}
              />
            </a>
          ))
        }
      </div>
    );
  }
}

export default ContactInfo;
