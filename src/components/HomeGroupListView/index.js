import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ListView, Card, Flex, WhiteSpace } from 'antd-mobile'
import TimeAgo from 'timeago-react'

export default class HomeGroupListView extends PureComponent {
  render() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    }).cloneWithRows(this.props.groupOrder.list)
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
        initialListSize={6}
        style={{
          height: '100%',
          overflow: 'auto',
          position: 'unset'
        }}
        scrollRenderAheadDistance={500}
        onEndReachedThreshold={100}
      />
    )
  }
}

HomeGroupListView.propTypes = {
  groupOrder: PropTypes.object.isRequired,
  navigateTo: PropTypes.func.isRequired
}
