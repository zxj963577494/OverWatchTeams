import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListView, PullToRefresh, Card, Flex, WhiteSpace } from 'antd-mobile'
import TimeAgo from 'timeago-react'

export default class HomeWarOrderListView extends Component {
  constructor(props) {
    super(props)
    this.onEndReached = this.onEndReached.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  onEndReached = event => {
    if (
      this.props.warOrder.isFetching ||
      !this.props.warOrder.isLoadMore
    ) {
      return
    }
    const page = this.props.warOrder.page + 1
    this.props.getHomeWarOrderList({ page: page })
  }

  onRefresh = () => {
    this.props.getHomeWarOrderList({ isRefreshing: true })
  }

  render() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    }).cloneWithRows(this.props.warOrder.list)
    const separator = (sectionID, rowID) => <WhiteSpace key={`${rowID}`} />
    const row = (rowData, sectionID, rowID) => {
      return (
        <div key={rowID}>
          <Card full>
            <Card.Header
              title={rowData.title}
              thumb={rowData.team.avatar}
              onClick={() =>
                this.props.navigateTo(`/home/team/${rowData.team.objectId}`)
              }
            />
            <Card.Body>
              <Flex>
                <Flex.Item>
                  <span
                    onClick={() =>
                      this.props.navigateTo(
                        `/home/team/${rowData.team.objectId}`
                      )
                    }
                    style={{ color: 'red' }}
                  >
                    {rowData.team.englishFullName ||
                      rowData.team.chineseFullName ||
                      rowData.team.englishName ||
                      rowData.team.chineseName}
                  </span>
                </Flex.Item>
                <Flex.Item>
                  <span style={{ color: 'red' }}>{rowData.contact}</span>
                </Flex.Item>
              </Flex>
              <WhiteSpace />
              <Flex>
                <Flex.Item>{rowData.description}</Flex.Item>
              </Flex>
            </Card.Body>
            <Card.Footer
              content={
                <div>
                  开始时间：<TimeAgo
                    datetime={rowData.createdAt}
                    locale="zh_CN"
                  />
                </div>
              }
              extra={
                <div style={{ color: 'red' }}>
                  有效日期：<TimeAgo datetime={rowData.endDate} locale="zh_CN" />
                </div>
              }
            />
          </Card>
        </div>
      )
    }
    const fonter = () => {
      return (
        <div style={{ padding: 5, textAlign: 'center' }}>
          {this.props.warOrder.isFetching ? '' : '到底了'}
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
            refreshing={this.props.warOrder.isRefreshing}
            onRefresh={this.onRefresh}
          />
        }
      />
    )
  }
}

HomeWarOrderListView.propTypes = {
  warOrder: PropTypes.object.isRequired,
  navigateTo: PropTypes.func.isRequired,
  getHomeWarOrderList: PropTypes.func.isRequired
}
