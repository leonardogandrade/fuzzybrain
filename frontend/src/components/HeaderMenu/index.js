import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image'
import Icon from '../../assets/fuzzyIcon.png'
import './style.css'

export default function HeaderMenu() {
    return (
        <Navbar expand="lg" id='navbar'>
            <Container>
                <Navbar.Brand href="#home"><Image src={Icon} id='icon_logo'></Image></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Fuzzy Eye" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/action/upload">Cadastrar</NavDropdown.Item>
                            <NavDropdown.Item href="/action/search_colors">
                                Cores similares
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Converter Imagem</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Imagens similares
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
