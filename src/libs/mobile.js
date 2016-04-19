export let iOS = (navigator.userAgent.indexOf('iPhone OS') > -1) || (navigator.userAgent.indexOf('iPad') > -1)
export let android = navigator.userAgent.indexOf('Android') > -1
export let windowsPhone = navigator.userAgent.indexOf('Windows Phone') > -1
export let mobile = iOS || android || windowsPhone
