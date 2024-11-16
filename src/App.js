import React from "react";
import {apiUrl,filterData} from "./data";
import {toast} from "react-toastify";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Filter from "./Components/Filter";
import Cards from "./Components/Cards";
import Spinner from "./Components/Spinner";

const App = () => {
     const[courses, setCourses]= useState(null);
     const[loading,setLoading]=useState(true);
     const[category,setCategory]=useState(filterData[0].title);

     const fetchData=async()=>{

      // jb tk data load ho rha tb tk  set loading true
      setLoading(true);
      try{
         let response = await fetch(apiUrl);
         let output= await response.json();

         // save data into a variable 
         setCourses(output.data);
      }
      catch(error){
          toast.error("Something went wrong");
      }
      
      // jb data load ho jayega set loading false 
      setLoading(false);
    }


    useEffect(()=>{
      fetchData();
    },[])


  return (
<div className="min-h-screen flex-col flex bg-bgDark2">

  <div>
  <Navbar/>
  </div>

  <div>
  <Filter
    filterData={filterData}
    category={category}
    setCategory={setCategory}
    />
  </div>
    
  <div className="w-11/12 max-w-[1200px] min-h-[50vh] mx-auto flex flex-wrap justify-center items-center">
  {
  loading ? (<Spinner/>) : (<Cards courses={courses} category={category}/>)
}

</div>
   
 </div>
  );
};

export default App;
