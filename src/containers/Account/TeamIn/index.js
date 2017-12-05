import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Button, WhiteSpace, WingBlank, Card, Grid } from 'antd-mobile'
import { setNavBar, getTeamsByUserRequest } from '../../../actions'
import { MyActivityIndicator } from '../../../components'
import { getPosition } from '../../../utils/utils'
import config from '../../../config'
// eslint-disable-next-line
import styles from './style.css'

class AccountTeams extends Component {
  componentDidMount() {
    this.props.setNavBar({ title: '所在战队', isCanBack: true })
    this.props.getTeamsByUser()
  }

  render() {
    const { userteams, app, navigateTo } = this.props
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
                </Card>
              </div>
            )
          })}
        </WingBlank>
        <WhiteSpace />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.root.app,
    userteams: state.root.userteams.list
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getTeamsByUser: () => {
      dispatch(getTeamsByUserRequest({ t: 0 }))
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
  userteams: PropTypes.array,
  getTeamsByUser: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  setNavBar: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountTeams)
