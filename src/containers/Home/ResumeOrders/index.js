import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { setNavBar, getHomeResumeOrderListRequest } from '../../../actions'
import { HomeResumeOrderListView, MyActivityIndicator } from '../../../components'

class HomeResumeOrders extends Component {
  componentDidMount() {
    if (this.props.resumeOrder.list.length === 0) {
      this.props.getHomeResumeOrderList({ page: 1 })
    }
    this.props.setNavBar({ title: '组队上分贴', isCanBack: true })
  }

  render() {
    const { resumeOrder, navigateTo, getHomeResumeOrderList } = this.props
    return (
      <div style={{ height: '100%' }}>
        <MyActivityIndicator
          isFetching={resumeOrder.isFetching}
          text={resumeOrder.fetchingText}
        />
        <HomeResumeOrderListView
          resumeOrder={resumeOrder}
          navigateTo={navigateTo}
          getHomeResumeOrderList={getHomeResumeOrderList}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    resumeOrder: state.root.resumeOrder.home.resumeOrder
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getHomeResumeOrderList: payload => {
      dispatch(getHomeResumeOrderListRequest(payload))
    },
    navigateTo: location => {
      dispatch(push(location))
    },
    setNavBar: payload => {
      dispatch(
        setNavBar({ title: payload.title, isCanBack: payload.isCanBack })
      )
    },
  }
}

HomeResumeOrders.propTypes = {
  resumeOrder: PropTypes.object.isRequired,
  getHomeResumeOrderList: PropTypes.func.isRequired,
  setNavBar: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(
  HomeResumeOrders
)
