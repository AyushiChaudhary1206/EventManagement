import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import EventCard from "./Notecard";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [eventDate, setEventDate] = useState("");
  const [attendee, setAttendee] = useState([]);
  const [loading, setLoading] = useState(true);
  const[render,setrender]=useState(0);
  useEffect(()=>{
fetch();
  },[render])
  // Fetch Events
 
 const fetch=()=> {
    setLoading(true); // Start loading before request
    axios
      .get("https://eventmanagementbackend-hlij.onrender.com/api/v1/getevents")
      .then((response) => {
        setEvents(response.data.events);
        
        setLoading(false); 
        // Stop loading when data is received
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false); // Stop loading even on error
      });
  };

  const handleEventAdded = () => {
    console.log("🎉 New event added, updating events...");
    setrender((prev) => prev + 1); // ✅ Triggers re-fetch
  };
  // Fetch Attendees
  useEffect(() => {
    axios
      .get("https://eventmanagementbackend-hlij.onrender.com/api/v1/getatendee")
      .then((response) => {
        setAttendee(response.data.atendees);
      })
      .catch((error) => {
        console.error("Error fetching attendees:", error);
      });
  }, [render]);

  // Filter Events by Date
  useEffect(() => {
    if (!eventDate) return; // Don't fetch if date is empty

    setLoading(true); // Start loading before filtering
    axios
      .post("https://eventmanagementbackend-hlij.onrender.com/api/v1/filterevents", {
        date: eventDate,
      })
      .then((response) => {
        setEvents(response.data.events);
        setLoading(false); // Stop loading when data is received
      })
      .catch((err) => {
        console.error("Error filtering events:", err);
        toast.error("No events found");
        setLoading(false); // Stop loading even on error
      });
  }, [eventDate]);

  return (
    <>
      <Navbar attendees={attendee} handleEventAdded={handleEventAdded} />

      {/* Search Input */}
      <div className="flex items-center justify-center">
        <button className="font-bold text-xl mr-2 bg-purple-600 text-white p-2 mt-2 rounded-xl">
          Find Events
        </button>
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mt-2"
          required
        />
      </div>
      <div className="flex items-center justify-center mt-6">
      <button className="font-bold text-xl mr-2 bg-purple-600 text-white p-2 mt-2 rounded-xl">
          All Events
        </button>
      </div>
      {/* Events Grid */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ml-4 mr-4 ">
        {loading ? (
          // Show Spinner while Loading
          <div className="flex items-center justify-center w-full col-span-3 min-h-[50vh]">
            <Spinner />
          </div>
        ) : events.length > 0 ? (
          // Show Event Cards if Data Exists
          events.map((event) => <EventCard handleEventAdded={handleEventAdded} key={event._id} event={event} />)
        ) : (
          // Show "No Events" if No Data
          <button className="flex items-center text-bold text-2xl text-white bg-purple-700 justify-center min-h-[50vh] w-full mt-4 col-span-3">
            No Events
          </button>
        )}
      </div>
    </>
  );
};

export default Dashboard;
