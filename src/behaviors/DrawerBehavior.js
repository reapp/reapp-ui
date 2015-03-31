module.exports = {
  right: {
    translate: pct => ({ x: pct })
  },
  left: {
    translate: pct => ({ x: -pct })
  },
  top: {
    translate: pct => ({ y: -pct })
  },
  bottom: {
    translate: pct => ({ y: pct })
  },
};