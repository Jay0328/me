import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    const page = this.props.match.params.page ? parseInt(this.props.match.params.page, 10) : 1;
    this.props.fetchArticlesList(page);

    this.renderPageMenu = this.renderPageMenu.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (this.props.match.params.page !== nextProps.match.params.page) {
      this.props.fetchArticlesList(parseInt(nextProps.match.params.page, 10));
    }
  }

  renderPageMenu() {
    let menu = [];
    const { page, totalPage } = this.props;
    let menuStart = page - 2;
    let menuEnd;
    while (menuStart < 1) menuStart += 1;
    menuEnd = menuStart + 4;
    while (menuEnd > totalPage) {
      menuEnd -= 1;
      if (menuStart > 1) menuStart -= 1;
    }
    /* prev */
    if (page > 1) {
      menu = [
        ...menu,
        <Link to={page > 2 ? `/page/${page - 1}` : '/'} key={`link-page-${page - 1}`}>&#x21E6;</Link>
      ];
    }
    if (menuStart > 1) {
      menu = [
        ...menu,
        <Link to='/' key='link-page-1'>1</Link>,
        <div key='page-divider-left'>...</div>
      ];
    }
    /* page menu */
    menu = [
      ...menu,
      Array.from({ length: (menuEnd - menuStart) + 1 }, (v, k) => k + menuStart)
        .map(p => {
          if (p === page) return <div key={`link-page-${p}`}>{p}</div>;
          return <Link to={p !== 1 ? `/page/${p}` : '/'} key={`link-page-${p}`}>{p}</Link>;
        })
    ];
    /* next */
    if (menuEnd < totalPage) {
      menu = [
        ...menu,
        <div key='page-divider-right'>...</div>,
        <Link to={`/page/${totalPage}`} key={`link-page-${totalPage}`}>{totalPage}</Link>
      ];
    }
    if (page < totalPage) {
      menu = [...menu, <Link to={`/page/${page + 1}`} key={`link-page-${page + 1}`}>&#x21E8;</Link>];
    }
    return <div>{menu}</div>;
  }

  render() {
    const { articlesList, articleOnClick } = this.props;
    return (
      <div>
        <div>
          {articlesList.map(article => {
            const { year, month, day, title } = article;
            return (
              <div onClick={articleOnClick(year, month, day, title)} key={`${year}-${month}-${day}-${title}`}>
                {year}-{month}-{day} : {title}
              </div>
            );
          })}
        </div>
        {this.renderPageMenu()}
      </div>
    );
  }
}

Home.propTypes = {
  match: PropTypes.shape().isRequired,
  fetchArticlesList: PropTypes.func.isRequired,
  articleOnClick: PropTypes.func.isRequired,
  articlesList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  page: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired
};

Home.defaultProps = {
};

export default Home;
