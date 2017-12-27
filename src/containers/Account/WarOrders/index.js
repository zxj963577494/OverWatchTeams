import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { setNavBar, getAccountWarOrderListRequest, deleteWarOrderRequest } from '../../../actions'
import { AccountWarOrderListView, MyActivityIndicator } from '../../../components'

class AccountWarOrders extends Component {
  componentDidMount() {
    if (this.props.warOrder.list.length === 0) {
      this.props.getAccountWarOrderList({ page: 1 })
    }
    this.props.setNavBar({ title: '决战紫禁之巅', isCanBack: true })
  }

  render() {
    const { warOrder, navigateTo, getAccountWarOrderList, deleteWarOrder } = this.props
    return (
      <div style={{ height: '100%' }}>
        <MyActivityIndicator
          isFetching={warOrder.isFetching}
          text={warOrder.fetchingText}
        />
        <AccountWarOrderListView
          warOrder={warOrder}
          navigateTo={navigateTo}
          getAccountWarOrderList={getAccountWarOrderList}
          deleteWarOrder={deleteWarOrder}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    warOrder: state.warOrder.account.warOrder
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAccountWarOrderList: payload => {
      dispatch(getAccountWarOrderListRequest(payload))
    },
    deleteWarOrder: payload => {
      dispatch(deleteWarOrderRequest(payload))
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

AccountWarOrders.propTypes = {
  warOrder: PropTypes.object.isRequired,
  getAccountWarOrderList: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  deleteWarOrder: PropTypes.func.isRequired,
  setNavBar: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AccountWarOrders
)
