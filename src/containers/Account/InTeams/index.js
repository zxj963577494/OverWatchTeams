import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { WhiteSpace, WingBlank, Card, List } from 'antd-mobile'
import { setNavBar, getInTeamsRequest } from '../../../actions'
import { MyActivityIndicator } from '../../../components'
import { cutstr } from '../../../utils/utils'
// eslint-disable-next-line
import styles from './style.css'

class AccountTeams extends Component {
  componentDidMount() {
    this.props.setNavBar({ title: '所在战队', isCanBack: true })
    if (this.props.teams.length === 0) {
      this.props.getInTeams()
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
              <div
                onClick={() => {
                  navigateTo('/home/team/' + item.objectId)
                }}
                key={index}
              >
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
                    <List>
                      <List.Item wrap>
                        {cutstr(item.introduction, 200, 0)}
                      </List.Item>
                    </List>
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
    app: state.app,
    teams: state.team.account.team.inTeams
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getInTeams: () => {
      dispatch(getInTeamsRequest())
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
  getInTeams: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  setNavBar: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountTeams)
