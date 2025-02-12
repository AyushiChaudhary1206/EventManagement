import React from 'react'

const Note = ({event}) => {
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
    </div>
  )
}

export default Note