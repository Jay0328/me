export default ({ size: { md } }) => ({
  profile: {
    width: '220px',
    [`@media (max-width: ${md - 1}px)`]: {
      display: 'none'
    }
  }
});
