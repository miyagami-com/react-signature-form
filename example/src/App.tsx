import React, {useState} from 'react'

import { SignatureForm } from 'react-signature-form'

const App = () => {
  const [signature, setSignature] = useState('');

  return (
    <div className="container">
      <h1>React signature form</h1>
      <p>A lightweight and customisable package to enable your <br /> users to set their autographs and save it to an image.</p>
      <SignatureForm
        signature={signature}
        setSignature={setSignature}
        width={400}
        height={200}
      />
      <p>Made with ❤️ㅤby <a href="https://www.miyagami.com" target="_blank" rel="noreferrer">Miyagami</a></p>
    </div>
  )
}

export default App
