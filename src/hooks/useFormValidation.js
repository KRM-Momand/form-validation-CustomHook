import { useState } from "react";

function useFormValidation() {
    const [formData, setFormData] = useState({email: '', password: ''});
    const [error, setError] = useState({emailError: '', passwordError: ''});

    const regex = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    }

    const validators = {
        email: (value) => regex.email.test(value) ? null : 'Not a Valid Email',
        password: (value) => regex.password.test(value) ? null : 'Password must contain small/capital letters, at least 1 number and special character'
    }

    const validate = (name, value) => {
        if(!value.trim()){
            setError(prevError => ({
                ...prevError,
                [`${name}Error`]: `${name[0].toUpperCase() + name.slice(1)} should not be empty`
            }))
        } else {
            const errorMsg = validators[name](value);
            if(errorMsg){
                setError(prevError => ({
                    ...prevError,
                    [`${name}Error`]: errorMsg || ''
                }))
            }
        }
    }

    const onChangeHandler = (event) => {
        const {name, value} = event.target;

        setFormData(prevData => ({
            ...prevData, 
            [name]: value
        }))
        
        setError(prevError => ({
            ...prevError, 
            [`${name}Error`]: ''
        }))
    }

    const onBlurHandler = (event) => {
        const {name, value} = event.target;

        validate(name, value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        let isValid = true;

        Object.keys(formData).forEach(name => {
            const errorMsg = validators[name](formData[name]);
            if (errorMsg) {
                setError(prevError => ({
                    ...prevError,
                    [`${name}Error`]: errorMsg
                }));
                isValid = false;
            }
        });

        if (isValid) {
            console.log("Form submitted successfully!");
            setFormData({ email: '', password: '' });
            setError({ emailError: '', passwordError: '' });
        } else {
            console.log("Form contains errors");
        }


    };

    return {
        formData,
        error,
        onChangeHandler,
        onBlurHandler,
        onSubmitHandler
    };
    
}

export default useFormValidation;