module.exports = {
  right: {
    translate: left => ({ x: -left })
  },
  left: {
    translate: right => ({ x: -right })
  },
  bottom: {
    translate: top => ({ x: -top })
  },
  top: {
    translate: bottom => ({ x: -bottom })
  },
};