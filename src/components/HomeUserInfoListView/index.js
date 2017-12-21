import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  ListView,
  PullToRefresh,
  Card,
  Grid,
  Flex,
  WhiteSpace
} from 'antd-mobile'
import { RANKS, TEAMPOSITIONS } from '../../constants'

export default class HomeUserInfoListView extends PureComponent {
  constructor(props) {
    super(props)
    this.onEndReached = this.onEndReached.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  onEndReached = event => {
    if (this.props.userinfo.isFetching || !this.props.userinfo.isLoadMore) {
      return
    }
    const page = this.props.userinfo.page + 1
    this.props.getHomeUsers({ page: page })
  }

  onRefresh = () => {
    this.props.getHomeUsers({ isRefreshing: true })
  }

  render() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    }).cloneWithRows(this.props.userinfo.list)
    const separator = (sectionID, rowID) => <WhiteSpace key={`${rowID}`} />
    const row = (rowData, sectionID, rowID) => {
      return (
        <div
          onClick={() => {
            this.props.navigateTo('/home/userinfo/' + rowData.objectId)
          }}
          key={rowData.objectId}
        >
          <Card full>
            <Card.Header title={rowData.nickname} thumb={rowData.avatar} />
            <Card.Body>
              <Flex>
                <Flex.Item>
                  天梯：{rowData.rankscore ? rowData.rankscore + '分' : '未知'}
                </Flex.Item>
                <Flex.Item>
                  段位：{rowData.rank
                    ? RANKS.filter(x => x.value === rowData.rank)[0].label
                    : '未知'}
                </Flex.Item>
                <Flex.Item>
                  位置：{rowData.position
                    ? TEAMPOSITIONS.filter(x => x.value === rowData.position)[0]
                        .label
                    : '未知'}
                </Flex.Item>
              </Flex>
              {rowData.heros ? (
                <Grid
                  data={rowData.heros}
                  columnNum={3}
                  hasLine={false}
                  renderItem={dataItem => (
                    <div>
                      <img
                        src={dataItem.image}
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%'
                        }}
                        alt={dataItem.label}
                      />
                    </div>
                  )}
                />
              ) : (
                <WhiteSpace />
              )}
              <Flex>
                <Flex.Item>{rowData.introduction}</Flex.Item>
              </Flex>
            </Card.Body>
          </Card>
        </div>
      )
    }
    const fonter = () => {
      return (
        <div style={{ padding: 5, textAlign: 'center' }}>
          {this.props.userinfo.isFetching ? '' : '到底了'}
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
            refreshing={this.props.userinfo.isRefreshing}
            onRefresh={this.onRefresh}
          />
        }
      />
    )
  }
}

HomeUserInfoListView.propTypes = {
  userinfo: PropTypes.object.isRequired,
  navigateTo: PropTypes.func.isRequired,
  getHomeUsers: PropTypes.func.isRequired
}
