import fetch from 'isomorphic-fetch'

const handleHTTPErrors = res => {
    if (res.ok) return res
    return res.json().then(err => { throw err })
}

// export default (url, options) => {
//   const jwtToken = localStorage.getItem('authToken')
//   // const jwtToken = cookies.get('authtoken');
//   if (jwtToken) {
//     let authAddedOptions = options
//     if (typeof options !== 'object') {
//       authAddedOptions = {}
//     }
//     if (typeof authAddedOptions.headers !== 'object') {
//       authAddedOptions.headers = {}
//     }
//     authAddedOptions.headers = {
//       ...authAddedOptions.headers,
//       Authorization: jwtToken
//     }
//     return fetch(url, authAddedOptions).then(handleHTTPErrors)
//   } else {
//     return fetch(url, options).then(handleHTTPErrors)
//   }
// }

export default (url, options) => {
    return fetch(url, options).then(handleHTTPErrors)
}