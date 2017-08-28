import React from 'react';
import PropTypes from 'prop-types';

class TagLabel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.scrollFrame = this.scrollFrame.bind(this);
    this.scrollToTag = this.scrollToTag.bind(this);

    const { mode, articleNum } = this.props;
    /* 1(187, 187, 238) to 10(41, 140, 180) */
    const labelColor = {
      r: articleNum < 10 ? Math.round(187 - (articleNum * 14.6)) : 41,
      g: articleNum < 10 ? Math.round(187 - (articleNum * 4.7)) : 140,
      b: articleNum < 10 ? Math.round(238 - (articleNum * 5.8)) : 180,
    };
    this.state = {
      labelStyle: mode !== 'cloud' ? null : {
        backgroundColor: `rgba(${labelColor.r}, ${labelColor.g}, ${labelColor.b}, 1)`,
      }
    };
  }

  scrollFrame(target) {
    const self = this;
    return () => {
      const body = document.body;
      const bodyElement = document.documentElement;
      if (body.scrollTop + 50 <= target && bodyElement.scrollTop + 50 <= target
        && (window.innerHeight + window.scrollY) < document.body.offsetHeight) {
        body.scrollTop += 50;
        bodyElement.scrollTop += 50;
        requestAnimationFrame(self.scrollFrame(target));
      }
      else {
        body.scrollTop = target;
        bodyElement.scrollTop = target;
      }
    };
  }

  scrollToTag(e) {
    e.preventDefault();
    const { tagName } = this.props;
    const tagOffsetTop = document.querySelector(`.tag-list#${tagName.replace(' ', '')}`).offsetTop;
    const navHeight = document.getElementsByTagName('nav')[0].offsetHeight;
    const target = tagOffsetTop - navHeight;
    this.scrollFrame(target)();
  }

  render() {
    const { mode, tagName, articleNum } = this.props;
    const { labelStyle } = this.state;
    return (
      <div className="tag-label" style={labelStyle} onClick={mode === 'cloud' ? this.scrollToTag : null}>
        {mode === 'label' && <i className="fa fa-tag" aria-hidden="true"></i>}
        {mode === 'cloud' ? `${tagName} (${articleNum})` : `${tagName}`}
      </div>
    );
  }
}

TagLabel.propTypes = {
  mode: PropTypes.string.isRequired,
  tagName: PropTypes.string.isRequired,
  articleNum: PropTypes.number
};

TagLabel.defaultProps = {
  articleNum: 0
};

export default TagLabel;
