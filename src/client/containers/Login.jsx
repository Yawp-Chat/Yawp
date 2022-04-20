import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ({ setUsername }) {
  const [image, setImage] = useState(null);
  const [signingIn, setSigningIn] = useState(true)
  const navigate = useNavigate();
  const loginPasswordRef = useRef();

  const handleLogIn = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)
    const formProps = Object.fromEntries(formData);

    const { username, usersecret } = formProps

    const userData = {
      username,
      usersecret
    }

    console.log('userData:', userData);

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
    })
      .then(res => res.json())
      .then(data => {
        if (data.auth) {
          setUsername(username);
          navigate('/home');
        } else {
          loginPasswordRef.current.value = ""
        }
      })
      .catch(err => {
        console.log('Error signing in:', err);
      });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target)
    const formProps = Object.fromEntries(formData);

    const { username, usersecret } = formProps

    const userData = {
      username,
      usersecret
    }
    
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(res => res.json())
      .then(data => {
        if (data.auth) {
          setUsername(username);
          navigate('/home');
        } else {
          loginPasswordRef.current.value = ""
        }
      })
      .catch(err => {
        console.log('Error signing up:', err)
      })
  };

  const signInPage = () => {
    return <>
      <h3>Sign In</h3>

      <button onClick={() => setSigningIn(false)}>Don't have an account? Sign up here</button> <br />

      <form name="signin" onSubmit={(e) => handleLogIn(e)}>
        <label htmlFor="username">Enter Username</label> <br />
        <input name="username" />
        <br />
        <label htmlFor="usersecret">Enter Password</label>
        <br />
        <input ref={loginPasswordRef} name="usersecret" /> <br />
        <button type="submit">Submit</button>
      </form>
    </>
  }

  const signUpPage = () => {
    return <>
      <h3>Sign Up</h3>

      <button onClick={() => setSigningIn(true)}>Already a user? Sign in here</button> <br />

      <form name="signup" onSubmit={(e) => handleSignUp(e)}>
        <label htmlFor="username">Create Username</label>
        <br />
        <input name="username" />
        <br />
        <label htmlFor="usersecret">Create Password</label>
        <br />
        <input name="usersecret" />
        <br />
        <label htmlFor="image">Choose Profile Picture</label>
        <br />
        <input name="image" type="file" placeholder="" onChange={
          (e) => {
            console.log(e.target.files[0])
            setImage(e.target.files[0])
          }
        }/>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  }

  return (
    <div>
      {image ? <img
        alt="no image"
        width="250px"
        src={URL.createObjectURL(new Blob([image], { type: "application/zip" }))}
      /> : null}
      {signingIn ? signInPage() : signUpPage()}
    </div>
  );
}
