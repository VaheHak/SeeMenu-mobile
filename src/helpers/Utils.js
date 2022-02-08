class Utils {
  static isMobile(mobileMaxWidth = 560) {
    return (window.innerWidth || 1024) <= mobileMaxWidth;
  }
}

export default Utils;
