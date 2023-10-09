import React, { useState } from 'react';
import Modal from 'react-modal';
import logoImage from '/src/img/logo.svg';

Modal.setAppElement('#root');

const Nav = ({ abrirCiudadLista, ciudades, paises, openGuestsModal, selectedCity, selectedCountry }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const abrirModal = () => {
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="navHeader">
        <div className="navLogo">
          <img src={logoImage} alt="loguito" />
        </div>
        <div className="navItems">
          <button className="navItem" onClick={abrirCiudadLista}>
            Select city
          </button>
          <button className="navItem" onClick={openGuestsModal}>
            Add guests
          </button>
          <button className="navIcon">search</button>
        </div>
        <Modal
          isOpen={modalOpen}
          onRequestClose={cerrarModal}
          contentLabel="Edit your search"
          className="customModal"
        >
          <div className="container mx-auto">
            <h2>City List</h2>
            <ul>
              {ciudades.map((city, index) => (
                <li key={index} onClick={() => abrirCiudadLista()}>
                  {city}, {paises[index]}
                </li>
              ))}
            </ul>
          </div>
          <button className="closeModal" onClick={cerrarModal}>
            <span className="materialIcons MuiIcon-root" aria-hidden="true">
              Close
            </span>
          </button>
        </Modal>
      </div>
      {selectedCity && selectedCountry && (
        <p>Selected City: {selectedCity}, {selectedCountry}</p>
      )}
    </>
  );
};

export default Nav;
