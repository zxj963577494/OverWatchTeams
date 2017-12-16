import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ListView, PullToRefresh, WhiteSpace } from 'antd-mobile'
import HomeGroupCard from '../HomeGroupCard'

export default class HomeGroupOrderListView extends PureComponent {
  constructor(props) {
    super(props)
    this.onEndReached = this.onEndReached.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  onEndReached = event => {
    if (this.props.groupOrder.isFetching || !this.props.groupOrder.isLoadMore) {
      return
    }
    const page = this.props.groupOrder.page + 1
    this.props.getHomeGroupOrderList({ page: page })
  }

  onRefresh = () => {
    this.props.getHomeGroupOrderList({ isRefreshing: true })
  }

  render() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    }).cloneWithRows(this.props.groupOrder.list)
    const separator = (sectionID, rowID) => <WhiteSpace key={`${rowID}`} />
    const row = (rowData, sectionID, rowID) => {
      return (
        <HomeGroupCard
          key={rowData.objectId}
          item={rowData}
          navigateTo={this.props.navigateTo}
        />
      )
    }
    const fonter = () => {
      return (
        <div style={{ padding: 5, textAlign: 'center' }}>
          {this.props.groupOrder.isFetching ? '' : '到底了'}
        </div>
      )
    }
    return (
      <ListView
        dataSource={dataSource}
        renderFooter={fonter}
        renderRow={row}
        renderSeparator={separator}
        initialListSize={20}
        pageSize={20}
        style={{
          height: '100%',
          overflow: 'auto'
        }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={100}
        pullToRefresh={
          <PullToRefresh
            refreshing={this.props.groupOrder.isRefreshing}
            onRefresh={this.onRefresh}
          />
        }
      />
    )
  }
}

HomeGroupOrderListView.propTypes = {
  groupOrder: PropTypes.object.isRequired,
  navigateTo: PropTypes.func.isRequired,
  getHomeGroupOrderList: PropTypes.func.isRequired
}
