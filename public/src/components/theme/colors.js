export const themeColor = '#296EB4';
export const grey = '#404040';
export const lightGrey = '#777';
export const moreLightGrey = '#BEBEBE';
export const opacityColor = (color, opacity) => {
  const c = color.split('#')[1];
  const r = parseInt(c.substr(0, 2), 16);
  const g = parseInt(c.substr(2, 2), 16);
  const b = parseInt(c.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
