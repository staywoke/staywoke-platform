export const trackPageView = (page) => {
  console.log('trackPageView', page)
}

export const trackEvent = (category, action, label, value) => {
  console.log('trackEvent', category, action, label, value)
}
