export const saveLocal = (key, value) => {
  const dataString = JSON.stringify(value);
  localStorage.setItem(key, dataString);
};

export const getLocal = (key) => {
  return JSON.parse(localStorage.getItem(key));
};


export const unsetLocal = (key) => {
  return JSON.parse(localStorage.removeItem(key));
}