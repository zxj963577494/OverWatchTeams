import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListView, PullToRefresh, Card, Flex, WhiteSpace } from 'antd-mobile'
import { cutstr } from '../../utils/utils'

export default class HomeTeamsListView extends Component {
  constructor(props) {
    super(props)
    this.onEndReached = this.onEndReached.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  onEndReached = event => {
    if (this.props.team.isFetching || !this.props.team.isLoadMore) {
      return
    }
    const page = this.props.team.page + 1
    this.props.getHomeTeams({ page: page })
  }

  onRefresh = () => {
    this.props.getHomeTeams({ isRefreshing: true })
  }

  render() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    }).cloneWithRows(this.props.team.list)
    const separator = (sectionID, rowID) => (
      <WhiteSpace key={`${rowID}`} />
    )
    const row = (rowData, sectionID, rowID) => {
      return (
        <div
          onClick={() => {
            this.props.navigateTo('/home/team/' + rowData.objectId)
          }}
          key={rowID}
        >
          <Card full>
            <Card.Header
              title={
                rowData.englishFullName ||
                rowData.chineseFullName ||
                rowData.englishName ||
                rowData.chineseName
              }
              thumb={rowData.avatar}
            />
            <Card.Body>
              <Flex>
                <Flex.Item>{cutstr(rowData.introduction, 200, 0)}</Flex.Item>
              </Flex>
              <WhiteSpace />
              {rowData.isRecruit ? (
                <div>
                  <Flex>
                    <Flex.Item>
                      {rowData.isRecruit ? (
                        <span style={{ color: 'red' }}>正在招募</span>
                      ) : (
                        '暂无招募'
                      )}
                    </Flex.Item>
                  </Flex>
                  <WhiteSpace />
                  <Flex>
                    <Flex.Item>
                      联系方式：{rowData.contact ? rowData.contact : '暂无'}
                    </Flex.Item>
                  </Flex>
                  <WhiteSpace />
                  <Flex>
                    <Flex.Item>
                      战队地点：{rowData.createCity
                        ? rowData.createCity
                        : '暂无'}
                    </Flex.Item>
                  </Flex>
                </div>
              ) : null}
            </Card.Body>
          </Card>
        </div>
      )
    }
    const fonter = () => {
      return (
        <div style={{ padding: 5, textAlign: 'center' }}>
          {this.props.team.isLoadMore ? '' : '到底了'}
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
            refreshing={this.props.team.isRefreshing}
            onRefresh={this.onRefresh}
          />
        }
      />
    )
  }
}

HomeTeamsListView.propTypes = {
  team: PropTypes.object,
  navigateTo: PropTypes.func.isRequired,
  getHomeTeams: PropTypes.func.isRequired
}
