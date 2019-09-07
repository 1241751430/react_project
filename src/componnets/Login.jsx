import React from 'react'
// 导入semantic ui组件
import { Form } from 'semantic-ui-react'
// 引入Login样式文件
import './Login.css'

// 引入 
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  // 构造函数
  constructor(props) {
    super(props)
    this.state = {
      uname: '',
      pwd: ''
    }
  }

  // 用于登录
  login = async e => {
    e.preventDefault()
    let { uname, pwd } = this.state
    let { history } = this.props

    // 发送 POST 请求
    // await 必须在 async 函数中执行 await 可以在promise 对象前面使用
    // await 会暂停async 的执行 ，等待promis的结果，才会继续执行 async 函数
    let res = await this.axios({
      method: 'post',
      url: 'users/login',
      data: {
        uname,
        pwd
      }
    })
    let { meta, data } = res
    if (meta.status === 200) {
      // 如果登录成功 把 token 保存在浏览器
      localStorage.setItem('myToken', data.token)
      // 跳转 Home组件
      history.push('/home')
    } else {
      console.log('账号或密码错误')
    }
  }

  // 用于处理受控组件
  handleChange = e => {
    let { name, value } = e.target
    this.setState({
      [name]: value
    })
  }


  render() {
    return (
      <div className="login-container">
        <div className="login-title">登录</div>
        <div className="login-form">
          <Form action="" onSubmit={this.login}>
            <Form.Field>
              <Form.Input
                size="big"
                icon="user"
                iconPosition="left"
                placeholder="请输入用户名..."
                name="uname"
                autoComplete="off"
                value={this.state.uname}
                onChange={this.handleChange}
                required
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                type='password'
                size="big"
                icon="lock"
                iconPosition="left"
                placeholder="请输入密码..."
                name="pwd"
                autoComplete="off"
                value={this.state.pwd}
                onChange={this.handleChange}
                required
              />
            </Form.Field>
            <Form.Field>
              <Form.Button fluid positive size="big">
                登录
              </Form.Button>
            </Form.Field>
          </Form>
        </div>
      </div>
    )
  }
}
export default withRouter(Login)