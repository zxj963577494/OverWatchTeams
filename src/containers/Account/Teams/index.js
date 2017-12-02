import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Button, WhiteSpace, Flex, WingBlank, Card } from 'antd-mobile'
import { setNavBar } from '../../../actions'
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
  }

  render() {
    return (
      <div>
        <WingBlank>
          <WhiteSpace />
          <Card>
            <Card.Header
              title="EDward Gaming"
              thumb="https://ss1.baidu.com/70cFfyinKgQFm2e88IuM_a/forum/pic/item/838ba61ea8d3fd1fc8dabf7b324e251f94ca5f9b.jpg"
            />
            <Card.Body>
              <Flex>
                <Flex.Item>sss</Flex.Item>
                <Flex.Item>ddd</Flex.Item>
                <Flex.Item>ff</Flex.Item>
              </Flex>
              <Flex>
                <Flex.Item>sss</Flex.Item>
                <Flex.Item>ddd</Flex.Item>
                <Flex.Item>ff</Flex.Item>
              </Flex>
            </Card.Body>
            <Card.Footer
              content="footer content"
              extra={<div>extra footer content</div>}
            />
          </Card>
          <WhiteSpace />
          <Card>
            <Card.Header
              title="This is title"
              thumb="https://gss3.bdstatic.com/84oSdTum2Q5BphGlnYG/timg?wapp&quality=80&size=b150_150&subsize=20480&cut_x=0&cut_w=0&cut_y=0&cut_h=0&sec=1369815402&srctrace&di=3b9644ddd97fe80b130af35ad85d1235&wh_rate=null&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2F4a36acaf2edda3ccc93333cf04e93901203f920e.jpg"
            />
            <Card.Body>
              <Flex>
                <Flex.Item>sss</Flex.Item>
                <Flex.Item>ddd</Flex.Item>
                <Flex.Item>ff</Flex.Item>
              </Flex>
              <Flex>
                <Flex.Item>sss</Flex.Item>
                <Flex.Item>ddd</Flex.Item>
                <Flex.Item>ff</Flex.Item>
              </Flex>
            </Card.Body>
            <Card.Footer
              content="footer content"
              extra={<div>extra footer content</div>}
            />
          </Card>
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
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
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
