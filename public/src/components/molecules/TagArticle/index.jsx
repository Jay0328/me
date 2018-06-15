import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import Icon from 'Components/atoms/Icon';
import { themeColor } from 'Theme/colors';
import styles from './styles';

@injectSheet(styles)
class TagArticle extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    tagName: PropTypes.string.isRequired,
    articles: PropTypes.arrayOf(PropTypes.shape()).isRequired
  }

  render() {
    const { classes, tagName, articles } = this.props;
    return (
      <section>
        <span className={classes.listName}>
          <Icon
            name="fa fa-tag"
            fontSize={20}
            color={themeColor}
            margin="0 10px 0 0"
          />
          {tagName}
        </span>
        {articles.map(({ year, month, day, title, url }) => (
          <main
            className={classes.article}
            key={`/${year}/${month}/${day}/${url}`}
          >
            <Link
              className={classes.link}
              to={`/${year}/${month}/${day}/${url}/`}
            >
              <h3>{title}</h3>
            </Link>
            <hr />
          </main>
        ))}
      </section>
    );
  }
}

export default TagArticle;
