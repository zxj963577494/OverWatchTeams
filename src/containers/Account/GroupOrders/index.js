import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getAccountGroupOrderListRequest, deleteGroupOrderRequest } from '../../../actions'
import { AccountGroupOrderListView, MyActivityIndicator } from '../../../components'

class AccountGroupOrders extends Component {
  componentDidMount() {
    if (this.props.groupOrder.list.length === 0) {
      this.props.getAccountGroupOrderList({ page: 1 })
    }
  }

  render() {
    const { groupOrder, navigateTo, getAccountGroupOrderList, deleteGroupOrder } = this.props
    return (
      <div style={{ height: '100%' }}>
        <MyActivityIndicator
          isFetching={groupOrder.isFetching}
          text={groupOrder.fetchingText}
        />
        <AccountGroupOrderListView
          groupOrder={groupOrder}
          navigateTo={navigateTo}
          getAccountGroupOrderList={getAccountGroupOrderList}
          deleteGroupOrder={deleteGroupOrder}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    groupOrder: state.root.groupOrder.account.groupOrder
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAccountGroupOrderList: payload => {
      dispatch(getAccountGroupOrderListRequest(payload))
    },
    deleteGroupOrder: payload => {
      dispatch(deleteGroupOrderRequest(payload))
    },
    navigateTo: location => {
      dispatch(push(location))
    }
  }
}

AccountGroupOrders.propTypes = {
  groupOrder: PropTypes.object.isRequired,
  getAccountGroupOrderList: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  deleteGroupOrder: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AccountGroupOrders
)
