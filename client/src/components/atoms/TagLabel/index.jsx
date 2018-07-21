import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import styles from './styles';

@injectSheet(styles)
class TagLabel extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    tagName: PropTypes.string.isRequired,
  }

  render() {
    const { classes, tagName } = this.props;
    return (
      <Link
        className={classes.tagLabel}
        to={`/tags/${tagName.replace(' ', '')}/`}
      >
        {tagName}
      </Link>
    );
  }
}

export default TagLabel;
