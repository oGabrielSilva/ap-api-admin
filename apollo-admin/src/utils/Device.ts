class Device {
  public static isMobile() {
    return window.innerWidth < 720
  }

  private constructor() {}
}

export default Device
