import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const ContactenosFooter =()=>{
    return(
    <Container fluid style={{backgroundColor:"#211730"}}>
        <h1 className="text-center" style={{color:"white"}}>Contactenos</h1>
        <Row>
            <Col>
             <h4 style={{color:"#60448D"}}>Telefono  : </h4>
             <h4 style={{color:"#60448D"}}>Correo    : </h4>
             <h4 style={{color:"#60448D"}}>Direccion : </h4>
             <h4 style={{color:"#60448D"}}>Whatsapp  : </h4>
            </Col>
            <Col>
            </Col>
        </Row>

    </Container>

    );
}

export default ContactenosFooter;