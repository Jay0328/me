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
    flexDirection: 'column',
    '& aside': {
      display: 'flex',
      flexDirection: 'column'
    }
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

      categoryInput: '',
      categoryOptions: [],
      tagInput: '',
      tagOptions: [],
      imageName: ''
    };
  }

  componentDidMount() {
    this.fetchOptions('category')();
    this.fetchOptions('tag')();
  }

  onFieldChange = field => e => {
    this.setState({ [field]: e.target.value.trim() });
  }

  onDateChange = e => {
    const [year, month, day] = e.target.value.split('-');
    this.setState({ year, month, day });
  }

  onOptionChange = (mode, multiple) => e => {
    const { options } = e.target;
    const ret = [];
    for (let i = 0; i < options.length; i += 1) {
      const opt = options[i];
      if (opt.selected) {
        ret.push(opt.value);
      }
    }
    this.setState({ [mode]: multiple ? ret : ret[0] });
  }

  onSubmit = async e => {
    e.preventDefault();
    const canUpload = this.canUpload();
    const token = localStorage.getItem('token');
    const { categoryInput, categoryOptions, tagInput, tagOptions, imageName, ...body } = this.state;
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

  fetchOptions = mode => async () => {
    const url = mode === 'category' ? '/api/categories/names' : `/api/${mode}s/names`;
    try {
      const { body } = await request(url, { method: 'GET' });
      this.setState({ [`${mode}Options`]: body[`${mode}Names`] });
    }
    catch (err) {
      throw err;
    }
  }

  addOption = mode => e => {
    e.preventDefault();
    const optionName = `${mode}Options`;
    const inputName = `${mode}Input`;
    this.setState({
      [optionName]: [...this.state[optionName], this.state[inputName]],
      [inputName]: ''
    });
  }

  readFile = file => new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.readAsDataURL(file);
  })

  uploadImage = type => async e => {
    const file = e.target.files[0];
    if (file) {
      const url = await this.readFile(file);
      const { imageName } = this.state;
      const token = localStorage.getItem('token');
      const body = { type, imageName, url };
      try {
        await request('/api/images', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(body)
        });
      }
      catch (err) {
        throw err;
      }
    }
  }

  canUpload = () => {
    const { year, month, day, title, url, category, tags } = this.state;
    return !!(year && month && day && title && url && category && tags.length);
  }

  redirect = ({ year, month, day, url }) => this.props.dispatch(push(`/${year}/${month}/${day}/${url}/`))

  render() {
    const { classes } = this.props;
    const { content, categoryOptions, tagOptions } = this.state;
    const {
      onSubmit,
      onFieldChange,
      onDateChange,
      onOptionChange,
      addOption,
      uploadImage
    } = this;
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
              value={this.state.categoryInput}
              type="text"
              onChange={onFieldChange('categoryInput')}
            />
            <button onClick={addOption('category')}>新增category選項</button>
            <select
              defaultValue=''
              onChange={onOptionChange('category')}
            >
              <option value='' disabled>請選擇</option>
              {categoryOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </label>
          <label htmlFor="tags">
            標籤
            <input
              name="tags"
              value={this.state.tagInput}
              type="text"
              onChange={onFieldChange('tagInput')}
            />
            <button onClick={addOption('tag')}>新增tag選項</button>
            <select
              multiple
              onChange={onOptionChange('tag', true)}
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
          <aside>
            <label htmlFor="imageName">
              圖片名稱
              <input
                name="imageName"
                type="text"
                onChange={onFieldChange('imageName')}
              />
            </label>
            <label htmlFor="cover">
              封面上傳
              <input
                name="cover"
                type="file"
                accept="image/*"
                onChange={uploadImage('covers')}
              />
            </label>
            <label htmlFor="image">
              圖片上傳
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={uploadImage('images')}
              />
            </label>
          </aside>
        </form>
        <Markdown className={classes.preview} content={content} />
      </main>
    );
  }
}

export default PostArticle;
