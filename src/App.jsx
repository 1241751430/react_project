import React from 'react'
// 导入路由
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// 导入semantic 样式组件
import 'semantic-ui-css/semantic.min.css'
// 导入组件
import Home from './componnets/Home'
import Login from './componnets/Login'
class App extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					{/* 配置路由 */}
					<Redirect exact path='/' to='/login' ></Redirect>
					<Route path='/login' component={Login}></Route>
					<Route path='/home' component={Home}></Route>
				</Switch>
			</Router>
		)
	}
}
export default App