import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { WhiteSpace, List, Result } from 'antd-mobile'
import { RANKS, TEAMPOSITIONS } from '../../../../constants'
import { setNavBar, getHomeUserDetailRequest } from '../../../../actions'
import config from '../../../../config'
import { MyActivityIndicator } from '../../../../components'

class HomeUserDetail extends Component {
  componentDidMount() {
    this.props.setNavBar({ title: '个人详情', isCanBack: true })
    if (!this.props.user) {
      const id = this.props.match.params.id
      this.props.getUserById({ objectId: id })
    }
  }

  render() {
    let { user, current, app } = this.props
    if (user == null && current != null) {
      user = current
    }
    return (
      <div>
        <MyActivityIndicator
          isFetching={app.isFetching}
          text={app.text}
        />
        <WhiteSpace />
        <Result
          img={
            <img
              width="60px"
              height="60px"
              style={{ borderRadius: '50%' }}
              src={user.avatar ? user.avatar : config.BASE_DEFAULT_PIC_URL}
              alt={user.nickname}
            />
          }
          title={user.nickname}
          message={user.introduction}
        />
        <WhiteSpace />
        <List>
          <List.Item extra={user.rankscore ? user.rankscore + '分' : '未知'}>
            天梯分
          </List.Item>
          <List.Item
            extra={
              user.rank
                ? RANKS.filter(x => x.value === user.rank)[0].label
                : '未知'
            }
          >
            天梯段位
          </List.Item>
        </List>
        <List>
          <List.Item
            extra={
              user.position
                ? TEAMPOSITIONS.filter(x => x.value === user.position)[0].label
                : '未知'
            }
          >
            团队定位
          </List.Item>
        </List>
        <List renderHeader={() => '擅长英雄'}>
          <List.Item style={{ textAlign: 'center' }}>
            {user.heros ? (
              user.heros.map((item, index) => {
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
          <List.Item wrap>{user.match}</List.Item>
        </List>
        <List renderHeader={() => '其他'}>
          <List.Item extra={user.mouse}>鼠标</List.Item>
          <List.Item extra={user.keyboard}>键盘</List.Item>
          <List.Item extra={user.headphones}>耳机</List.Item>
        </List>
        <WhiteSpace />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.root.app,
    current: state.root.user.home.user.current,
    user: state.root.user.home.user.list.filter(
      x => x.userid === ownProps.match.params.id
    )[0]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUserById: payload => {
      dispatch(getHomeUserDetailRequest(payload))
    },
    setNavBar: payload => {
      dispatch(
        setNavBar({ title: payload.title, isCanBack: payload.isCanBack })
      )
    }
  }
}

HomeUserDetail.propTypes = {
  app: PropTypes.object,
  current: PropTypes.object,
  user: PropTypes.object,
  getUserById: PropTypes.func.isRequired,
  setNavBar: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeUserDetail)
