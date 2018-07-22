import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import Card from 'Atoms/Card';
import styles from './styles';

@injectSheet(styles)
class Category extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    categoryName: PropTypes.string.isRequired,
    categoryCover: PropTypes.string,
    articlesCount: PropTypes.number.isRequired
  }

  static defaultProps = {
    categoryCover: null,
  }

  render() {
    const {
      classes,
      categoryName,
      categoryCover,
      articlesCount
    } = this.props;
    return (
      <Link
        className={classes.link}
        to={`/categories/${categoryName}/`}
      >
        <Card className={classes.category}>
          <section
            className={classes.categoryCover}
            style={{
              backgroundImage: categoryCover
            }}
          >
            <span className={classes.categoryName}>
              {categoryName}
            </span>
          </section>
          <span className={classes.count}>
            {`共有${articlesCount}篇文章`}
          </span>
        </Card>
      </Link>
    );
  }
}

export default Category;
