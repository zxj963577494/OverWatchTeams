import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { setNavBar, getAccountResumeOrderListRequest, deleteResumeOrderRequest } from '../../../actions'
import { AccountResumeOrderListView, MyActivityIndicator } from '../../../components'

class AccountResumeOrders extends Component {
  componentDidMount() {
    if (this.props.resumeOrder.list.length === 0) {
      this.props.getAccountResumeOrderList({ page: 1 })
    }
    this.props.setNavBar({ title: '组队上分贴', isCanBack: true })
  }

  render() {
    const { resumeOrder, navigateTo, getAccountResumeOrderList, deleteResumeOrder } = this.props
    return (
      <div style={{ height: '100%' }}>
        <MyActivityIndicator
          isFetching={resumeOrder.isFetching}
          text={resumeOrder.fetchingText}
        />
        <AccountResumeOrderListView
          resumeOrder={resumeOrder}
          navigateTo={navigateTo}
          getAccountResumeOrderList={getAccountResumeOrderList}
          deleteResumeOrder={deleteResumeOrder}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    resumeOrder: state.root.resumeOrder.account.resumeOrder
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAccountResumeOrderList: payload => {
      dispatch(getAccountResumeOrderListRequest(payload))
    },
    deleteResumeOrder: payload => {
      dispatch(deleteResumeOrderRequest(payload))
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

AccountResumeOrders.propTypes = {
  resumeOrder: PropTypes.object.isRequired,
  getAccountResumeOrderList: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  deleteResumeOrder: PropTypes.func.isRequired,
  setNavBar: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AccountResumeOrders
)
