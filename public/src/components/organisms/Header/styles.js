import { headerHeight } from 'Theme/size';
import { sm } from 'Theme/media';

export default {
  header: {
    position: 'relative'
  },
  img: {
    backgroundSize: `100vw ${headerHeight}px`,
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    width: 'inherit',
    height: `${headerHeight}px`,
    maxWidth: '100%',
    margin: '0 auto',
    [`@media (max-width: ${sm - 1}px)`]: {
      backgroundSize: '100vw 100vh',
      height: '100vh'
    }
  },
  content: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100%',
    top: '0'
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  title: {
    fontSize: '55px',
    color: 'white',
    textAlign: 'center'
  },
  date: {
    fontSize: '18px',
    color: 'white'
  }
};
