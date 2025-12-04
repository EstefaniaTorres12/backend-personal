import React from "react";
import { Container, Form, Card, Button, Alert, } from "react-bootstrap";
import { useState } from "react";
import Fondo from '../../img/3302177.jpg';


const Registrarse = () => {

    const [formData, setData] = useState({
        DocumentoCliente: '',
        NombreCliente: '',
        ApellidoCliente: '',
        DireccionCliente: '',
        TelefonoCliente: '',
        CorreoCliente: ''
    });

    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const handleChange = (e) => {
        setData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }



    const enviarDatos = async (e) => {
        e.preventDefault();
        setMostrarAlerta(true);
        console.log('datos enviados: ', formData);
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundImage: `url(${Fondo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "flex",              
                justifyContent: "center",     
                alignItems: "center"          
            }}
        >
            <Container className=" align-items-center" style={{ maxWidth: "600px" }}>
                <Card>
                    <Card.Header>
                        <h3 className="text-center">Registrarse</h3>
                        {mostrarAlerta && (
                            <Alert variant="success" onClose={() => setMostrarAlerta(false)} dismissible>
                                Datos enviados  correctamente!!!!......
                            </Alert>
                        )}
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={enviarDatos}>
                            <Form.Group className="mb-3" controlId="DocumentoCliente">
                                <Form.Label>DOCUMENTO</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="DocumentoCliente"
                                    value={formData.DocumentoCliente}
                                    onChange={handleChange}
                                    placeholder="digite el documento"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="NombreCliente">
                                <Form.Label>NOMBRE</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="NombreCliente"
                                    value={formData.NombreCliente}
                                    onChange={handleChange}
                                    placeholder="digite el nombre "
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="ApellidoCliente">
                                <Form.Label>APELLIDO</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="ApellidoCliente"
                                    value={formData.ApellidoCliente}
                                    onChange={handleChange}
                                    placeholder="digite el apellido "
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="DireccionCliente">
                                <Form.Label>DIRECCION</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="DireccionCliente"
                                    value={formData.DireccionCliente}
                                    onChange={handleChange}
                                    placeholder="digite la direccion  "
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="TelefonoCliente">
                                <Form.Label>TELEFONO</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TelefonoCliente"
                                    value={formData.TelefonoCliente}
                                    onChange={handleChange}
                                    placeholder="digite el telefono  "
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="CorreoCliente">
                                <Form.Label>CORREO</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="CorreoCliente"
                                    value={formData.CorreoCliente}
                                    onChange={handleChange}
                                    placeholder="digite el Correo  "
                                />
                            </Form.Group>

                            <Button style={{background:"#7856AE"}} type="submit">Guardar</Button>
                            <Button style={{background:"#7856AE"}} type="button">Cancelar</Button>

                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default Registrarse;