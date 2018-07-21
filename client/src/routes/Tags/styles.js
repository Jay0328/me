import { xs, sm, md, lg } from 'Theme/media';

export default {
  tags: {
    margin: '0 auto',
    width: '60%',
    [`@media (max-width: ${xs - 1}px)`]: {
      width: '100%'
    },
    [`@media (min-width: ${xs}px) and (max-width: ${sm - 1}px)`]: {
      width: '90%'
    },
    [`@media (min-width: ${sm}px) and (max-width: ${md - 1}px)`]: {
      width: '80%'
    },
    [`@media (min-width: ${md}px) and (max-width: ${lg - 1}px)`]: {
      width: '70%'
    }
  }
};
