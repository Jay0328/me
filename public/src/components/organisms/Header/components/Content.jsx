import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import ConnectWithToJS from 'Layouts/ConnectWithToJS';
import TagLabel from 'Components/atoms/TagLabel';
import styles from '../styles';

const mapStateToProps = state => ({
  isFetching: state.getIn(['UI', 'isFetching']),
  date: state.getIn(['article', 'date']),
  title: state.getIn(['article', 'title']),
  tags: state.getIn(['article', 'tags'])
});

@ConnectWithToJS(mapStateToProps)
@injectSheet(styles)
class HeaderContent extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    mode: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape()).isRequired
  }

  render() {
    const { classes, mode, isFetching, date, title, tags } = this.props;
    let headerTitle;
    if (mode === 'home') {
      headerTitle = 'Jay Blog';
    }
    else if (mode === 'article') {
      headerTitle = title;
    }
    else {
      headerTitle = `${mode.substr(0, 1).toUpperCase()}${mode.substr(1)}`;
    }
    return (
      <section className={classes.content}>
        <section className={classes.tags}>
          {mode === 'article' && !isFetching ? tags.map(({ tagName }) => (
            <TagLabel
              key={tagName}
              tagName={tagName}
              backgroundColor="transparent"
              hoverBackgroundColor="rgba(255, 255, 255, .4)"
              borderColor="white"
            />
          )) : null}
        </section>
        {mode !== 'article' || !isFetching ? <h1 className={classes.title}>{headerTitle}</h1> : null}
        {mode === 'article' && !isFetching ? <span className={classes.date}>{date}</span> : null}
      </section>
    );
  }
}

export default HeaderContent;
