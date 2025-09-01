import { useEffect,useState } from "react";
const Sandbox = () => {
  const [msg,setMsg] = useState(false)
  const [error,setError] = useState(false)

  useEffect(()=>{
    const timer = setTimeout(() => {
      setMsg(true)
    }, 500);

    return ()=>clearTimeout(timer)
  })
  return <div>
  
    <h1>React Testing Library Examples</h1>
    <p>You can search me with regular expression: 123-456-7890</p>

    {
      error ?? <p>Error message</p>
    }
    <ul>
        <li>Item 1</li>
        <li>Item 1</li>
        <li>Item 1</li>
      </ul>
    {
      msg && <p>Async message</p>
    }
  </div>;
};
export default Sandbox;
