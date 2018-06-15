export default ({ size: { md } }) => ({
  home: {
    display: 'flex'
  },
  list: {
    width: '100%',
    [`@media (min-width: ${md}px)`]: {
      marginRight: '50px'
    }
  }
});
