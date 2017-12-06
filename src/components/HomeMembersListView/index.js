import React, { Component } from 'react'
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

export default class HomeMemberListView extends Component {
  constructor(props) {
    super(props)
    this.onEndReached = this.onEndReached.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  onEndReached = event => {
    if (this.props.members.isFetching && !this.props.members.isLoadMore) {
      return
    }
    const page = this.props.members.page + 1
    this.props.getHomeMembers({ page: page })
  }

  onRefresh = () => {
    this.props.getHomeMembers({ isRefreshing: true })
  }

  render() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    }).cloneWithRows(this.props.members.list)
    const separator = (sectionID, rowID) => (
      <WhiteSpace size="xs" key={`${rowID}`} />
    )
    const row = (rowData, sectionID, rowID) => {
      return (
        <div
          onClick={() => {
            this.props.navigateTo('/home/member/' + rowData.userid)
          }}
          key={rowID}
        >
          <Card full>
            <Card.Header title={rowData.nickname} thumb={rowData.avatar} />
            <Card.Body>
              <Flex>
                <Flex.Item>
                  天梯分：{rowData.rankscore
                    ? rowData.rankscore + '分'
                    : '未知'}
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
                          width: '80px',
                          height: '80px',
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
          {this.props.members.isFetching ? '' : '到底了'}
        </div>
      )
    }
    return (
      <ListView
        dataSource={dataSource}
        renderFooter={fonter}
        renderRow={row}
        renderSeparator={separator}
        initialListSize={10}
        pageSize={20}
        className="am-list"
        style={{
          height: '100%',
          overflow: 'auto'
        }}
        onScroll={() => {
          console.log('scroll')
        }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={100}
        pullToRefresh={
          <PullToRefresh
            refreshing={this.props.members.isRefreshing}
            onRefresh={this.onRefresh}
          />
        }
      />
    )
  }
}

HomeMemberListView.propTypes = {
  members: PropTypes.object.isRequired,
  navigateTo: PropTypes.func.isRequired,
  getHomeMembers: PropTypes.func.isRequired
}
