import React from 'react'

// 导入Home组件样式
import './Home.css'

import { Grid, Icon } from 'semantic-ui-react'
import { NavLink, Route, Switch } from 'react-router-dom'

import Main from './Home/Main'
import News from './Home/News'
import Chat from './Home/Chat'
import My from './Home/My'

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="home-content">
          <Switch>
            <Route exact path='/home' component={Main}></Route>
            <Route path='/home/news' component={News}></Route>
            <Route path='/home/chat' component={Chat}></Route>
            <Route path='/home/my' component={My}></Route>
          </Switch>
        </div>
        <div className="home-menu">
          <Grid>
            <Grid.Row columns={4}>
              <Grid.Column>
                <NavLink exact to='/home'>
                  <Icon name='building'></Icon>
                  <p>主页</p>
                </NavLink>
              </Grid.Column>
              <Grid.Column>
                <NavLink to='/home/news'>
                  <Icon name='globe'></Icon>
                  <p>资讯</p>
                </NavLink>
              </Grid.Column>
              <Grid.Column>
                <NavLink to='/home/chat'>
                  <Icon name='wechat'></Icon>
                  <p>微聊</p>
                </NavLink>
              </Grid.Column>
              <Grid.Column>
                <NavLink to='/home/my'>
                  <Icon name='user outline'></Icon>
                  <p>我的</p>
                </NavLink>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    )
  }
}
export default Home