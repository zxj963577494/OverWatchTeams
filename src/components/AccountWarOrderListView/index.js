import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  ListView,
  PullToRefresh,
  Card,
  Flex,
  WhiteSpace,
  Button,
  Modal
} from 'antd-mobile'
import TimeAgo from 'timeago-react'

export default class AccountWarOrderListView extends PureComponent {
  constructor(props) {
    super(props)
    this.onEndReached = this.onEndReached.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.onRemove = this.onRemove.bind(this)
  }

  onEndReached = event => {
    if (
      this.props.warOrder.isFetching ||
      !this.props.warOrder.isLoadMore
    ) {
      return
    }
    const page = this.props.warOrder.page + 1
    this.props.getAccountWarOrderList({ page: page })
  }

  onRefresh = () => {
    this.props.getAccountWarOrderList({ isRefreshing: true })
  }

  onRemove = objectId => {
    Modal.alert('警告', '是否删除该约战帖？', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定',
        onPress: () => this.props.deleteWarOrder({ objectId: objectId })
      }
    ])
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
              extra={
                <div>
                  <Button
                    onClick={() => {
                      this.props.navigateTo(
                        '/account/warorders/edit/' + rowData.objectId
                      )
                    }}
                    type="ghost"
                    size="small"
                    inline
                  >
                    编辑
                  </Button>
                  <Button
                    onClick={this.onRemove.bind(this, rowData.objectId)}
                    type="warning"
                    size="small"
                    inline
                  >
                    删除
                  </Button>
                </div>
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
                  有效日期：<TimeAgo
                    datetime={rowData.endDate}
                    locale="zh_CN"
                  />
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

AccountWarOrderListView.propTypes = {
  warOrder: PropTypes.object.isRequired,
  navigateTo: PropTypes.func.isRequired,
  getAccountWarOrderList: PropTypes.func.isRequired,
  deleteWarOrder: PropTypes.func.isRequired
}
