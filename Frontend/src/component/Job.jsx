import React from 'react'
import API from '../services/API.js'

const Job = () => {
    const [job,setJob]=useState([]);
    useEffect(async()=>{
       const data=await API.get("/job/");
       console.log(data);
       setJob(data.data);
    },[])
    return (
    <div>

      
    </div>
  )
}

export default Job

