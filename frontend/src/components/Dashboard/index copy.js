import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image'
import Icon from '../../assets/fuzzyIcon.png'
import './style.css'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import backend from '../../services/backend';

export default function Dashboard() {
    const [data, setData] = useState({});
    const [size, setSize] = useState({});
    const [file, setFile] = useState('');
    const [imageData, setImageData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await backend.get(`/image`)
            setData(fetchedData.data);
        }
        fetchData();
    }, [])

    const handleImage = event => {
        setFile(event.target.files[0])
        console.log(file)
    }

    const handleOnSubmit = async (event) => {

        event.preventDefault();

        const file_data = new FormData();
        file_data.append('file', file);

        const result = await backend.post('/upload', file_data);
        setImageData(result)
    }

    return (
        <div id='screen'>
            <div>
                {
                    console.log(size)
                }
                <Navbar expand="lg" id='navbar'>
                    <Container>
                        <Navbar.Brand href="#home"><Image src={Icon} id='icon_logo'></Image></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#link">Link</Nav.Link>
                                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">
                                        Separated link
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <div id='main_container'>
                <div className='left_side_container'>

                    <div id='search_container'>
                        <div id='search_menu'>
                            <InputGroup className="mb-3" >
                                <Form.Control
                                    placeholder="Image name"
                                    aria-label="image name"
                                    aria-describedby="basic-addon2"
                                />
                                <Button variant="outline-secondary" id="button-addon2">
                                    Buscar
                                </Button>
                            </InputGroup>
                        </div>
                    </div>

                    <div className='image_display'>
                        <div className='image_card'>
                            <img
                                src={imageData?.data?.imagePath}
                                alt="imobjectImg"
                                id='img'
                                onLoad={event => {
                                    setSize({
                                        height: event.target.naturalHeight,
                                        width: event.target.naturalWidth
                                    });
                                }}
                            />
                            <div id='image-div'>
                                {imageData?.data?.data.map(info => (
                                    info?.Instances.map(objectInfo => (
                                        <p key={objectInfo?.BoundingBox?.Width}
                                            style={{
                                                left: 400 * objectInfo?.BoundingBox?.Left,
                                                top: 600 * objectInfo?.BoundingBox?.Top,
                                                width: 400 * objectInfo?.BoundingBox?.Width,
                                                height: 600 * objectInfo?.BoundingBox?.Height,
                                                background: '#0aabba',
                                                fontWeight: 'bold',
                                                opacity: 0.4,
                                            }}>
                                        </p>
                                    ))
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* 
left = width * bbox['Left']
top = height * bbox['Top']
right = (width *  bbox['Width']) + left
bottom = (height * bbox['Height']) + top */}
                <div>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{imageData?.data?.objectName}</Card.Title>
                            <Card.Text>
                                {imageData?.data?.className}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>
                                {
                                    imageData?.data?.predominantColors.map(color => (
                                        <div key={color} id='colorBox' style={{ display: 'flex', flexDirection: 'row' }}>
                                            <div style={{ backgroundColor: color, width: '20px', height: '20px', marginRight: '10px' }}></div>
                                            <span>{color}</span>
                                        </div>
                                    ))
                                }
                            </ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        </ListGroup>
                        <Card.Body style={{ display: 'flex', justifyContent: 'center' }}>
                            <div id='uploadForm'>
                                <form id='uploadSelect' onSubmit={handleOnSubmit}>
                                    <input type='file' onChange={handleImage} />
                                    <Button type='submit' variant="danger" size='sm'>Upload</Button>{' '}
                                </form>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>

            <Card.Footer id='footer' className="text-muted">Fuzzy Brain</Card.Footer>

        </div >
    );
}


