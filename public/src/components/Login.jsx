import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Grid } from 'semantic-ui-react';
import InputField from './InputField';

const Login = ({ username, password1, password2, pristine, handleOnChange, handleOnSubmit }) => {
  return (
    <Grid columns='equal'>
      <Grid.Column>
      </Grid.Column>
      <Grid.Column width={8}>
        <Form
          error={username.status || password1.status || password2.status}
          onSubmit={handleOnSubmit(username, password1, password2)}
        >
          <InputField
            id="username"
            validationState={username.status}
            errMsg={username.errMsg}
            label="使用者帳號"
            type="text"
            placeholder="請輸入使用者帳號"
            onChange={handleOnChange}
          />
          <InputField
            id="password1"
            validationState={password1.status}
            errMsg={password1.errMsg}
            label="密碼 1"
            type="password"
            placeholder="請輸入密碼"
            onChange={handleOnChange}
          />
          <InputField
            id="password2"
            validationState={password2.status}
            errMsg={password2.errMsg}
            label="密碼 2"
            type="password"
            placeholder="請輸入密碼"
            onChange={handleOnChange}
          />
          <div className="actions">
            <Button
              content='read my name'
              positive
              onClick={handleOnSubmit(username, password1, password2)}
            />
            <Button content='清除' onClick={pristine()} />
          </div>
        </Form>
      </Grid.Column>
      <Grid.Column>
      </Grid.Column>
    </Grid>
  );
};

Login.propTypes = {
  username: PropTypes.shape().isRequired,
  password1: PropTypes.shape().isRequired,
  password2: PropTypes.shape().isRequired,
  pristine: PropTypes.func.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired
};

export default Login;
