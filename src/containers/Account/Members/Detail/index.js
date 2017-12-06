import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, WhiteSpace, Flex, WingBlank, List, Result } from 'antd-mobile'
import { push, goBack } from 'react-router-redux'
import { RANKS, TEAMPOSITIONS } from '../../../../constants'
import { setNavBar, deleteTeamMemberRequest } from '../../../../actions'
import config from '../../../../config'
// eslint-disable-next-line
import styles from './style.css'

class AccountMembersDetail extends Component {
  constructor(props) {
    super(props)
    this.onRemoveMember = this.onRemoveMember.bind(this)
  }

  onRemoveMember() {
    this.props.deleteTeamMember({
      teamid: this.props.match.params.teamid,
      memberid: this.props.match.params.memberid
    })
  }

  componentWillMount() {
    if (this.props.userteams.length === 0) {
      this.props.goBack()
      return false
    }
  }

  componentDidMount() {
    this.props.setNavBar({ title: '队员详情', isCanBack: true })
  }

  render() {
    const { navigateTo, pickerMember } = this.props
    if (!pickerMember) {
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
                pickerMember.avatar
                  ? pickerMember.avatar
                  : config.BASE_DEFAULT_PIC_URL
              }
              onClick={() => navigateTo('/login')}
              alt={pickerMember.nickname}
            />
          }
          title={pickerMember.nickname}
          message={pickerMember.introduction}
        />
        <WhiteSpace />
        <List>
          <List.Item extra={pickerMember.contact}>联系方式</List.Item>
        </List>
        <List>
          <List.Item extra={pickerMember.rankscore}>天梯分</List.Item>
          <List.Item
            extra={
              pickerMember.rank
                ? RANKS.filter(x => x.value === pickerMember.rank)[0].label
                : '未知'
            }
          >
            天梯段位
          </List.Item>
        </List>
        <List>
          <List.Item
            extra={
              pickerMember.position
                ? TEAMPOSITIONS.filter(
                    x => x.value === pickerMember.position
                  )[0].label
                : '未知'
            }
          >
            团队定位
          </List.Item>
        </List>
        <List renderHeader={() => '擅长英雄'}>
          <List.Item style={{ textAlign: 'center' }}>
            {pickerMember.heros ? (
              pickerMember.heros.map((item, index) => {
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
          <List.Item wrap>{pickerMember.match}</List.Item>
        </List>
        <WhiteSpace />
        <WingBlank>
          <Flex>
            <Flex.Item>
              <Button onClick={this.onRemoveMember} type="warning">
                移除队员
              </Button>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userteams: state.root.userteams.list,
    pickerTeam:
      state.root.userteams.list.length > 0
        ? state.root.userteams.list.filter(
            x => x.objectId === ownProps.match.params.teamid
          )[0]
        : null,
    pickerMember:
      state.root.userteams.list.length > 0
        ? state.root.userteams.list
            .filter(x => x.objectId === ownProps.match.params.teamid)[0]
            .members.filter(
              x => x.objectId === ownProps.match.params.memberid
            )[0]
        : null
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteTeamMember: payload => {
      dispatch(deleteTeamMemberRequest(payload))
    },
    setNavBar: payload => {
      dispatch(
        setNavBar({ title: payload.title, isCanBack: payload.isCanBack })
      )
    },
    navigateTo: location => {
      dispatch(push(location))
    },
    goBack: () => {
      dispatch(goBack())
    }
  }
}

AccountMembersDetail.propTypes = {}

export default connect(mapStateToProps, mapDispatchToProps)(
  AccountMembersDetail
)
