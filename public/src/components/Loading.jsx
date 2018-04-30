import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { headerHeight } from './theme/size';
//  import { themeColor, opacityColor } from './theme/colors';

const styles = {
  '@global': {
    '@keyframes sequence1': {
      '0%': { height: '10px' },
      '50%': { height: '50px' },
      '100%': { height: '10px' }
    },
    '@keyframes sequence2': {
      '0%': { height: '20px' },
      '50%': { height: '65px' },
      '100%': { height: '20px' }
    }
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    width: '90px',
    height: `calc(100vh - ${headerHeight}px)`,
    margin: 'auto',
    '& ul': {
      margin: '0',
      listStyle: 'none',
      width: '90px',
      position: 'relative',
      padding: '0',
      height: '10px',
      '& li': {
        position: 'absolute',
        width: '2px',
        height: '0',
        backgroundColor: '#000',
        bottom: '0',
        '&:nth-child(1)': {
          left: '0',
          animation: 'sequence1 1s ease infinite 0'
        },
        '&:nth-child(2)': {
          left: '15px',
          animation: 'sequence1 1s ease infinite 0.1s'
        },
        '&:nth-child(3)': {
          left: '30px',
          animation: 'sequence1 1s ease-in-out infinite 0.2s'
        },
        '&:nth-child(4)': {
          left: '45px',
          animation: 'sequence1 1s ease-in infinite 0.3s'
        },
        '&:nth-child(5)': {
          left: '60px',
          animation: 'sequence1 1s ease-in-out infinite 0.4s'
        },
        '&:nth-child(6)': {
          left: '75px',
          animation: 'sequence1 1s ease infinite 0.5s'
        }
      }
    }
  }
};

@injectSheet(styles)
class Loading extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.loading}>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    );
  }
}

export default Loading;
