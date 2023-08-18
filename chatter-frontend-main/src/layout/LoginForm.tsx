import Field from '../components/Home/Field';
import React, { useEffect, useState } from 'react';
import FormData from 'form-data';
import Link from 'next/link';
import { LoginData } from '../types/login';
import apiClient from '../utils/client';
import { useAppDispatch } from '../redux/hooks';
import { setLoginData, setUserData } from '../redux/userSlice';
import { setChatsData } from '../redux/chatsSlice';
import apiBaseURL from '../utils/api_base_url';

function LoginForm() {
  const initialValues: LoginData = {
    email: '',
    password: ''
  };

  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<LoginData>(initialValues);
  const data = new FormData();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleLogin = () => {
    resetForm();
    data.append('email', formData.email);
    data.append('password', formData.password);

    /* 
      TODO: 
      1. Check login
      2. Handle errors (if there is at least one) 
    */

    apiClient.post("login", data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

      .then(loginResponse => {
        
        apiClient.get("/users", {
          headers: {
            'Authorization': 'Bearer ' + loginResponse.data.token,
            'Content-Type': 'multipart/form-data'
          }
        })

        .then(clientResponse => {
          dispatch(setLoginData({
            userId: clientResponse.data.userId,
            authToken: loginResponse.data.token
          }))

            dispatch(setUserData({
              userId: clientResponse.data.userId,
              name: clientResponse.data.name,
              lastName: clientResponse.data.lastName,
              email: clientResponse.data.email,
              photo: apiBaseURL + clientResponse.data.image
            }))       

            // This dispatch is here to avoid buggy renders when deleting an account.
            dispatch(setChatsData([]))
            window.location.href = "/chat";
        })
        
      })

      .catch(err => {
        alert("Invalid email or password.");
        console.log(err);
        
      })

      
    
    
  };

  const resetForm = () => {
    // data.delete('email');
    // data.delete('password');
  };

  return (
    <div
      id="login"
      className="right-side d-flex flex-column justify-content-center w-50 bg-chatter-green h-100 py-5 fs-1 fw-bold"
    >
      <Field
        title="E-MAIL"
        type="email"
        name="email"
        placeholder="Ingresa tu correo electrónico"
        onChange={handleInputChange}
      />

      <Field
        title="CONTRASEÑA"
        type="password"
        name="password"
        placeholder="Ingresa tu contraseña"
        onChange={handleInputChange}
      />

      <div className="content d-flex flex-column mb-5 d-flex align-items-start" data-aos="fade">
        <button type="submit" className="btn btn-primary" onClick={handleLogin}>
          Ingresar
        </button>
      </div>

      <div className="content text d-flex flex-row gap-2 mb-5 fs-6 fst-italic" data-aos="fade">
        <span>No tienes una cuenta?</span>
        <Link href="/register" className="text-chatter-blue">
          Registrate aquí
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
