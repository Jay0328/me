import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import md from './md';
import styles from './styles';

@injectSheet(styles)
class Markdown extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    className: PropTypes.string,
    content: PropTypes.string.isRequired,
  }

  static defaultProps = {
    className: ''
  }

  render() {
    const { classes, className, content } = this.props;
    return (
      <div
        className={`${className} ${classes.markdown}`.trim()}
        dangerouslySetInnerHTML={{
          __html: md.render(content)
        }}
      />
    );
  }
}

export default Markdown;
