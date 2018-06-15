export default ({ size: { navHeight } }) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    paddingTop: navHeight
  }
});
