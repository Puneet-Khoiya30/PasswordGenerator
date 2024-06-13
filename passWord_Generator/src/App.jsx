import React, { useCallback, useEffect, useRef, useState } from 'react'
import './index.css';


function App() {

    const [length, setLength] = useState(8)
    const [numAllowed, setNumAllowed] = useState(false)
    const [charAllowed, setCharAllowed] = useState(false)
    const [password, setPassword] = useState("")
    const [copyStatus, setCopyStatus] = useState("Copy")

    const passwordReference = useRef(null)



    const passwordGenerator = useCallback(() => {
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        let pass = ""
        
        if(numAllowed)  str += "0123456789"
        if(charAllowed)  str += "!@#$%^&*-_=+[]{}~`"

        for(let i=0; i < length; i++){
           let char = Math.floor(Math.random() * str.length + 1);
           pass += str.charAt(char)
        }

        setPassword(pass)

    },[length, numAllowed, charAllowed, setLength, setPassword])


    const copyPasswordToClipboard = useCallback(() => {
      window.navigator.clipboard.writeText(password)
      passwordReference.current?.select()
      setCopyStatus("Copied!")
      setTimeout(() => setCopyStatus("Copy"), 1000)
    }, [password])

    useEffect(() => {
      passwordGenerator()
    },[length, numAllowed, charAllowed, passwordGenerator])
 
  return (
   <>
   <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 to-purple-500">


     <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-5 text-black bg-pink-400">
          <h1 className="text-center text-2xl font-bold mb-4">Password Generator</h1>
          <div className='flex shadow rounded-md overflow-hidden mb-4 mt-4'>
            <input 
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3 border-gray-200 rounded-l-md'
            placeholder='Password'
            ref={passwordReference}
            readOnly
            />
            <button 
            className='bg-pink-600 text-white py-2 px-4 rounded-r-md '
            onClick={copyPasswordToClipboard}
            >
              {copyStatus}
            </button>
          </div>
          <div className='flex flex-col space-y-4'>
            <div className='flex items-center'>
              <input 
              type="range"
              min={8}
              max={100}
              value={length}
              className='mr-2 cursor-pointer' 
              onChange={(e) => {setLength(e.target.value)}}
              />
              <label>Length:{length}</label>
            </div>
            <div className='flex items-center'>
              <input 
              type="checkbox"
              defaultChecked = {numAllowed} 
              id='numberInput'
              onChange={(e) => {
                setNumAllowed((prev) => !prev)
              }}
              className="mr-2"
              />
              <label htmlFor="numberInput">Include Numbers</label>
              </div>
            <div className='flex items-center'>
              <input 
              type="checkbox"
              defaultChecked = {charAllowed} 
              id='characterInput'
              onChange={(e) => {
                setCharAllowed((prev) => !prev)
              }}
              className="mr-2"
              />
              <label htmlFor="characterInput">Include Special Characters</label>
              </div>
          </div>
     </div>
   
   </div>

   </>
     
  )
}

export default App