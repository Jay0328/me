import { themeColor } from 'Theme/colors';

export default {
  icon: {
    color: ({ color = themeColor }) => color,
    fontSize: ({ size = 16 }) => size,
    margin: ({ margin, size = 16 }) => margin || `0 ${size / 2}px`,
    '&:hover': {
      color: themeColor
    }
  }
};
