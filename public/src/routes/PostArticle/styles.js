import container from 'Theme/container';

export default {
  container: {
    ...container,
    display: 'flex'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& aside': {
      display: 'flex',
      flexDirection: 'column'
    }
  },
  imageUpload: {
    width: 'fit-content',
    border: '1px solid #ccc',
    padding: '6px 12px',
    cursor: 'pointer',
    '& input[type="file"]': {
      display: 'none'
    }
  },
  preview: {
    marginLeft: '40px',
    maxWidth: '40vw',
    height: '90vh',
    overflow: 'auto'
  }
};
