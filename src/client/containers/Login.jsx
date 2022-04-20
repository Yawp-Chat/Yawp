import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function () {
  const [image, setImage] = useState(null);
  const [signingIn, setSigningIn] = useState(true)
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)
    const formProps = Object.fromEntries(formData);

    const data = {
      username: formProps.username,
      password: formProps.password
    }

    console.log('handleSignIn data', data)

    navigate('/home');
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target)
    const formProps = Object.fromEntries(formData);

    const data = {
      username: formProps.username,
      password: formProps.password,
      image,
    }

    console.log('handleSignUp data', data)

    navigate('/home');
  };

  const signInPage = () => {
    return <>
      <h3>Sign In</h3>

      <button onClick={() => setSigningIn(false)}>Don't have an account? Sign up here</button> <br />

      <form name="signin" onSubmit={(e) => handleSignIn(e)}>
        <label htmlFor="username">Enter Username</label> <br />
        <input name="username" />
        <br />
        <label htmlFor="password">Enter Password</label>
        <br />
        <input name="password" /> <br />
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
        <label htmlFor="password">Create Password</label>
        <br />
        <input name="password" />
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
