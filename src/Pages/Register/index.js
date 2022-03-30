import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api';
import './style.css';
import brasao from '../../Images/brasaoleao.png'

function Register() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [success, setSuccess] = useState(true)

  const redirect = useNavigate()

  async function handleForm(event){
    event.preventDefault();

    if(password !== password2){
      setPasswordsMatch(false);
    } else {

      setPasswordsMatch(true);

      await api.post('/auth/register', {
        name: username,
        email: email,
        password: password,
      }).then(response => {
        localStorage.setItem('user', response.data.user._id);
        localStorage.setItem('token', response.data.token);
        console.log(response);
        redirect('/')
        window.location.reload();
      }).catch(error => {
        setSuccess(false);
      });   

    }

  }

  return (
    <div className="Tudo">
      <div className="CaixaRegistro">
        <h1 className="tituloRegistro">Registro</h1>
        <form autoComplete="off"
        onSubmit={handleForm}
        >
          <input
            type='text'
            id='username'
            className='inputi'
            value={username}
            onChange={event => setUsername(event.target.value)}
            placeholder='Your username'
          />
          <input
            type='email'
            id='email'
            className='inputi'
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder='Your email'
          />
          <input
            type='password'
            id='password'
            className='inputi'
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder='Your password'
          />
          <input
            type='password'
            id='password2'
            className='inputi'
            value={password2}
            onChange={event => setPassword2(event.target.value)}
            placeholder='Confirm password'
          />
          {passwordsMatch ? null : <p className='inputError'>As senhas estão diferentes</p>}
          {
          success ?
            null
            :
            <p className='inputError'>Usuário já Existe</p>
          }
          <button className='register-button' type='submit'>Registro</button>
        </form>

      </div>

      <div className="Brasao">
        <img  className="capiv" src={brasao} />
      </div>
    </div>
  );
}

export default Register;