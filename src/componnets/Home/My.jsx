import React from 'react'
class My extends React.Component {
  render () {
    return (
      <div className="my-container">
        <SelectAvatar open={this.state.isShowSelect} showCrop={this.showCrop} />
        <CropAvatar
          open={this.state.isShowCrop}
          avatarFile={this.state.avatarFile}
          closeCrop={this.closeCrop}
        />
        <div className="my-title">
          <img src={'http://127.0.0.1:9999/public/my-bg.png'} alt="me" />
          <div className="info">
            <div className="myicon">
              {/* 给头像注册点击事件，显示选择头像的弹窗 */}
              <img
                src={this.state.avatar}
                alt="icon"
                onClick={this.showSelect}
              />
            </div>
            <div className="name">{this.state.username}</div>
            <Button color="green" size="mini">
              已认证
                </Button>
            <div className="edit">编辑个人资料</div>
          </div>
        </div>
        <Grid padded className="my-menu">
          <Grid.Row columns={3}>
            <Grid.Column>
              <Icon name="clock outline" size="big" />
              <div>看房记录</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name="yen sign" size="big" />
              <div>我的订单</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name="bookmark outline" size="big" />
              <div>我的收藏</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name="user outline" size="big" />
              <div>个人资料</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name="home" size="big" />
              <div>身份认证</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name="microphone" size="big" />
              <div>联系我们</div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div className="my-ad">
          <img src={'http://127.0.0.1:9999/public/ad.png'} alt="" />
        </div>
      </div>
    )
  }
}
export default My