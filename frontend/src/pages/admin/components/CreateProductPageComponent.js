import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Button, CloseButton, Table, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CreateProductPageComponent = ({ createProductApiRequest,
    uploadImagesApiRequest,
    uploadImagesCloudinaryApiRequest,
    categories,
    reduxDispatch,
    newCategory,
    deleteCategory,
}) => {
    const [validated, setValidated] = useState(false);
    const [attributesTable, setAttributesTable] = useState([]);
    const [images, setImages] = useState(false);
    const [isCreating, setIsCreating] = useState("");
    const [createProductResponseState, setCreateProductResponseState] = useState({
        message: "",
        error: ""
    });
    const [categoryChosen, setCategoryChosen] = useState("Choose category");


    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const formInputs = {
            name: form.name.value,
            description: form.description.value,
            count: form.count.value,
            price: form.price.value,
            category: form.category.value,
            attributesTable: attributesTable
        }
        if (event.currentTarget.checkValidity() === true) {
            if (images.length > 3) {
                setIsCreating("too many files");
                return;
            }
            createProductApiRequest(formInputs)
                .then(data => {
                    if (images) {
                        // to do: change to !==
                        if (process.env.NODE_ENV !== "production") {
                            uploadImagesApiRequest(images, data.productId)
                                .then(res => { })
                                .catch((er) => setIsCreating(er.response.data.message ? er.response.data.message : er.response.data))
                        } else {
                            uploadImagesCloudinaryApiRequest(images, data.productId);
                        }
                    }
                    if (data.message === "product created") navigate("/admin/products");
                })
                .catch(er => {
                    setCreateProductResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data });
                })
        }
        setValidated(true)
    }

    const uploadHandler = (images) => {
        setImages(images);
    }

    const newCategoryHandler = (e) => {
        if (e.keyCode && e.keyCode === 13 && e.target.value) {
            reduxDispatch(newCategory(e.target.value));
            setTimeout(() => {
                let element = document.getElementById("cats");
                element.value = e.target.value;
                setCategoryChosen(e.target.value);
                e.target.value = ""
            }, 200)
        }
    }

    // create a deleteCategoryHandler to call reduxDispatch on deleteCategory function
    const deleteCategoryHandler = () => {
        let element = document.getElementById("cats");
        reduxDispatch(deleteCategory(element.value));
        setCategoryChosen("Choose category")
    }

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={1}>
                    <Link to="/admin/products" className='btn btn-info my-3'>
                        Go back
                    </Link>
                </Col>
                <Col md={6}>
                    <h1> Create a new product</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <FormGroup className='mb-3' controlId='formBasicName'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control name='name' required type='text' />
                        </FormGroup>
                        <FormGroup className='mb-3' controlId='exampleForm.ControlTextarea1'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control name='description' required as='textarea' rows={3} />
                        </FormGroup>
                        <FormGroup className='mb-3' controlId='formBasicCount'>
                            <Form.Label>Count in stock</Form.Label>
                            <Form.Control name='count' required type='number' />
                        </FormGroup>
                        <FormGroup className='mb-3' controlId='formBasicPrice'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control name='price' required type='text' />
                        </FormGroup>
                        <FormGroup className='mb-3' controlId='formBasicCategory'>
                            <Form.Label>
                                Category
                                <CloseButton onClick={deleteCategoryHandler} />(<small>remove selected</small>)
                            </Form.Label>
                            <Form.Select
                                id="cats"
                                required
                                name="category"
                                aria-label="Default select example">
                                <option value="Choose category">Choose category</option>
                                {categories.map((category, idx) => (
                                    <option key={idx} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </FormGroup>
                        <Form.Group className="mb-3" controlId="formBasicNewCategory">
                            <Form.Label>
                                Or create a new category (e.g. Computers/Laptops/Intel){" "}
                            </Form.Label>
                            <Form.Control onKeyUp={newCategoryHandler} name="newCategory" type="text" />
                        </Form.Group>
                        <Row className='mt-5'>
                            <Col md={6}>
                                <Form.Group className='mb-3' controlId="formBasicAttributes">
                                    <Form.Label>Choose attribute and set value</Form.Label>
                                    <Form.Select name="atrrKey" aria-label="Default select example">
                                        <option>Choose attribute</option>
                                        <option value="red">color</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col >
                            <Col md={6}>
                                <Form.Group className='mb-3' controlId="formBasicAttributeValue">
                                    <Form.Label>Attribute value</Form.Label>
                                    <Form.Select name="atrrKey" aria-label="Default select example">
                                        <option>Choose attribute value</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>Attribute</th>
                                        <th>Value</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>attr key</td>
                                        <td>atrr value</td>
                                        <td><CloseButton /></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className='mb-3' controlId="formBasicNewAttribute">
                                    <Form.Label> Create new attribute </Form.Label>
                                    <Form.Control
                                        disabled={categoryChosen === "Choose category"}
                                        placeholder='first choose or create category'
                                        name='newAttrValue'
                                        type='text'
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className='mb-3' controlId="formBasicNewAttributeValue">
                                    <Form.Label> Attribute value</Form.Label>
                                    <Form.Control
                                        disabled={categoryChosen === "Choose category"}
                                        required={true}
                                        placeholder='first choose or create category'
                                        name='newAttrValue'
                                        type='text'
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Alert variant='primary'>
                            After typing attribute key and value press enter on one of the field
                        </Alert>
                        <FormGroup controlId='formFileMultiple' className='mb-3 mt-3'>
                            <Form.Label>Images</Form.Label>
                            <Form.Control required type="file" multiple onChange={(e) =>
                                uploadHandler(e.target.files)} />
                            {isCreating}
                        </FormGroup>
                        <Button variant='primary' type="submit">
                            Create
                        </Button>
                        {createProductResponseState.error ?? ""}
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default CreateProductPageComponent;