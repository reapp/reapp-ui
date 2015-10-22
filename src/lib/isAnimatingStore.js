let status = {};

export default function animationStatus(name, isAnimating) {
  if (!name)
    throw new Error('must provide animation name');

  if (typeof isAnimating !== 'undefined')
    status[name] = isAnimating;
  else
    return status[name];
};