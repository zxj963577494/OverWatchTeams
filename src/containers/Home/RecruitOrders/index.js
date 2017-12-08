import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getHomeRecruitOrderListRequest } from '../../../actions'
import { HomeRecruitOrderListView, MyActivityIndicator } from '../../../components'

class HomeRecruitOrders extends Component {
  componentDidMount() {
    if (this.props.recruitOrder.list.length === 0) {
      this.props.getHomeRecruitOrderList({ page: 1 })
    }
  }

  render() {
    const { recruitOrder, navigateTo, getHomeRecruitOrderList } = this.props
    return (
      <div style={{ height: '100%' }}>
        <MyActivityIndicator
          isFetching={recruitOrder.isFetching}
          text={recruitOrder.fetchingText}
        />
        <HomeRecruitOrderListView
          recruitOrder={recruitOrder}
          navigateTo={navigateTo}
          getHomeRecruitOrderList={getHomeRecruitOrderList}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    recruitOrder: state.root.recruitOrder.home.recruitOrder
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getHomeRecruitOrderList: payload => {
      dispatch(getHomeRecruitOrderListRequest(payload))
    },
    navigateTo: location => {
      dispatch(push(location))
    }
  }
}

HomeRecruitOrders.propTypes = {
  recruitOrder: PropTypes.object.isRequired,
  getHomeRecruitOrderList: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(
  HomeRecruitOrders
)
