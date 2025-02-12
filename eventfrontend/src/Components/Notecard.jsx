import { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventCard = ({ event,handleEventAdded }) => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isReadMoreModalOpen, setIsReadMoreModalOpen] = useState(false);

  // Separate state for each input field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');

  const handleRegister = async () => {
    try {
      // Send POST request using Axios
      await axios.post('https://eventmanagementbackend-hlij.onrender.com/api/v1/atendee', {
        name,
        email,
        phone,
        city,
        event: event.title,
      });
     
      // Display success toast
      toast.success("Registration successful");
     

      // Clear form fields after successful registration
      setName('');
      setEmail('');
      setPhone('');
      setCity('');
      setIsRegisterModalOpen(false);
      handleEventAdded(); // Close the modal
    } catch (err) {
      toast.error('Error Registering!', {
        autoClose: 3000,
        closeButton: true,
      });
    }
  };

  const truncateText = (text, limit, type) => {
    if (type === 'words' && text.length > limit) {
      return text.substring(0, limit) + '...';
    } else if (type === 'chars' && text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  };

  return (
    <div className="max-w-sm mt-4 mb-4 bg-white p-6 rounded-3xl shadow-[0px_10px_15px_rgba(138,43,226,0.3),0px_4px_6px_rgba(138,43,226,0.2)] hover:shadow-[0px_20px_30px_rgba(138,43,226,0.5),0px_10px_15px_rgba(138,43,226,0.4)] hover:scale-105 transition-all duration-300 ease-in-out">
      {/* Event Card Content */}
      <div className="flex justify-between items-center text-lg font-medium text-gray-800 mb-4">
        <div>{event.date}</div>
        <div>{event.time}</div>
      </div>

      <div className="text-2xl font-semibold text-gray-900 mb-4">
        {truncateText(event.title, 5, 'words')}
      </div>

      <div className="text-sm text-gray-600 mb-6">
        {truncateText(event.description, 15, 'chars')}
      </div>

      {/* Register Button */}
      <div className="flex gap-4">
        <button
          onClick={() => setIsRegisterModalOpen(true)}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
        >
          Register
        </button>
        <button
          onClick={() => setIsReadMoreModalOpen(true)}
          className="w-full py-3 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400 transition-all duration-300"
        >
          Read More
        </button>
      </div>

      {/* Register Modal */}
      <Modal
        isOpen={isRegisterModalOpen}
        onRequestClose={() => setIsRegisterModalOpen(false)}
        contentLabel="Register for Event"
        ariaHideApp={false}
        className="bg-white p-10 rounded-3xl max-w-lg mx-auto shadow-xl transition-all duration-300"
      >
        <h2 className="text-purple-600 text-3xl font-semibold mb-6 text-center">
          Register for Event
        </h2>

        {/* Form Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setIsRegisterModalOpen(false)}
            className="py-3 px-6 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleRegister}
            className="py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
          >
            Register
          </button>
        </div>
      </Modal>

      {/* Read More Modal */}
      <Modal
        isOpen={isReadMoreModalOpen}
        onRequestClose={() => setIsReadMoreModalOpen(false)}
        contentLabel="Event Details"
        ariaHideApp={false}
        className="bg-white lg:mt-[20vh] mt-[20vh] p-10 rounded-3xl max-w-lg mx-auto shadow-xl transition-all duration-300"
        style={{
          content: {
            overflowY: 'auto',
            overflowX: 'hidden',
          },
        }}
      >
        <h1 className='text-center mb-4 text-gray-500 font-bold text-3xl'>Event Details</h1>
        <h2 className=" text-lg text-gray-600 font-bold mb-2">
          <span className="text-purple-600 font-bold">Event Title:-</span> {event.title}
        </h2>
        <div className="text-lg font-bold text-gray-600 mb-2">
          <span className="text-purple-600 font-bold">Event Date:-</span> {event.date}
        </div>
        <div className="text-lg font-bold text-gray-600 mb-2">
          <span className="text-purple-600 font-bold">Event Time:-</span> {event.time}
        </div>
        <p className="text-lg font-bold text-gray-600 mb-6 break-words">
          <span className="text-purple-600 font-bold">Event Description:-</span> {event.description}
        </p>

        <button
          onClick={() => setIsReadMoreModalOpen(false)}
          className="w-full py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-300"
        >
          Close
        </button>
      </Modal>
      <ToastContainer/>
    </div>
  );
};

export default EventCard;
