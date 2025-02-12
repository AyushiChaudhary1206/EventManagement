import { useEffect, useState } from 'react'
import axios from 'axios'
import Note from './Note';
import Spinner from './Spinner';
import { toast } from 'react-toastify';
const Guestmode = () => {
      const [event, setEvents] = useState([]);
      const [loading, setLoading] = useState(true);
   
      useEffect(()=>{
        fetch();
          },[])
          // Fetch Events
         
         const fetch=()=> {
            setLoading(true); // Start loading before request
            axios
              .get("http://localhost:3001/api/v1/getevents")
              .then((response) => {
                console.log(response.data.events);
                setEvents(response.data.events);
              
              
                setLoading(false);
               
                // Stop loading when data is received
              })
              .catch((error) => {
                console.error("Error fetching events:", error);
                setLoading(false); // Stop loading even on error
              });
              toast.info("Signup for more",{
                autoClose:1000
              }); 
          };
  return (
    <>
     <div className="container mx-auto p-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-purple-700">Event Tracker</h1>
      <button className='bg-purple-600 font-bold text-white pt-2 pb-2 pl-4 pr-4 rounded'><a href="/">Signup</a></button>
      </div>
      </div>
      
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ml-4 mr-4 ">
        {loading ? (
          // Show Spinner while Loading
          <div className="flex items-center justify-center w-full col-span-3 min-h-[50vh]">
            <Spinner/>
          </div>
        ) : event.length > 0 ? (
          // Show Event Cards if Data Exists
          event.map((event) => <Note key={event._id} event={event} />)
        ) : (
          // Show "No Events" if No Data
          <buttin className="flex items-center text-bold text-white text-2xl bg-purple-700 justify-center min-h-[50vh] w-full col-span-3">
            No Events
          </buttin>
        )}
      </div>
      
    </>
  )
}

export default Guestmode