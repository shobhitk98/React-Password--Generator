import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
 const[length,setLength]=useState(8)
 const[numberAllowed, setNumberAllowed]=useState(false)
 const [charAllowed,setcharAllowed]=useState(false)
 const[password,setPassword]=useState("")

 //useref hook
 const passwordRef=useRef(null)

 const passwordGenerator=useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  if( numberAllowed) str+="0123456789"
  if(charAllowed) str+="!@#$%&*^?"

  for (let i = 1; i <= length; i++) {
   let char =Math.floor(Math.random()*str.length+1)
    
   pass +=str.charAt(char)
  }
  setPassword(pass)

 },[length,numberAllowed,charAllowed,setPassword])

 const copyPasswordToClipboard=useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,99)
  window.navigator.clipboard.writeText(password)

 },[password])

 useEffect(()=>{
passwordGenerator()

 },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
    <div className=' w-full  max-w-md  mx-auto shadow-md rounded-lg px-4  py-3 my-8 text-orange-500   bg-gray-800'> 
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className=' flex  shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordRef} />
        <button className='px-4 bg-blue-700    text-white text-1xl' onClick={copyPasswordToClipboard}>Copy</button>
      </div>
      <div className=' flex text-sm gap-x-2'>
        <div className=' flex items-center gap-x-1'>
          <input type="range" min={1} max={100} value={length} className=' cursor-pointer' onChange={(e)=>{setLength(e.target.value)}} />
          <label >Length:{length}</label>
        </div>
        <div className=' flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={()=>{setNumberAllowed((prev)=>!prev
          
          )}} />
          <label htmlFor="numberInput" >Numbers</label>
        </div>
        <div className=' flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={charAllowed} id="characterInput" onChange={()=>{setcharAllowed((prev)=>!prev
          
          )}} />
          <label htmlFor="characterInput" >Characters</label>
        </div>
      </div>
       </div>
      
    </>
  )
}

export default App
