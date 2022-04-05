import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api';
import './style.css';
import brasao from '../../Images/brasaoleao.png'

function ChangePassword() {

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
      <div className="CaixaAL">
        <h1 className="tituloAL">Alterar Senha</h1>
        <form autoComplete="off"
        onSubmit={handleForm}
        >
          <input
            type='email'
            id='email'
            className='inputino'
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder='Email'
          />
          <input
            type='password'
            id='password'
            className='inputino'
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder='Nova Senha'
          />
          <input
            type='password'
            id='password2'
            className='inputino'
            value={password2}
            onChange={event => setPassword2(event.target.value)}
            placeholder='Confirmar Senha'
          />
          {passwordsMatch ? null : <p className='inputError'>As senhas estão diferentes</p>}
          {
          success ?
            null
            :
            <p className='inputError'>Usuário já Existe</p>
          }
          <button className='AL-button' type='submit'>Salvar Alterações</button>
        </form>

      </div>

      <div className="Brasao">
        <img  className="capiv" src={brasao}  onClick={() => {redirect('/')}}/>
      </div>
    </div>
  );
}

export default ChangePassword;