import About from './About';
import Article from './Article';
import Category from './Category';
import Categories from './Categories';
import Home from './Home';
import Login from './Login';
import PostArticle from './PostArticle';
import Tags from './Tags';

export const routes = [
  {
    component: Home,
    path: '/'
  },
  {
    component: Home,
    path: '/page/:page/'
  },
  {
    component: About,
    path: '/about/'
  },
  {
    component: Tags,
    path: '/tags/:tag?/'
  },
  {
    component: Categories,
    path: '/categories/'
  },
  {
    component: Category,
    path: '/categories/:category/'
  },
  {
    component: Article,
    path: '/:year/:month/:day/:url/'
  }
];

export const redirectRoutes = [
  {
    component: Login,
    path: '/login/',
    redirect: (isAuthenticated) => isAuthenticated !== null ? isAuthenticated : null,
    redirectUrl: '/',
  },
  {
    component: PostArticle,
    path: '/admin/post-article/',
    redirect: (isAuthenticated) => isAuthenticated !== null ? !isAuthenticated : null,
    redirectUrl: '/login/',
  },
];
