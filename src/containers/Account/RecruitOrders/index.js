import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getAccountRecruitOrderListRequest } from '../../../actions'
import { AccountRecruitOrderListView, MyActivityIndicator } from '../../../components'

class AccountRecruitOrders extends Component {
  componentDidMount() {
    if (this.props.recruitOrder.list.length === 0) {
      this.props.getAccountRecruitOrderList({ page: 1 })
    }
  }

  render() {
    const { recruitOrder, navigateTo, getAccountRecruitOrderList } = this.props
    return (
      <div style={{ height: '100%' }}>
        <MyActivityIndicator
          isFetching={recruitOrder.isFetching}
          text={recruitOrder.fetchingText}
        />
        <AccountRecruitOrderListView
          recruitOrder={recruitOrder}
          navigateTo={navigateTo}
          getAccountRecruitOrderList={getAccountRecruitOrderList}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    recruitOrder: state.root.recruitOrder.account.recruitOrder
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAccountRecruitOrderList: payload => {
      dispatch(getAccountRecruitOrderListRequest(payload))
    },
    navigateTo: location => {
      dispatch(push(location))
    }
  }
}

AccountRecruitOrders.propTypes = {
  recruitOrder: PropTypes.object.isRequired,
  getAccountRecruitOrderList: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AccountRecruitOrders
)
