import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { pure } from 'recompose';
import Header from './Header';
import Profile from './Profile';

const ArchivesMonth = pure(({ archives, month: archMonth }) => (
  <div className="archives-month">
    <h3>{archMonth}月</h3>
    <hr />
    <ul>
      {archives.map(({ year, month, day, title, url }) => (
        <li key={`/${year}/${month}/${day}/${url}/`} >
          <Link to={`/${year}/${month}/${day}/${url}/`}>
            {`${title} (${day}日)`}
          </Link>
        </li>
      ))}
    </ul>
  </div>
));

ArchivesMonth.propTypes = {
  archives: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  month: PropTypes.string.isRequired
};

const ArchivesYear = pure(({ archives, year }) => {
  return (
    <div className="archives-year">
      <h2>{year}</h2>
      {Object.keys(archives).map(month =>
        <ArchivesMonth key={month} archives={archives[month]} month={month} />
      )}
    </div>
  );
});

ArchivesYear.propTypes = {
  archives: PropTypes.shape().isRequired,
  year: PropTypes.string.isRequired
};

class Archives extends React.Component {
  constructor(props) {
    super(props);

    this.props.fetchArchives();
  }

  componentDidMount() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    document.title = 'Archives | Taku\'s blog';
  }

  render() {
    const { archives, totalArticlesCount } = this.props;

    return (
      <section className="archives">
        <Header mode="archives" />
        <div className="container">
          <Profile />
          <div className="archives-container">
            <div className="archives-total">
              {`全部文章 共 ${totalArticlesCount} 篇`}
            </div>
            <div className="archives-list">
              {Object.keys(archives).reverse().map(year =>
                <ArchivesYear key={year} archives={archives[year]} year={year} />
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Archives.propTypes = {
  archives: PropTypes.shape().isRequired,
  totalArticlesCount: PropTypes.number.isRequired,
  fetchArchives: PropTypes.func.isRequired
};

export default Archives;
