import { md } from 'Theme/media';

export default {
  profile: {
    width: '220px',
    [`@media (max-width: ${md - 1}px)`]: {
      display: 'none'
    }
  }
};
