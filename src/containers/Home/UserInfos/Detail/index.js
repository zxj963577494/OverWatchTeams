import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { WhiteSpace, List, Result } from 'antd-mobile'
import { RANKS, TEAMPOSITIONS } from '../../../../constants'
import { setNavBar, getHomeUserInfoDetailRequest } from '../../../../actions'
import config from '../../../../config'
import { MyActivityIndicator } from '../../../../components'

class HomeUserInfoDetail extends Component {
  componentDidMount() {
    this.props.setNavBar({ title: '个人详情', isCanBack: true })
    if (!this.props.userinfo) {
      const id = this.props.match.params.id
      this.props.getUserById({ objectId: id })
    }
  }

  render() {
    let { userinfo, current, app } = this.props
    if (userinfo == null && current != null) {
      userinfo = current
    }
    return (
      <div>
        <MyActivityIndicator isFetching={app.isFetching} text={app.text} />
        <WhiteSpace />
        <Result
          img={
            <img
              width="60px"
              height="60px"
              style={{ borderRadius: '50%' }}
              src={userinfo.avatar ? userinfo.avatar : config.BASE_DEFAULT_PIC_URL}
              alt={userinfo.nickname}
            />
          }
          title={userinfo.nickname}
          message={userinfo.introduction}
        />
        <WhiteSpace />
        <List>
          <List.Item extra={userinfo.rankscore ? userinfo.rankscore + '分' : '未知'}>
            天梯分
          </List.Item>
          <List.Item
            extra={
              userinfo.rank
                ? RANKS.filter(x => x.value === userinfo.rank)[0].label
                : '未知'
            }
          >
            天梯段位
          </List.Item>
          <List.Item
            extra={
              userinfo.position
                ? TEAMPOSITIONS.filter(x => x.value === userinfo.position)[0].label
                : '未知'
            }
          >
            团队定位
          </List.Item>
        </List>
        <List renderHeader={() => '擅长英雄'}>
          <List.Item style={{ textAlign: 'center' }}>
            {userinfo.heros ? (
              userinfo.heros.map((item, index) => {
                return (
                  <img
                    key={index}
                    style={{
                      borderRadius: '50%',
                      width: '60px',
                      height: '60px',
                      margin: '10px'
                    }}
                    src={item.image}
                    alt={item.label}
                  />
                )
              })
            ) : (
              <img
                style={{
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  margin: '10px'
                }}
                src={config.BASE_DEFAULT_PIC_URL}
                alt="未知"
              />
            )}
          </List.Item>
        </List>
        <List renderHeader={() => '个人比赛经历'}>
          <List.Item wrap>{userinfo.match}</List.Item>
        </List>
        <List renderHeader={() => '其他'}>
          <List.Item extra={userinfo.mouse ? userinfo.mouse : '未知'}>鼠标</List.Item>
          <List.Item extra={userinfo.keyboard ? userinfo.keyboard : '未知'}>
            键盘
          </List.Item>
          <List.Item extra={userinfo.headphones ? userinfo.headphones : '未知'}>
            耳机
          </List.Item>
        </List>
        <WhiteSpace />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app,
    current: state.user.home.userinfo.current,
    userinfo: state.user.home.userinfo.list.filter(
      x => x.objectId === ownProps.match.params.id
    )[0]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUserById: payload => {
      dispatch(getHomeUserInfoDetailRequest(payload))
    },
    setNavBar: payload => {
      dispatch(
        setNavBar({ title: payload.title, isCanBack: payload.isCanBack })
      )
    }
  }
}

HomeUserInfoDetail.propTypes = {
  app: PropTypes.object,
  current: PropTypes.object,
  userinfo: PropTypes.object,
  getUserById: PropTypes.func.isRequired,
  setNavBar: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeUserInfoDetail)
