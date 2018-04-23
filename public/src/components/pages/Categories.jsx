import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import RoutePage from '../hoc/RoutePage';
import ConnectWithToJS from '../hoc/ConnectWithToJS';
import Card from '../Card';
import { sm } from '../theme/rwd';
import { themeColor, lightGrey } from '../theme/colors';
import { fetchCategoriesIfNeed } from '../../actions/categoriesActions';

const styles = {
  categories: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  },
  link: {
    textDecoration: 'none',
    width: '22%',
    [`@media (max-width: ${sm - 1}px)`]: {
      width: '45%'
    }
  },
  category: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '0px',
    '&:hover': {
      '& span': {
        color: themeColor
      }
    }
  },
  categoryCover: {
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    backgroundColor: lightGrey,
    width: '100%',
    height: '150px'
  },
  categoryName: {
    position: 'absolute',
    fontSize: '24px',
    color: 'white',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  count: {
    margin: '10px',
    color: 'black'
  }
};

const mapStateToProps = state => ({
  categories: state.getIn(['categories', 'categories'])
});

const mapDispatchToProps = dispatch => ({
  fetchData() {
    dispatch(fetchCategoriesIfNeed());
  }
});

@withRouter
@ConnectWithToJS(mapStateToProps, mapDispatchToProps)
@RoutePage({
  title: 'Categories'
})
@injectSheet(styles)
class Categories extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape()).isRequired
  }

  render() {
    const { classes, categories } = this.props;
    return (
      <main className={classes.categories}>
        {categories.map(({ categoryCover, categoryName, articlesCount }) => (
          <Link
            className={classes.link}
            key={categoryName}
            to={`/categories/${categoryName}/`}
          >
            <Card className={classes.category}>
              <section
                className={classes.categoryCover}
                style={{
                  backgroundImage: categoryCover
                }}
              >
                <span className={classes.categoryName}>{categoryName}</span>
              </section>
              <span className={classes.count}>共有{articlesCount}篇文章</span>
            </Card>
          </Link>
        ))}
      </main>
    );
  }
}

export default Categories;

