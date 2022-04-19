import React from 'react';

export default () => {
  return (
    <div>
      <form name="signin">
        <h3>Sign In</h3>
        <label for="signin-username">create username</label> <br />
        <input name="signin-username" />
        <br />
        <label for="signin-pass">create password</label>
        <br />
        <input name="signin-pass" /> <br />
      </form>

      <h3>Sign Up</h3>
      <form name="signup">
        <label name="username-signup">Enter Name</label>
        <br />
        <input />
        <br />
        <label for="signin-pass">password</label>
        <br />
        <input />
        <br />
        <label for="profile-pic">Enter Profile Picture</label>
        <br />
        <input name="profile-pic" type="file" placeholder="" />
        <br />
      </form>
    </div>
  );
};
