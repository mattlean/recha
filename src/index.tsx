import React from 'react'
import ReactDOM from 'react-dom'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log(`SW registered: ${registration}`)
      })
      .catch((registrationErr) => {
        console.log(`SW registration failed: ${registrationErr}`)
      })
  })
}

ReactDOM.render(<h1>Hello, World!</h1>, document.getElementById('root'))
