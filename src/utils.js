export const removeFromObject = (key, original) => {
  const { [key]: value, ...withoutKey } = original;
  return withoutKey;
};

export const asyncLocalStorage = {
  setItem: function (key, value) {
      return Promise.resolve().then(function () {
          localStorage.setItem(key, value);
      });
  },
  getItem: function (key) {
      return Promise.resolve().then(function () {
          return localStorage.getItem(key);
      });
  }
};