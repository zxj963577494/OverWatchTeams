import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { setNavBar, getHomeWarOrderListRequest } from '../../../actions'
import { HomeWarOrderListView, MyActivityIndicator } from '../../../components'

class HomeWarOrders extends Component {
  componentDidMount() {
    if (this.props.warOrder.list.length === 0) {
      this.props.getHomeWarOrderList({ page: 1 })
    }
    this.props.setNavBar({ title: '训练赛约战贴', isCanBack: true })
  }

  render() {
    const { warOrder, navigateTo, getHomeWarOrderList } = this.props
    return (
      <div style={{ height: '100%' }}>
        <MyActivityIndicator
          isFetching={warOrder.isFetching}
          text={warOrder.fetchingText}
        />
        <HomeWarOrderListView
          warOrder={warOrder}
          navigateTo={navigateTo}
          getHomeWarOrderList={getHomeWarOrderList}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    warOrder: state.root.warOrder.home.warOrder
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getHomeWarOrderList: payload => {
      dispatch(getHomeWarOrderListRequest(payload))
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

HomeWarOrders.propTypes = {
  warOrder: PropTypes.object.isRequired,
  getHomeWarOrderList: PropTypes.func.isRequired,
  setNavBar: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(
  HomeWarOrders
)
