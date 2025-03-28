export const getBrowserInfo = () => {
  if (typeof window === "undefined") {
    return {
      browser: "Unknown",
      browserVersion: "Unknown",
      os: "Unknown",
      device: "Unknown",
    }
  }

  const userAgent = window.navigator.userAgent

  // Detect browser
  let browser = "Unknown"
  let browserVersion = "Unknown"

  if (userAgent.indexOf("Firefox") > -1) {
    browser = "Firefox"
    browserVersion = userAgent.match(/Firefox\/([0-9.]+)/)?.[1] || "Unknown"
  } else if (userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Edg") === -1 && userAgent.indexOf("OPR") === -1) {
    browser = "Chrome"
    browserVersion = userAgent.match(/Chrome\/([0-9.]+)/)?.[1] || "Unknown"
  } else if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1) {
    browser = "Safari"
    browserVersion = userAgent.match(/Version\/([0-9.]+)/)?.[1] || "Unknown"
  } else if (userAgent.indexOf("Edg") > -1) {
    browser = "Edge"
    browserVersion = userAgent.match(/Edg\/([0-9.]+)/)?.[1] || "Unknown"
  } else if (userAgent.indexOf("OPR") > -1 || userAgent.indexOf("Opera") > -1) {
    browser = "Opera"
    browserVersion = userAgent.match(/(?:OPR|Opera)\/([0-9.]+)/)?.[1] || "Unknown"
  }

  // Detect OS
  let os = "Unknown"

  if (userAgent.indexOf("Windows") > -1) {
    os = "Windows"
  } else if (userAgent.indexOf("Mac") > -1) {
    os = "MacOS"
  } else if (userAgent.indexOf("Linux") > -1) {
    os = "Linux"
  } else if (userAgent.indexOf("Android") > -1) {
    os = "Android"
  } else if (userAgent.indexOf("iOS") > -1 || userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("iPad") > -1) {
    os = "iOS"
  }

  // Detect device type
  let device = "Desktop"

  if (/Mobi|Android|iPhone|iPad|iPod/i.test(userAgent)) {
    device = "Mobile"
  } else if (/Tablet|iPad/i.test(userAgent)) {
    device = "Tablet"
  }

  return {
    browser,
    browserVersion,
    os,
    device,
  }
}

