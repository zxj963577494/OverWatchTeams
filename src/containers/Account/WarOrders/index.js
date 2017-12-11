import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getAccountWarOrderListRequest, deleteWarOrderRequest } from '../../../actions'
import { AccountWarOrderListView, MyActivityIndicator } from '../../../components'

class AccountWarOrders extends Component {
  componentDidMount() {
    if (this.props.warOrder.list.length === 0) {
      this.props.getAccountWarOrderList({ page: 1 })
    }
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
    warOrder: state.root.warOrder.account.warOrder
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
    }
  }
}

AccountWarOrders.propTypes = {
  warOrder: PropTypes.object.isRequired,
  getAccountWarOrderList: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  deleteWarOrder: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AccountWarOrders
)
