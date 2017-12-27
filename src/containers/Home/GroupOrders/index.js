import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { setNavBar, getHomeGroupOrderListRequest } from '../../../actions'
import { HomeGroupOrderListView, MyActivityIndicator } from '../../../components'

class HomeGroupOrders extends Component {
  componentDidMount() {
    if (this.props.groupOrder.list.length === 0) {
      this.props.getHomeGroupOrderList({ page: 1 })
    }
    this.props.setNavBar({ title: '组队上分', isCanBack: true })
  }

  render() {
    const { groupOrder, navigateTo, getHomeGroupOrderList } = this.props
    return (
      <div style={{ height: '100%' }}>
        <MyActivityIndicator
          isFetching={groupOrder.isFetching}
          text={groupOrder.fetchingText}
        />
        <HomeGroupOrderListView
          groupOrder={groupOrder}
          navigateTo={navigateTo}
          getHomeGroupOrderList={getHomeGroupOrderList}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    groupOrder: state.groupOrder.home.groupOrder
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getHomeGroupOrderList: payload => {
      dispatch(getHomeGroupOrderListRequest(payload))
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

HomeGroupOrders.propTypes = {
  groupOrder: PropTypes.object.isRequired,
  getHomeGroupOrderList: PropTypes.func.isRequired,
  setNavBar: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(
  HomeGroupOrders
)
