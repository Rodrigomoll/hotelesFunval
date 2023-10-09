import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Card from './components/Card';
import GuestsModal from './components/GuestsModal';
import './App.css';
import './Card.css';

function App() {
  const [data, setData] = useState([]);
  const [cityListOpen, setCityListOpen] = useState(false);
  const [ciudades, setCiudades] = useState([]);
  const [paises, setPaises] = useState([]);
  const [selectedCiudad, setSelectedCiudad] = useState('');
  const [selectedPais, setSelectedPais] = useState('');
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [totalGuests, setTotalGuests] = useState(0);

  useEffect(() => {
    async function getData() {
      const res = await fetch('stays.json');
      const datos = await res.json();

      setData(datos);

      const soloCiudades = [...new Set(datos.map((item) => item.city))];
      setCiudades(soloCiudades);

      const soloPaises = [...new Set(datos.map((item) => item.country))];
      setPaises(soloPaises);
    }

    getData();
  }, []);

  const abrirCiudadLista = () => {
    setCityListOpen(true);
  }

  const cerrarCiudadLista = () => {
    setCityListOpen(false);
  }

  const openGuestsModal = () => {
    setIsGuestsModalOpen(true);
  }

  const closeGuestsModal = () => {
    setIsGuestsModalOpen(false);
  }

  const handleCiudad = (ciudad, pais) => {
    if (ciudad && pais) {
      setSelectedCiudad(ciudad);
      setSelectedPais(pais);
      cerrarCiudadLista();
    } else {
      console.error("Ciudad o país indefinido");
    }
  }

  const handleSearch = (numGuests) => {
    setTotalGuests(numGuests);
    closeGuestsModal();
  };

  const filteredCards = data.filter((item) => {
    if (selectedCiudad && selectedPais) {
      return (
        item.city === selectedCiudad &&
        item.country === selectedPais &&
        item.maxGuests >= totalGuests
      );
    }
    return true;
  });

  const chunkArray = (arr, chunkSize) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArr.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArr;
  };

  return (
    <>
      <Nav
        abrirCiudadLista={abrirCiudadLista}
        ciudades={ciudades}
        paises={paises}
        openGuestsModal={openGuestsModal}
      />
      {cityListOpen && (
        <div className='cityList'>
          <h2>City List</h2>
          {ciudades.map((city) => {
            const pais = paises.find((pais) =>
              data.find((item) => item.city === city && item.country === pais)
            );
            return (
              <div key={city} onClick={() => handleCiudad(city, pais)}>
                <p>{city}, {pais}</p>
              </div>
            );
          })}
          <button onClick={cerrarCiudadLista}>Cerrar lista</button>
        </div>
      )}

      <div className="apartment-list">
        {selectedCiudad && selectedPais && (
          <h2>Stays in {selectedCiudad}, {selectedPais}</h2>
        )}
        {chunkArray(filteredCards, 3).map((group, groupIndex) => (
          <div className="row" key={groupIndex}>
            {group.map((obj, key) => (
              <div className="col" key={key}>
                <Card
                  images={obj.photo}
                  title={obj.title}
                  description={`Tipo: ${obj.type}, Rating: ${obj.rating}, Ciudad: ${obj.city}, País: ${obj.country}, Máximo de huéspedes: ${obj.maxGuests}`}
                  rating={obj.rating}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {isGuestsModalOpen && (
        <GuestsModal
          isOpen={isGuestsModalOpen}
          onRequestClose={closeGuestsModal}
          onSearch={handleSearch}
        />
      )}
    </>
  );
}

export default App;
