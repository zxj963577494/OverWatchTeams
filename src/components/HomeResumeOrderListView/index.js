import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListView, PullToRefresh, Card, Flex, WhiteSpace } from 'antd-mobile'
import TimeAgo from 'timeago-react'

export default class HomeResumeOrderListView extends Component {
  constructor(props) {
    super(props)
    this.onEndReached = this.onEndReached.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  onEndReached = event => {
    if (
      this.props.resumeOrder.isFetching ||
      !this.props.resumeOrder.isLoadMore
    ) {
      return
    }
    const page = this.props.resumeOrder.page + 1
    this.props.getHomeResumeOrderList({ page: page })
  }

  onRefresh = () => {
    this.props.getHomeResumeOrderList({ isRefreshing: true })
  }

  render() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    }).cloneWithRows(this.props.resumeOrder.list)
    const separator = (sectionID, rowID) => <WhiteSpace key={`${rowID}`} />
    const row = (rowData, sectionID, rowID) => {
      return (
        <div key={rowID}>
          <Card full>
            <Card.Header
              title={rowData.title}
              thumb={rowData.userinfo.avatar}
              onClick={() =>
                this.props.navigateTo(`/home/user/${rowData.user.objectId}`)
              }
            />
            <Card.Body>
              <Flex>
                <Flex.Item>
                  <span
                    onClick={() =>
                      this.props.navigateTo(
                        `/home/user/${rowData.userinfo.objectId}`
                      )
                    }
                    style={{ color: 'red' }}
                  >
                    {rowData.userinfo.nickname}
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
          {this.props.resumeOrder.isFetching ? '' : '到底了'}
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
            refreshing={this.props.resumeOrder.isRefreshing}
            onRefresh={this.onRefresh}
          />
        }
      />
    )
  }
}

HomeResumeOrderListView.propTypes = {
  resumeOrder: PropTypes.object.isRequired,
  navigateTo: PropTypes.func.isRequired,
  getHomeResumeOrderList: PropTypes.func.isRequired
}
