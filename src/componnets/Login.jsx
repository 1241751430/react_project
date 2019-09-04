import React from 'react'
// 导入semantic ui组件
import { Form } from 'semantic-ui-react'
// 引入Login样式文件
import './Login.css'
class Login extends React.Component {
  render() {
    return (
      <div className="login-container">
        <div className="login-title">登录</div>
        <div className="login-form">
          <Form>
            <Form.Field>
              <Form.Input icon='user' iconPosition='left' size='big' placeholder='请输入用户名...' />
            </Form.Field>
            <Form.Field>
              <Form.Input type='password' icon='lock' iconPosition='left' size='big' placeholder='请输入密码...' />
            </Form.Field>
            <Form.Button type='submit' size='big' positive fluid>登录</Form.Button>
          </Form>
        </div>
      </div>
    )
  }
}
export default Login