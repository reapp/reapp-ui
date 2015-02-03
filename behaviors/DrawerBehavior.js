module.exports = {
  right: {
    translate: pct => ({ x: pct })
  },
  left: {
    translate: pct => ({ x: -pct })
  },
  bottom: {
    translate: pct => ({ y: -pct })
  },
  top: {
    translate: pct => ({ y: pct })
  },
};