import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { WhiteSpace, List, Result } from 'antd-mobile'
import { RANKS, TEAMPOSITIONS } from '../../../../constants'
import { setNavBar, getHomeMemberDetailRequest } from '../../../../actions'
import config from '../../../../config'

class HomeMemberDetail extends Component {
  componentDidMount() {
    this.props.setNavBar({ title: '个人详情', isCanBack: true })
    const id = this.props.match.params.id
    this.props.getMemberById({ objectId: id })
  }

  render() {
    const { navigateTo, member } = this.props
    if (!member) {
      return null
    }
    return (
      <div>
        <WhiteSpace />
        <Result
          img={
            <img
              width="60px"
              height="60px"
              style={{ borderRadius: '50%' }}
              src={
                member.avatar
                  ? member.avatar
                  : config.BASE_PIC_URL + '/logo.png'
              }
              alt={member.nickname}
            />
          }
          title={member.nickname}
          message={member.introduction}
        />
        <WhiteSpace />
        <List>
          <List.Item
            extra={
              member.rank
                ? RANKS.filter(x => x.value === member.rank)[0].label
                : '未知'
            }
          >
            天梯段位
          </List.Item>
        </List>
        <List>
          <List.Item
            extra={
              member.position
                ? TEAMPOSITIONS.filter(x => x.value === member.position)[0]
                    .label
                : '未知'
            }
          >
            团队定位
          </List.Item>
        </List>
        <List renderHeader={() => '擅长英雄'}>
          <List.Item style={{ textAlign: 'center' }}>
            {member.heros ? (
              member.heros.map((item, index) => {
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
                src={config.BASE_PIC_URL + '/logo.png'}
                alt="未知"
              />
            )}
          </List.Item>
        </List>
        <List renderHeader={() => '个人比赛经历'}>
          <List.Item wrap>{member.match}</List.Item>
        </List>
        <List renderHeader={() => '其他'}>
          <List.Item extra={member.mouse}>鼠标</List.Item>
          <List.Item extra={member.keyboard}>键盘</List.Item>
          <List.Item extra={member.headphones}>耳机</List.Item>
        </List>
        <WhiteSpace />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    member: state.root.app.member
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMemberById: payload => {
      dispatch(getHomeMemberDetailRequest(payload))
    },
    setNavBar: payload => {
      dispatch(
        setNavBar({ title: payload.title, isCanBack: payload.isCanBack })
      )
    }
  }
}

HomeMemberDetail.propTypes = {}

export default connect(mapStateToProps, mapDispatchToProps)(HomeMemberDetail)
