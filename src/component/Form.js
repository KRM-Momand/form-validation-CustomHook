import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Form , Button, Row, Col} from 'react-bootstrap';

function FormComp() {
    const [formData, setFormData] = useState({username: ''});
    const [error, setError] = useState(null);

    const onsubmitHandler = (e) => {
        e.preventDefault();

        onBlurHandler();

        if(!error && formData.username){
            console.log('Data Successfully Submitted', formData);
        }

    }

    const onChangeHandler = (e) => {
        const {name , value} = e.target;

        setFormData(prevData => ({
            ...prevData, 
            [name]: value
        }));

        if(name === 'username' && value){
            setError(null);
        }
    }

    const onBlurHandler = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!formData.username){
            setError('Email should not be Empty')
        } else if(!emailRegex.test(formData.username)){
            setError('Please enter Valid Email Address');
        } else {setError(null)}
    }

  return (
    <div>
        <Form onSubmit={onsubmitHandler}>
            <Form.Group as={Row} className='align-items-center'>
                <Form.Label column sm={3} htmlFor='email' className='col-3'>email</Form.Label>
                <Col sm={9} >
                    <Form.Control type='text' id='email' name='username' value={formData.username} onBlur={onBlurHandler} onChange={onChangeHandler} />
                </Col>
            </Form.Group>
            {error && <p className='small text-danger'> {error} </p>}

            <Button variant='secondary' className='w-100' type='submit' > Submit </Button>

        </Form>
    </div>
  )
}

export default FormComp;
