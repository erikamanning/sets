import React from "react"

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const LoginForm = (props) => {
  return (
      <div>
        <h1>Login</h1>
        <div className="row justify-content-center">
            <div className="col-12 col-sm-3">
                <Form>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" name="username" id="username" placeholder="your username here" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="your password here" />
                    </FormGroup>
                    <Button color='primary'>Submit</Button>
                </Form>
            </div>
        </div>
      </div>
  );
}

export default LoginForm;