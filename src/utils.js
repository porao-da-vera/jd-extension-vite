export const removeFromObject = (key, original) => {
  const { [key]: value, ...withoutKey } = original;
  return withoutKey;
};
