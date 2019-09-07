import React from 'react'
import './Main.css'
import { Input, Grid, Icon, Item, Button, Dimmer, Loader} from 'semantic-ui-react'
import "react-image-gallery/styles/css/image-gallery.css"
// 导入轮播图组件
import ImageGallery from 'react-image-gallery'
class Main extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      images: [],
      menuList: [],
      infoList: [],
      askList: [],
      houseList: [],
      loading: true
    }
  }
  // // 获取轮播图数据
  // getImages = async () => {
  //   let res = await this.axios.post('homes/swipe')
  //   let { meta, data } = res
  //   if (meta.status === 200) {
  //     this.setState({
  //       images: data.list
  //     })
  //   }
  // }
  // // 获取菜单数据集
  // getMenuList = async () => {
  //   let res = await this.axios.post('homes/menu')
  //   let { meta, data } = res
  //   // console.log(res)
  //   if (meta.status === 200) {
  //     this.setState({
  //       menuList: data.list
  //     })
  //   }
  // }
  // // 获取好客资讯数据
  // getInfoList = async () => {
  //   let res = await this.axios.post('homes/info')
  //   let { meta, data } = res
  //   // console.log(res)
  //   if (meta.status === 200) {
  //     this.setState({
  //       infoList: data.list
  //     })
  //   }
  // }
  // // 获取好客问答数据集
  // getaskList = async () => {
  //   let res = await this.axios.post('homes/faq')
  //   let { meta, data } = res
  //   // console.log(res)
  //   if (meta.status === 200) {
  //     this.setState({
  //       askList: data.list
  //     })
  //   }
  // }
  // // 获取房屋信息数据集
  // gethouseList = async () => {
  //   let res = await this.axios.post('homes/house')
  //   let { meta, data } = res
  //   // console.log(res)
  //   if (meta.status === 200) {
  //     this.setState({
  //       houseList: data.list
  //     })
  //   }
  // }

  doRequest = (url, dataName) => {
    return this.axios.post(url).then(res => {
      let { meta, data } = res
      if (meta.status === 200) {
        this.setState({
          [ dataName ]: data.list
        })
      }
    })
  }
  // 页面加载完成，需要发送Ajax请求，获取轮播图数据
  async componentDidMount () {
    // Promise.all()
    await Promise.all([
      this.doRequest('homes/swipe', 'images'),
      this.doRequest('homes/menu', 'menuList'),
      this.doRequest('homes/info', 'infoList'),
      this.doRequest('homes/faq', 'faqList'),
      this.doRequest('homes/house', 'houseList')
    ])
    this.setState({
      loading: false
    })
  }

  render () {
    return (
      <div className="main">
        <div className="serch">
          <Input
            icon={{ name: 'search', circular: true, link: true }}
            placeholder='搜房源...'
            fluid
            size='big'
          />
        </div>
        <div className="container">
          {/* 加载等待效果 */}
          <Dimmer inverted active={this.state.loading} page>
            <Loader>Loading</Loader>
          </Dimmer>
          {/* 轮播图 */}
          <ImageGallery
            items={this.state.images}
            showPlayButton={false}
            showFullscreenButton={false}
            showBullets={true}
            showThumbnails={false}
            autoPlay={true}
          />
          {/* 菜单栏 */}
          <MenuList data={this.state.menuList}></MenuList>
          {/* 好客资讯 */}
          <InfoList data={this.state.infoList}></InfoList>
          {/* 好客问答 */}
          <AskList data={this.state.askList}></AskList>
          {/* 房屋信息部分 */}
          <HouseList data={this.state.houseList} />
        </div>
      </div>
    )
  }
}
export default Main

// 定义菜单组件，渲染菜单数据
// 参数的解构
function MenuList ({ data }) {

  return (
    <Grid className='main-menu' divided padded >
      <Grid.Row columns={4}>
        {data.map(item => (

          <Grid.Column key={item.id}>
            <Icon name='home' size='large' />
            <p>{item.menu_name}</p>
          </Grid.Column>

        ))}
      </Grid.Row>
    </Grid>
  )
}

// 好客资讯组件
function InfoList ({ data }) {
  return (
    <div className="home-msg">
      <Item.Group unstackable>
        <Item className="home-msg-img">
          <Item.Image
            size="tiny"
            src={'http://47.96.21.88:8086/public/zixun.png'}
          />
          <Item.Content verticalAlign="top">
            {data.map(item => (
              <Item.Header key={item.id}>
                <span>限购 ●</span>
                <span>{item.info_title}</span>
              </Item.Header>
            ))}
            <div className="home-msg-more">
              <Icon name="angle right" size="big" />
            </div>
          </Item.Content>
        </Item>
      </Item.Group>
    </div>
  )
}
// 好客问答组件
function AskList ({ data }) {
  return (
    <div className="home-ask">
      <div className="home-ask-title">好客问答</div>
      <ul>
        {data.map(item => (
          <li key={item.question_id}>
            <div>
              <Icon name='question circle outline' color='green'></Icon>
              <span>{item.question_name}</span>
            </div>
            <div>
              {item.question_tag.split(',').map(tag => (
                <Button basic color='green' size="mini" key={tag}>{tag}</Button>
              ))}
              <div>
                {item.atime} ● <Icon name='comment alternate outline'></Icon>{item.qnum}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
// 房屋信息组件
function HouseList ({ data }) {
  console.log(data)
  let newHouse = []
  let oldHouse = []
  let hireHouse = []
  data.forEach(item => {
    let temp = (
      <Item key={item.id}>
        <Item.Image src="http://47.96.21.88:8086/public/home.png" />
        <Item.Content>
          <Item.Header>{item.home_name}</Item.Header>
          <Item.Meta>
            <span className="cinema">{item.home_desc}</span>
          </Item.Meta>
          <Item.Description>
            {item.home_tags.split(',').map(tag => (
              <Button key={tag} basic color="green" size="mini">
                {tag}
              </Button>
            ))}
          </Item.Description>
          <Item.Description>{item.home_price}</Item.Description>
        </Item.Content>
      </Item>
    )
    if (item.home_type === 1) {
      newHouse.push(temp)
    } else if (item.home_type === 2) {
      oldHouse.push(temp)
    } else {
      hireHouse.push(temp)
    }
  })

  return (
    <div>
      <div>
        <div className="home-hire-title">最新开盘</div>
        <Item.Group divided unstackable>
          {newHouse}
        </Item.Group>
      </div>
      <div>
        <div className="home-hire-title">二手精选</div>
        <Item.Group divided unstackable>
          {oldHouse}
        </Item.Group>
      </div>
      <div>
        <div className="home-hire-title">组一个家</div>
        <Item.Group divided unstackable>
          {hireHouse}
        </Item.Group>
      </div>
    </div>
  )
}
