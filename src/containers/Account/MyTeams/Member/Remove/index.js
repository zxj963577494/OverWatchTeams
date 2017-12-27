import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createForm } from 'rc-form'
import { Button, WingBlank, Radio, List, Toast, WhiteSpace } from 'antd-mobile'
import _ from 'lodash'
import { deleteTeamMemberRequest, setNavBar } from '../../../../../actions'
import { MyActivityIndicator } from '../../../../../components'

class AccountMemberRemove extends Component {
  constructor(props) {
    super(props)
    this.state = {
      members: props.members,
      value: [],
      pending: props.pending
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit = () => {
    const { deleteTeamMember, form } = this.props
    form.validateFields((error, value) => {
      if (!error) {
        deleteTeamMember(this.state.value)
      } else {
        Toast.fail('格式错误，请检查后提交', 2)
      }
    })
  }

  componentDidMount() {
    this.props.setNavBar({ title: '移除成员', isCanBack: true })
  }

  onMemberChange(i) {
    this.setState({
      value: {
        memberid: i.userid,
        teamid: this.props.match.params.teamid
      }
    })
  }

  render() {
    const { app, members, pending } = this.props
    return (
      <div>
        <MyActivityIndicator isFetching={app.isFetching} text={app.text} />
        <form>
          <List renderHeader={() => '选择成员'}>
            {members.length > 0 ? (
              members.map((i, index) => (
                <Radio.RadioItem
                  key={index}
                  onChange={() => this.onMemberChange(i)}
                >
                  {i.nickname}
                </Radio.RadioItem>
              ))
            ) : (
              <List.Item>暂无更多队员(除创始人外)</List.Item>
            )}
          </List>
          {members.length > 0 ? (
            <div>
              <WhiteSpace />
              <WingBlank>
                <Button
                  disabled={pending}
                  onClick={this.onSubmit}
                  type="primary"
                >
                  保 存
                </Button>
              </WingBlank>
            </div>
          ) : null}
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app,
    members: state.team.account.team.myTeams
      .filter(x => x.objectId === ownProps.match.params.teamid)[0]
      .members.filter(x => {
        return x.leader === false && !_.isEmpty(x.objectId)
      })
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
    }
  }
}

AccountMemberRemove.propTypes = {
  members: PropTypes.array,
  deleteTeamMember: PropTypes.func.isRequired,
  setNavBar: PropTypes.func.isRequired,
  form: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(
  createForm()(AccountMemberRemove)
)
