import React, { useState } from 'react';
import Modal from 'react-modal';
import '../GuestsModal.css';

Modal.setAppElement('#root');

const GuestsModal = ({ isOpen, onRequestClose }) => {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  const increaseGuests = (type) => {
    if (type === 'adults') {
      setAdults(adults + 1);
    } else if (type === 'children') {
      setChildren(children + 1);
    }
  };

  const decreaseGuests = (type) => {
    if (type === 'adults' && adults > 0) {
      setAdults(adults - 1);
    } else if (type === 'children' && children > 0) {
      setChildren(children - 1);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel='Edit your search'
      className='customModal'
    >
      <div className='container mx-auto'>
        <div className='undefined my-8 sm:ml-1/2'>
          <h1 className='font-extrabold text-gray-800'>Adults</h1>
          <span className='text-gray-400'>Age 13 or above</span>
          <div className='mt-2'>
            <button
              className='mr-2 relative px-1 rounded-md text-gray-800 border border-gray-400 hover:text-gray-600 focus:border-blue-300 focus:outline-none'
              onClick={() => decreaseGuests('adults')}
            >
              －
            </button>
            <span>{adults}</span>
            <button
              className='ml-2 relative px-1 rounded-md text-gray-800 border border-gray-400 hover:text-gray-600 focus:border-blue-300 focus:outline-none'
              onClick={() => increaseGuests('adults')}
            >
              ＋
            </button>
          </div>
        </div>
        <div className='undefined my-8 sm:ml-1/2'>
          <h1 className='font-extrabold text-gray-800'>Children</h1>
          <span className='text-gray-400'>Age 2-12</span>
          <div className='mt-2'>
            <button
              className='mr-2 relative px-1 rounded-md text-gray-800 border border-gray-400 hover:text-gray-600 focus:border-blue-300 focus:outline-none'
              onClick={() => decreaseGuests('children')}
            >
              －
            </button>
            <span>{children}</span>
            <button
              className='ml-2 relative px-1 rounded-md text-gray-800 border border-gray-400 hover:text-gray-600 focus:border-blue-300 focus:outline-none'
              onClick={() => increaseGuests('children')}
            >
              ＋
            </button>
          </div>
        </div>
      </div>
      <button className='closeModal' onClick={onRequestClose}>
        <span className='materialIcons MuiIcon-root' aria-hidden='true'>
          Close
        </span>
      </button>
    </Modal>
  );
};

export default GuestsModal;
