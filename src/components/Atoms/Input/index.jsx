import React, { useState } from 'react';
import { Field, useFormikContext, ErrorMessage } from 'formik';
import Flatpickr from 'react-flatpickr';
import TogglePasswordIcon from '../TogglePasswordIcon';
import { StyledSelect, Error } from './Input.styles';

const Input = ({ name, type, placeholder, options, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [passwordShow, setPasswordShow] = useState(false);

  return (
    <>
      {type === 'password' ? (
        <>
          <Field
            name={name}
            type={passwordShow ? 'text' : 'password'}
            className="form-control"
            placeholder={placeholder}
            {...props}
          />
          <TogglePasswordIcon onClick={() => setPasswordShow(!passwordShow)} {...props} />
        </>
      ) : type === 'date' ? (
        <Flatpickr
          name={name}
          type={type}
          className="form-control"
          options={{
            dateFormat: 'd M, Y',
            onChange: e => {
              setFieldValue(name, new Date(e));
            },
          }}
          placeholder={placeholder}
          {...props}
        />
      ) : type === 'checkbox' ? (
        <Field name={name} type={type} className="form-check-input" />
      ) : type === 'select' ? (
        <StyledSelect name={name} options={options} {...props} />
      ) : (
        <Field name={name} type={type} className="form-control" placeholder={placeholder} {...props} />
      )}

      {/* ErrorMessage component */}
      <ErrorMessage name={name}>{msg => <Error type="invalid">{msg}</Error>}</ErrorMessage>
    </>
  );
};

export default Input;
