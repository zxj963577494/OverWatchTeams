import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List, Card, Grid } from 'antd-mobile'
import { setNavBar, getHomeTeamDetailRequest } from '../../../../actions'
import { RANKS } from '../../../../constants'
import { MyActivityIndicator } from '../../../../components'

class HomeTeamDetail extends Component {
  componentDidMount() {
    this.props.setNavBar({ title: '战队详情', isCanBack: true })
    if (!this.props.teams) {
      const id = this.props.match.params.id
      this.props.getTeamById({ objectId: id })
    }
  }

  render() {
    const { team, app, navigateTo } = this.props
    return (
      <div>
        <MyActivityIndicator
          isFetching={app.isFetching}
          text={app.fetchingText}
        />
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
            {/* <Grid
              data={team.members}
              columnNum={3}
              hasLine={false}
              renderItem={(dataItem, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (dataItem.objectId) {
                      navigateTo(
                        `/home/member/${dataItem.objectId}/${dataItem.objectId}`
                      )
                    }
                  }}
                >
                  <img
                    src={dataItem.avatar}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%'
                    }}
                    alt={dataItem.nickname}
                  />
                  <div
                    style={{
                      color: '#888',
                      fontSize: '14px',
                      marginTop: '6px'
                    }}
                  >
                    <span>{dataItem.nickname}</span>
                    <img
                      src={getPosition(dataItem.position)}
                      alt={dataItem.position}
                      className="teams--position"
                    />
                    {dataItem.leader ? (
                      <img
                        src={config.BASE_PIC_URL + '/leader.png'}
                        alt="队长"
                        className="teams--leader"
                      />
                    ) : null}
                  </div>
                </div>
              )}
            /> */}
          </Card.Body>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.root.app,
    current: state.root.teams.current,
    team:
      state.root.teams.list.length > 0
        ? state.root.teams.list.filter(
            x => x.objectId === ownProps.match.params.id
          )[0]
        : null
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
    }
  }
}

HomeTeamDetail.propTypes = {}

export default connect(mapStateToProps, mapDispatchToProps)(HomeTeamDetail)
