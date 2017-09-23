import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { pure } from 'recompose';
import Header from './Header';
import Profile from './Profile';

const ArchiveMonth = pure(({ archive, month: archMonth }) => (
  <div className="archive-month">
    <h3>{archMonth}月</h3>
    <hr />
    <ul>
      {archive.map(({ year, month, day, title, url }) => (
        <li key={`/${year}/${month}/${day}/${url}/`} >
          <Link to={`/${year}/${month}/${day}/${url}/`}>
            {`${year}-${month}-${day}-${title}`}
          </Link>
        </li>
      ))}
    </ul>
  </div>
));

ArchiveMonth.propTypes = {
  archive: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  month: PropTypes.string.isRequired
};

const ArchiveYear = pure(({ archive, year }) => {
  return (
    <div className="archive-year">
      <h2>{year}</h2>
      {Object.keys(archive).map(month =>
        <ArchiveMonth key={month} archive={archive[month]} month={month} />
      )}
    </div>
  );
});

ArchiveYear.propTypes = {
  archive: PropTypes.shape().isRequired,
  year: PropTypes.string.isRequired
};

class Archive extends React.Component {
  constructor(props) {
    super(props);

    this.props.fetchArchive();
  }

  componentDidMount() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    document.title = 'Archive | Taku\'s blog';
  }

  render() {
    const { archive, totalArticlesCount } = this.props;

    return (
      <section className="archive">
        <Header mode="archive" />
        <div className="container">
          <Profile />
          <div className="archive-container">
            <div className="archive-total">
              {`全部文章 共 ${totalArticlesCount} 篇`}
            </div>
            <div className="archive-list">
              {Object.keys(archive).reverse().map(year =>
                <ArchiveYear key={year} archive={archive[year]} year={year} />
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Archive.propTypes = {
  archive: PropTypes.shape().isRequired,
  totalArticlesCount: PropTypes.number.isRequired,
  fetchArchive: PropTypes.func.isRequired
};

export default Archive;
