import { md } from 'Theme/media';

export default {
  home: {
    display: 'flex'
  },
  list: {
    width: '100%',
    [`@media (min-width: ${md}px)`]: {
      marginRight: '50px'
    }
  }
};
