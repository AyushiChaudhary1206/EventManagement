import { useState } from "react";
import Modal from "react-modal"; // Import react-modal (optional for handling modals)
// import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Navbar= ({attendees,handleEventAdded}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu
  const [isAttendeeModalOpen, setIsAttendeeModalOpen] = useState(false);

  // Open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle form submission
  const handleAddEvent = async(e) => {
    e.preventDefault();
   await axios.post("https://eventmanagementbackend-hlij.onrender.com/api/v1/events",{
    title:eventTitle,
    time:eventTime,
    description:eventDescription,
    date:eventDate,
   })

   toast.success("Event added",{
    autoClose:1000,
    closeButton:true
   });
   setEventDate("");
   setEventDescription("");
   setEventTime("");
   setEventTitle("");
   handleEventAdded();
  
    // Add your event submission logic here (e.g., send to API)
    closeModal(); // Close modal after adding event
  };

  return (
    <div className="container mx-auto p-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-purple-700">Event Tracker</h1>

      {/* Desktop Buttons */}
      <div className="hidden md:flex gap-4">
        <button
          onClick={openModal}
          className="bg-purple-600 text-white py-2 px-6 rounded-md hover:bg-purple-700 transition-all"
        >
          Create Event
        </button>
        <button
          onClick={() => setIsAttendeeModalOpen(true)}
          className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition-all"
        >
          See Attendees
        </button>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-purple-700 text-3xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Sliding Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 right-4 text-2xl text-purple-700"
        >
          ✕
        </button>
        <div className="flex flex-col p-6 space-y-4">
          <button
            onClick={() => {
              setIsMenuOpen(false);
              openModal();
            }}
            className="bg-purple-600 text-white py-2 mt-8 px-6 rounded-md hover:bg-purple-700 transition-all"
          >
            Create Event
          </button>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              setIsAttendeeModalOpen(true);
            }}
            className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition-all"
          >
            See Attendees
          </button>
        </div>
      </div>

      {/* Modal for Attendees */}
      <Modal
        isOpen={isAttendeeModalOpen}
        onRequestClose={() => setIsAttendeeModalOpen(false)}
        ariaHideApp={false}
        className="bg-white p-6 rounded-3xl max-w-lg mx-auto shadow-xl transition-all duration-300 mt-20"
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">Attendees</h2>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {attendees.length > 0 ? (
            attendees.map((attendee) => (
              <div
                key={attendee._id}
                className="p-4 border rounded-lg shadow-sm bg-gray-100"
              >
                <h3 className="text-gray-600"><span className="font-bold">Name:-</span>{attendee.name}</h3>
                <p className=" text-gray-600"><span className="font-bold">Email:-</span>{attendee.email}</p>
                <p className=" text-gray-600"><span className="font-bold">City:-</span>{attendee.city}</p>
                <p className="text-gray-600"><span className="font-bold">Event:-</span>{attendee.event}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No attendees available.</p>
          )}
        </div>
        <button
          onClick={() => setIsAttendeeModalOpen(false)}
          className="mt-4 w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all"
        >
          Close
        </button>
      </Modal>
    </div>

      {/* Modal for Creating Event */}
      <Modal isOpen={isModalOpen}  ariaHideApp={false} className="fixed inset-0 mr-4 ml-4 flex items-center justify-center"
  overlayClassName="fixed inset-0 flex bg-white items-center justify-center" onRequestClose={closeModal}>
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
          <div className="bg-purple-200 rounded rounded-2xl mb-2">

          <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">Create Event</h2>
</div>
          <form onSubmit={handleAddEvent} >
            {/* Event Title */}
            <div className="mb-4">
              <label className="block text-purple-700 font-medium">Event Title</label>
              <input
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mt-2"
                required
              />
            </div>

            {/* Event Description */}
            <div className="mb-4">
              <label className="block text-purple-700 font-medium">Event Description</label>
              <textarea
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mt-2"
                required
              />
            </div>

            {/* Event Date */}
            <div className="mb-4">
              <label className="block text-purple-700 font-medium">Event Date</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded-md mt-2"
                required
              />
            </div>

            {/* Event Time */}
            <div className="mb-4">
              <label className="block text-purple-700 font-medium">Event Time</label>
              <input
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mt-2"
                required
              />
            </div>

            {/* Add Event Button */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
              >
                Add Event
              </button>
            </div>
          </form>
        </div>
        
      </Modal>
     
    </div>
  );
};

export default Navbar;
