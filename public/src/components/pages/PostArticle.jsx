import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import request from '../../utils/api';
import Markdown from '../Markdown';
import container from '../theme/container';

const styles = {
  container: {
    ...container,
    display: 'flex'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  preview: {
    marginLeft: '40px',
    maxWidth: '40vw',
    height: '90vh',
    overflow: 'auto'
  }
};

@connect(null, dispatch => ({ dispatch }))
@injectSheet(styles)
class PostArticle extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    document.title = 'Post Article | Jay Blog';
    this.state = {
      year: '',
      month: '',
      day: '',
      title: '',
      url: '',
      category: '',
      tags: [],
      content: '',
      tagInput: '',
      tagOptions: []
    };
  }

  onFieldChange = field => e => {
    this.setState({
      [field]: e.target.value.trim()
    });
  }

  onDateChange = e => {
    const [year, month, day] = e.target.value.split('-');
    this.setState({
      year,
      month,
      day
    });
  }

  onOptionChange = e => {
    const { options } = e.target;
    const tags = [];
    for (let i = 0; i < options.length; i += 1) {
      const opt = options[i];
      if (opt.selected) {
        tags.push(opt.value);
      }
    }
    this.setState({ tags });
  }

  onSubmit = async e => {
    e.preventDefault();
    const canUpload = this.canUpload();
    const token = localStorage.getItem('token');
    const { tagInput, tagOptions, ...body } = this.state;
    if (canUpload && token) {
      try {
        const { ok } = await request('/api/articles/article', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(body)
        });
        if (ok) {
          this.redirect(body);
        }
      }
      catch (err) {
        throw err;
      }
    }
  }

  addOption = e => {
    e.preventDefault();
    this.setState({
      tagOptions: [...this.state.tagOptions, this.state.tagInput],
      tagInput: ''
    });
  }

  canUpload = () => {
    const { year, month, day, title, url, category, tags } = this.state;
    return (year && month && day && title && url && category && tags.length);
  }

  redirect = ({ year, month, day, url }) => {
    this.props.dispatch(push(`/${year}/${month}/${day}/${url}/`));
  }

  render() {
    const { classes } = this.props;
    const { content, tagOptions } = this.state;
    const { onSubmit, onFieldChange, onDateChange, onOptionChange, addOption } = this;
    return (
      <main className={classes.container}>
        <form className={classes.form}>
          <label htmlFor="title">
            標題
            <input
              name="title"
              type="text"
              onChange={onFieldChange('title')}
            />
          </label>
          <label htmlFor="url">
            文章網址
            <input
              name="url"
              type="text"
              onChange={onFieldChange('url')}
            />
          </label>
          <label htmlFor="category">
            分類
            <input
              name="category"
              type="text"
              onChange={onFieldChange('category')}
            />
          </label>
          <label htmlFor="tags">
            標籤
            <input
              name="tags"
              value={this.state.tagInput}
              type="text"
              onChange={onFieldChange('tagInput')}
            />
            <button
              onClick={addOption}
            >
              新增tag選項
            </button>
            <select
              multiple
              onChange={onOptionChange}
            >
              {tagOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </label>
          <label htmlFor="date">
            日期
            <input
              name="date"
              type="date"
              onChange={onDateChange}
            />
          </label>
          <textarea
            name="content"
            rows="20"
            onChange={onFieldChange('content')}
          />
          <button
            onClick={onSubmit}
          >
            發文囉
          </button>
        </form>
        <Markdown className={classes.preview} content={content} />
      </main>
    );
  }
}

export default PostArticle;
