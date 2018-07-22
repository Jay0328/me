import { navHeight } from './size';
import {
  xs,
  sm,
  md,
  lg
} from './media';

export default {
  padding: `${navHeight}px 15px 0 15px`,
  margin: '0 auto',
  width: '80vw',
  [`@media (max-width: ${xs - 1}px)`]: {
    width: '95vw'
  },
  [`@media (min-width: ${xs}px) and (max-width: ${sm - 1}px)`]: {
    width: '90vw'
  },
  [`@media (min-width: ${sm}px) and (max-width: ${md - 1}px)`]: {
    width: '85vw'
  },
  [`@media (min-width: ${md}px) and (max-width: ${lg - 1}px)`]: {
  }
};
