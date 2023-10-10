import React, { useState } from 'react';
import Modal from 'react-modal';
import '../GuestsModal.css';

Modal.setAppElement('#root');

const GuestsModal = ({ isOpen, onRequestClose, onSearch }) => {
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

  const handleSearch = () => {
    
    const guests = adults + children;
    onSearch(guests);

    // Cierra el modal
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel='Edit your search'
      className='customModal'
    >
      <div className='container mx-auto'>
        <div className='section'>
          <h1 className='title'>Adults</h1>
          <span className='description'>Age 13 or above</span>
          <div className='contador'>
            <button
              className='botonContador'
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
        <div className='section'>
          <h1 className='title'>Children</h1>
          <span className='description'>Age 2-12</span>
          <div className='contador'>
            <button
              className='botonContador'
              onClick={() => decreaseGuests('children')}
            >
              －
            </button>
            <span>{children}</span>
            <button
              className='botonContador'
              onClick={() => increaseGuests('children')}
            >
              ＋
            </button>
          </div>
        </div>
      </div>
      <button className='searchButton' onClick={handleSearch}>
        Search
      </button>
      <button className='closeModal' onClick={onRequestClose}>
        <span className='materialIcons MuiIcon-root' aria-hidden='true'>
          Close
        </span>
      </button>
    </Modal>
  );
};

export default GuestsModal;
