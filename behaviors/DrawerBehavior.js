module.exports = {
  right: {
    translate: right => ({ x: -right })
  },
  left: {
    translate: left => ({ x: -left })
  },
  bottom: {
    translate: top => ({ x: -top })
  },
  top: {
    translate: bottom => ({ x: -bottom })
  },
};