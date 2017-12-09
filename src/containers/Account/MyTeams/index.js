import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {
  Button,
  WhiteSpace,
  WingBlank,
  Card,
  Grid,
  Modal,
  List
} from 'antd-mobile'
import {
  setNavBar,
  getMyTeamsRequest,
  deleteTeamRequest
} from '../../../actions'
import { MyActivityIndicator } from '../../../components'
import { getPosition } from '../../../utils/utils'
import config from '../../../config'
// eslint-disable-next-line
import styles from './style.css'

class AccountTeams extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      teamid: ''
    }
  }

  onCreateTeam = () => e => {
    this.props.navigateTo('/account/myteams/create')
  }

  onRemoveTeam = id => e => {
    Modal.alert('警告', '是否解散该队伍？', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确定', onPress: () => this.props.deleteTeam({ teamid: id }) }
    ])
  }

  onManageMember = id => e => {
    e.preventDefault()
    this.setState({
      modal: true,
      teamid: id
    })
  }

  componentDidMount() {
    this.props.setNavBar({ title: '我的战队', isCanBack: true })
    if (this.props.teams.length === 0) {
      this.props.getMyTeams()
    }
  }

  render() {
    const { teams, app, navigateTo } = this.props
    return (
      <div>
        <MyActivityIndicator isFetching={app.isFetching} text={app.text} />
        <WingBlank>
          {teams.map(function(item, index) {
            return (
              <div key={index}>
                <WhiteSpace />
                <Card>
                  <Card.Header
                    title={
                      item.englishFullName ||
                      item.chineseFullName ||
                      item.englishName ||
                      item.chineseName
                    }
                    thumb={item.avatar}
                    extra={
                      <Button
                        onClick={() => {
                          navigateTo('/account/myteams/edit/' + item.objectId)
                        }}
                        type="ghost"
                        size="small"
                        inline
                      >
                        编辑
                      </Button>
                    }
                  />
                  <Card.Body>
                    <Grid
                      data={item.members}
                      columnNum={3}
                      hasLine={false}
                      renderItem={(dataItem, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            if (dataItem.objectId) {
                              navigateTo(
                                `/account/members/detail/${item.objectId}/${
                                  dataItem.objectId
                                }`
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
                    />
                  </Card.Body>
                  <Card.Footer
                    content={
                      <Button
                        onClick={this.onManageMember(item.objectId)}
                        type="primary"
                        size="small"
                        inline
                      >
                        成员管理
                      </Button>
                    }
                    extra={
                      <Button
                        onClick={this.onRemoveTeam(item.objectId)}
                        type="warning"
                        size="small"
                        inline
                      >
                        战队解散
                      </Button>
                    }
                  />
                </Card>
              </div>
            )
          }, this)}
        </WingBlank>
        <WhiteSpace />
        <WingBlank>
          <Button onClick={this.onCreateTeam()} type="primary">
            新 建 战 队
          </Button>
        </WingBlank>
        <Modal
          popup
          visible={this.state.modal}
          maskClosable={true}
          onClose={() =>
            this.setState({
              modal: false
            })
          }
          animationType="slide-up"
        >
          <List renderHeader={() => <div>成员管理</div>} className="popup-list">
            <List.Item
              onClick={() => {
                this.setState({
                  modal: false
                })
                navigateTo(
                  `/account/myteams/member/create/${this.state.teamid}`
                )
              }}
            >
              添加队员
            </List.Item>
            <List.Item
              onClick={() => {
                this.setState({
                  modal: false
                })
                navigateTo(
                  `/account/myteams/member/remove/${this.state.teamid}`
                )
              }}
            >
              移除队员
            </List.Item>
          </List>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.root.app,
    teams: state.root.team.account.team.myTeams
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMyTeams: () => {
      dispatch(getMyTeamsRequest())
    },
    deleteTeam: payload => {
      dispatch(deleteTeamRequest(payload))
    },
    setNavBar: payload => {
      dispatch(
        setNavBar({ title: payload.title, isCanBack: payload.isCanBack })
      )
    },
    navigateTo: location => {
      dispatch(push(location))
    }
  }
}

AccountTeams.propTypes = {
  app: PropTypes.object.isRequired,
  teams: PropTypes.array,
  getMyTeams: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  setNavBar: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountTeams)
