module.exports = {
  right: {
    translate: percent => ({ x: -percent })
  },
  left: {
    translate: percent => ({ x: percent })
  },
  bottom: {
    translate: percent => ({ y: -percent })
  },
  top: {
    translate: percent => ({ y: -percent })
  },
};