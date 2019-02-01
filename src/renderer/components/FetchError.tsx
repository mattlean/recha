import React from 'react'

const FetchError = ({ onRetry, message }: { onRetry: () => void; message: string }): ReturnType<typeof FetchError> => (
  <div>
    <p>Could not fetch todos. {message}</p>
    <button type="button" onClick={onRetry}>
      Retry
    </button>
  </div>
)

export default FetchError
