import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const App = () => {
  let [apiData, SetApiData] = useState([])
  useEffect(()=>{
    async function api() {
      let res = await axios.get("http://localhost:4000/"); 
      SetApiData(res.data);
    }
    api()
  },[])
  return (
    <div>
     {
      apiData.map((item)=>{
        return (
        <p key = {item.id}>
          {item.name} - {item.price}
        </p>
        );
      })
     }
    </div>
  )
}

export default App
