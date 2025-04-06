import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Col, Row, Button} from 'react-bootstrap';
import useFormValidation from '../hooks/useFormValidation';

function FormComp() {
    const {formData, error, onChangeHandler, onBlurHandler, onSubmitHandler} = useFormValidation();
  return (
    <div>
        <Form className='container bg-light p-3' onSubmit={onSubmitHandler}>
            <Form.Group as={Row} className=''>
                <Form.Label column xs={3} htmlFor='email' className='text-primary '>Email</Form.Label>
                <Col xs={9}>
                    <Form.Control type='text' id='email' name='email' value={formData.email} onChange={onChangeHandler} onBlur={onBlurHandler} />
                </Col>
                <p className='small text-danger'>{error.emailError}</p>
            </Form.Group>

            <Form.Group as={Row} className=''>
                <Form.Label column xs={3} htmlFor='password' className='text-primary '>Password</Form.Label>
                <Col xs={9}>
                    <Form.Control type='password' id='password' name='password' value={formData.password} onChange={onChangeHandler} onBlur={onBlurHandler} />
                </Col>
                <p className='small text-danger'>{error.passwordError}</p>
            </Form.Group>

            <Button className='w-100 mt-2' type='submit'>
                Submit
            </Button>
        </Form>
      
    </div>
  )
}

export default FormComp;
