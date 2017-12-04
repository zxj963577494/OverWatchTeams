import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Button, WhiteSpace, Flex, WingBlank, Card, Grid } from 'antd-mobile'
import { setNavBar, getTeamsByUserRequest } from '../../../actions'
import { MyActivityIndicator } from '../../../components'
import { getPosition } from '../../../utils/utils'
import config from '../../../config'
import styles from './style.css'

class AccountTeams extends Component {
  constructor(props) {
    super(props)
    this.onCreateTeam = this.onCreateTeam.bind(this)
  }

  onCreateTeam() {
    this.props.navigateTo('/account/teams/create')
  }

  componentDidMount() {
    this.props.setNavBar({ title: '我的战队', isCanBack: true })
    this.props.getTeamsByUser()
  }

  render() {
    const { userteams, app } = this.props
    return (
      <div>
        <MyActivityIndicator isFetching={app.isFetching} text={app.text} />
        <WingBlank>
          {userteams.map(function(item, index) {
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
                          console.log(item.objectId)
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
                              console.log(dataItem.objectId)
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
                                alt={dataItem.leader}
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
                        onClick={() => {
                          console.log(item.objectId)
                        }}
                        type="primary"
                        size="small"
                        inline
                      >
                        队员管理
                      </Button>
                    }
                    extra={
                      <Button
                        onClick={() => {
                          console.log(item.objectId)
                        }}
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
          })}
        </WingBlank>
        <WhiteSpace />
        <WingBlank>
          <Button onClick={this.onCreateTeam} type="primary">
            新 建 战 队
          </Button>
        </WingBlank>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.root.app,
    userteams: state.root.userteams
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getTeamsByUser: () => {
      dispatch(getTeamsByUserRequest())
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

AccountTeams.propTypes = {}

export default connect(mapStateToProps, mapDispatchToProps)(AccountTeams)
