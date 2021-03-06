import React from 'react'

import Tloader from 'react-touch-loader'
// 导入资讯样式文件
import './News.css'
// 导入ui 组件
import { Tab, Item, ItemGroup, Icon } from 'semantic-ui-react'

class News extends React.Component {

  render () {
    const panes = [
      {
        menuItem: '资讯', render: () => <Tab.Pane>
          <M1></M1>
        </Tab.Pane>
      },
      {
        menuItem: '头条', render: () =>
          <Tab.Pane>
            <M2></M2>
          </Tab.Pane>
      },
      {
        menuItem: '问答', render: () => <Tab.Pane>
          <M3></M3>
        </Tab.Pane>
      },
    ]
    return (
      <div className="news-container">
        <div className="news-title">资　讯</div>
        <div className="news-content">
          <Tab panes={panes} />
        </div>
      </div>
    )
  }
}
export default News

function M1 () {
  return <Loder type='1'></Loder>
}
function M2 () {
  return <Loder type='2'></Loder>
}
function M3 () {
  return <Loder type='3'></Loder>
}


// Message组件
function RecoMessage ({ data }) {
  // console.log(data)
  return (
    <ItemGroup unstackable>
      {data.map(item => (
        <Item key={item.id}>
          <Item.Image size='small' src='http://47.96.21.88:8086/public/1.png'></Item.Image>
          <Item.Content verticalAlign='middle'>
            <Item.Header className='info-title'>{item.info_title}</Item.Header>
            <Item.Meta>
              <span className='price'>$666</span>
              <span className='stay'>1 Month</span>
            </Item.Meta>
          </Item.Content>
        </Item>
      ))}
    </ItemGroup>
  )
}

// 问答组件
function Answer ({ data }) {
  console.log(data)
  return (
    <ul className='info-ask-list'>
      {data.map(item => (
        <li key={item.id}>
          <div className="title">
            <span className="cate">
              <Icon color='green' name='user' size='small'></Icon>
              思维
          </span>
            <span>{item.question_name}</span>
          </div>
          <div className="user">
            <Icon circular name='users' size='mini'></Icon>
            {item.username}的回答
          </div>
          <div className="info">
            {item.answer_content}
          </div>
          <div className="tag">
            {item.question_tag.split(',').map(tag => (
              <span key={tag}>{tag}</span>
            ))}
            <span>{item.qnum}个回答</span>
          </div>
        </li>
      ))}
    </ul>
  )
}

// 下拉刷新
class Loder extends React.Component {
  constructor () {
    super()
    this.state = {
      hasMore: false,
      initializing: 1,
      pagenum: 0,   //从第几条开始拿
      pagesize: 2,    //需要获取多少条
      list: [],   //用来保存数据
      total: 0
    }
  }

  // 加载数据
  loadData = () => {
    // 发送ajax请求，动态加载数据
    // console.log(this.props.type)
    return this.axios
      .post('infos/list', {
        type: this.props.type,
        pagenum: this.state.pagenum,
        pagesize: this.state.pagesize
      })
      .then(res => {
        let { meta, data } = res
        if (meta.status === 200) {
          return data.list
        }
      })
  }
  // 需要在组件渲染的时候，动态的加载数据
  async componentDidMount () {
    let data = await this.loadData()
    let newNum = this.state.pagenum + this.state.pagesize
    this.setState({
      list: data.data,
      initializing: 2,
      toal: data.total,
      pagenum: newNum,
      hasMore: newNum < data.total
    })
  }
  // 下拉刷新
  loadMore = async (resolve, reject) => {
    let data = await this.loadData()
    let newNum = this.state.pagenum + this.state.pagesize
    let newList = [ ...this.state.list, ...data.data ]
    this.setState({
      list: newList,
      initializing: 2,
      toal: data.total,
      pagenum: newNum,
      hasMore: newNum < data.total
    })
    resolve()
  }
  // 加载更多
  refresh = async (resolve, reject) => {
    // 重置初始的条数
    // react的setState是异步的，通过setState修改react内部的数据，不是立即更新的
    // 如果就想获取立即更新的数据
    this.setState({
      pagenum: 0
    })
    setTimeout(async () => {
      let data = await this.loadData()
      let newNum = this.state.pagenum + this.state.pagesize
      this.setState({
        list: data.data,
        pagenum: newNum,
        hasMore: newNum < data.total
      })
      resolve()
    }, 0)
  }

  render () {
    // 参数解构
    let { hasMore, initializing, list } = this.state
    let { type } = this.props
    return (
      <div className="vew">
        {/* 刷新组件 */}
        <Tloader
          className="main"
          onRefresh={this.refresh}
          onLoadMore={this.loadMore}
          hasMore={hasMore}
          initializing={initializing}
        >
          {type === '3' ? <Answer data={list}></Answer> : <RecoMessage data={list}></RecoMessage>}
        </Tloader>
      </div>
    )
  }
}