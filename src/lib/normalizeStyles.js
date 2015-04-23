import normalizer from 'react-style-normalizer';

export function normalizeAll(styles) {
  var normalizedStyles = {};

  Object.keys(styles).forEach(key => {
    normalizedStyles[key] = Array.isArray(styles[key]) ?
      styles[key].map(normalizer) :
      normalizer(styles[key]);
  });

  return normalizedStyles;
}

export function normalize(style) {
  return normalizer(style);
}