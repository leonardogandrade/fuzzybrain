import React, { useEffect, useState } from 'react'
import './style.css'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import backend from '../../services/backend';

import HeaderMenu from '../HeaderMenu'

export default function SearchColors() {
    const [size, setSize] = useState({});
    const [baseColor, setBaseColor] = useState('');
    const [delta, setDelta] = useState(50);
    const [imageData, setImageData] = useState();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleButton = event => {
        console.log(baseColor)
    }

    const handleOnSubmit = async (event) => {

        event.preventDefault();
        // handleShow()

        const payload = {
            "baseColor": baseColor,
            "delta": 90
        }
        const result = await backend.post('/similar_colors', payload);
        setImageData(result)

        // handleClose()
        console.log(result)

    }

    return (
        <div id='screen'>
            <div>
                <HeaderMenu />
            </div>
            <div id='main_container'>
                <div className='left_side_container'>
                    <div id='search_container'>
                        <div id='search_menu'>
                            <Form onSubmit={handleOnSubmit}>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Image name"
                                        aria-label="image name"
                                        aria-describedby="basic-addon2"
                                        value={baseColor}
                                        onChange={e => setBaseColor(e.currentTarget.value)}
                                    />

                                    <Button variant="outline-secondary" id="button-addon2" type='submit' onClick={e => handleButton()}>
                                        Buscar
                                    </Button>
                                </InputGroup>
                                <Form.Control
                                    placeholder="Delta"
                                    aria-label="image name"
                                    style={{ "width": "60px" }}
                                    value={delta}
                                    onChange={e => setDelta(e.currentTarget.value)}
                                />
                            </Form>
                        </div>
                    </div>
                    <div className='imgResult'>
                        {
                            imageData?.data?.map(info => (
                                <div key={info._id} className='imgBox'>
                                    <img src={info.imagePath} alt='' />
                                    <div className='info'>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item>
                                                <Card.Text>
                                                    Predominant colors:
                                                </Card.Text>
                                                {
                                                    info?.predominantColors?.map(color => (
                                                        <div style={{ "display": "flex", "flexDirection": "row" }}>
                                                            <div style={{ "backgroundColor": color, width: "20px", height: "20px", "marginRight": "10px" }}></div>
                                                            <div>{color}</div>
                                                        </div>
                                                    ))
                                                }
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </div>
                                </div>
                            ))
                        }
                        {/* <div id='image-div'>
                            {
                                !imageData ? '' : <img
                                    src={imageData?.data?.imagePath}
                                    alt=""
                                    id='img'
                                    onLoad={event => {
                                        setSize({
                                            height: event.target.naturalHeight,
                                            width: event.target.naturalWidth
                                        });
                                    }}
                                />
                            }

                            {imageData?.data?.data.map(info => (
                                info?.Instances.map(objectInfo => (
                                    <p key={objectInfo?.BoundingBox?.Width}
                                        style={{
                                            left: size?.width * objectInfo?.BoundingBox?.Left,
                                            top: size?.height * objectInfo?.BoundingBox?.Top,
                                            width: size?.width * objectInfo?.BoundingBox?.Width,
                                            height: size?.height * objectInfo?.BoundingBox?.Height,
                                            background: '#0aabba',
                                            fontWeight: 'bold',
                                            opacity: 0.4,
                                        }}>
                                    </p>
                                ))
                            ))}
                        </div>
                        <pre>{JSON.stringify(imageData?.data?.data, undefined, 2)}</pre> */}
                    </div>
                </div>
                <div>
                    {/* <Card style={{ width: '18rem' }}>
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
                        </ListGroup>
                        <Card.Body style={{ display: 'flex', justifyContent: 'center' }}>
                            <div id='uploadForm'>
                                <form id='uploadSelect' onSubmit={handleOnSubmit}>
                                    <input type='file' onChange={handleImage} />
                                    <Button type='submit' variant="danger" size='sm'>Upload</Button>{' '}
                                </form>
                            </div>
                        </Card.Body>
                    </Card> */}
                </div>
            </div>

            <Card.Footer id='footer' className="text-muted">Fuzzy Brain</Card.Footer>

        </div >
    );
}
