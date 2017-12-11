import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List, Card } from 'antd-mobile'
import { push } from 'react-router-redux'
import { setNavBar, getHomeTeamDetailRequest } from '../../../../actions'
import { RANKS } from '../../../../constants'
import { MyActivityIndicator } from '../../../../components'

class HomeTeamDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isGetMember: false
    }
    this.getTeamById = this.getTeamById.bind(this)
  }

  componentDidMount() {
    this.props.setNavBar({ title: '战队详情', isCanBack: true })
    if (!this.props.team) {
      const id = this.props.match.params.id
      this.props.getTeamById({ objectId: id })
    }
  }

  getTeamById() {
    this.setState({
      isGetMember: true
    })
    const id = this.props.match.params.id
    this.props.getTeamById({ objectId: id })
  }

  render() {
    let { team, current, app } = this.props
    if ((team == null && current != null) || this.state.isGetMember) {
      team = current
    }
    if (!team) {
      return null
    }
    return (
      <div>
        <MyActivityIndicator isFetching={app.isFetching} text={app.text} />
        <Card full>
          <Card.Header
            title={
              team.englishFullName ||
              team.chineseFullName ||
              team.englishName ||
              team.chineseName
            }
            thumb={team.avatar}
          />
          <Card.Body>
            <List>
              <List.Item extra={team.englishName}>英文简称</List.Item>
              <List.Item extra={team.englishFullName}>英文全称</List.Item>
              <List.Item extra={team.chineseName}>中文简称</List.Item>
              <List.Item extra={team.chineseFullName}>中文全称</List.Item>
              <List.Item extra={team.contact}>联系方式</List.Item>
              <List.Item extra={team.createCity}>所在地点</List.Item>
              <List.Item extra={team.isRecruit ? '是' : '否'}>
                是否正在招募
              </List.Item>
              <List.Item
                extra={
                  team.rank
                    ? RANKS.filter(x => x.value === team.rank)[0].label
                    : '未知'
                }
              >
                平均段位
              </List.Item>
            </List>
            <List renderHeader={() => '战队口号'}>
              <List.Item wrap>{team.slogan}</List.Item>
            </List>
            <List renderHeader={() => '战队介绍'}>
              <List.Item wrap>{team.introduction}</List.Item>
            </List>
            <List renderHeader={() => '比赛经历'}>
              <List.Item wrap>{team.match}</List.Item>
            </List>
            <List renderHeader={() => '主要荣耀'}>
              <List.Item wrap>{team.honor}</List.Item>
            </List>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.root.app,
    current: state.root.team.home.team.current,
    team: state.root.team.home.team.list.filter(
      x => x.objectId === ownProps.match.params.id
    )[0]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getTeamById: payload => {
      dispatch(getHomeTeamDetailRequest(payload))
    },
    setNavBar: payload => {
      dispatch(
        setNavBar({ title: payload.title, isCanBack: payload.isCanBack })
      )
    },
  }
}

HomeTeamDetail.propTypes = {
  app: PropTypes.object,
  current: PropTypes.object,
  team: PropTypes.object,
  setNavBar: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeTeamDetail)
