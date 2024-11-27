import React, { useEffect, useState } from "react";
import "./App.css";
import { Card, Col, Modal, Row } from "react-bootstrap";
import "./assets/estilos/imagenes.css";

const imagenes = import.meta.glob("./assets/imagenes/*.*");

function App() {
  const [imagenesResueltas, setImagenesResueltas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const cargarImagenes = async () => {
      const imagenesArray = await Promise.all(
        Object.entries(imagenes).map(async ([path, image]) => {
          const src = await image();
          return { path, src };
        })
      );
      setImagenesResueltas(imagenesArray);
    };

    cargarImagenes();
  }, []);

  const handleImageClick = (src) => {
    if (showModal && src === selectedImage) {
      setShowModal(false);
    } else {
      setSelectedImage(src);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Prueba CDN</h1>
        <p>
          Esta es una página de prueba para evaluar el rendimiento con y sin CDN
          en el marco del trabajo de investigación en equipo de la asignatura
          Redes de Datos, cuarto año de la Carrera LSI .
        </p>

        <div>
          <br />
          <br />
          <h1 style={{ color: "white" }}>Galería de fotos</h1>
          <br />
          <br />
          <Row xs={1} md={4} className="g-4">
            {imagenesResueltas.map(({ path, src }) => (
              <Col key={path}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={src.default}
                    alt={path.split("/").pop()}
                    className="imagen-galeria"
                    onClick={() => handleImageClick(src.default)}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <button
          onClick={() => alert("¡Botón funcionando!")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#61dafb",
            border: "none",
            cursor: "pointer",
          }}
        >
          Prueba botón
        </button>
      </header>
      <main>
        <section>
          <h2>Recursos adicionales</h2>
          <ul>
            <a
              href="https://github.com/TimboAG"
              target="_blank"
              rel="noreferrer"
            >
              Github Guerin
            </a>
            <br></br>
            <a
              href="https://github.com/Redes2024g10"
              target="_blank"
              rel="noreferrer"
            >
              Github grupo 10
            </a>
          </ul>
        </section>
      </main>
      <footer>
        <p>© 2024 Prueba CDN</p>
      </footer>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        className="modalGaleria"
      >
        <Modal.Header closeButton className="fondoModalGaleria"></Modal.Header>
        <Modal.Body className="fondoModalGaleria">
          <img
            src={selectedImage}
            alt="Imagen Ampliada"
            className="modal-body-img"
            onClick={() => handleImageClick(selectedImage)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
