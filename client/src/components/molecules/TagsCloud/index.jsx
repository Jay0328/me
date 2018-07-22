import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import injectSheet from 'react-jss';
import TagLabel from 'Atoms/TagLabel';
import { themeColor } from 'Theme/colors';
import styles from './styles';

@injectSheet(styles)
class TagsCloud extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    className: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.shape()).isRequired
  }

  static defaultProps = {
    className: ''
  }

  render() {
    const { classes, className, tags } = this.props;
    return (
      <main className={cx(className, classes.cloud)}>
        {tags.map(({ tagName, articles }) => (
          <TagLabel
            key={tagName}
            tagName={tagName}
            hoverBackgroundColor={themeColor}
            articleNum={articles.length}
          />
        ))}
      </main>
    );
  }
}

export default TagsCloud;
