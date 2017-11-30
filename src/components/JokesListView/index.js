import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListView, PullToRefresh } from 'antd-mobile'
import {cutstr} from '../../utils/utils'
import fonts from '../../assets/font/font.css'
import styles from './style.css'

export default class JokesListView extends Component {
  constructor(props) {
    super(props)
    this.onEndReached = this.onEndReached.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  onEndReached = event => {
    if (this.props.jokes.isFetching && !this.props.jokes.isLoadMore) {
      return
    }
    const page = this.props.jokes.page + 1
    this.props.getJokes({ page: page })
  }

  onRefresh = () => {
    this.props.getJokes({ isRefreshing: true })
  }

  render() {
    console.log(this.props.jokes)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    }).cloneWithRows(this.props.jokes.list)
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          borderBottom: '1px solid #ECECED'
        }}
      />
    )
    const row = (rowData, sectionID, rowID) => {
      return (
        <div
          onClick={() => {
            this.props.navigateTo('/joke/' + rowData.id)
          }}
          key={rowData.id}
          style={{ padding: '0 15px' }}
        >
          <div className={styles['jokes__row']}>
            <div>
              <div
                dangerouslySetInnerHTML={{ __html: rowData.content.rendered }}
              />
              <div className='meta'>
                <span>{cutstr(rowData.date, 10, 1)}</span>
                <span
                  className={
                    fonts.iconfont + ' ' + fonts['icon-attention_light']
                  }
                >
                  {' '}
                  {rowData.pageviews}
                </span>
                <span
                  className={fonts.iconfont + ' ' + fonts['icon-comment_light']}
                >
                  {' '}
                  {rowData.total_comments}
                </span>
                <span
                  className={
                    fonts.iconfont + ' ' + fonts['icon-appreciate_light']
                  }
                >
                  {' '}
                  {rowData.like_count}
                </span>
              </div>
            </div>
          </div>
        </div>
      )
    }
    const fonter = () => {
      return (
        <div style={{ padding: 5, textAlign: 'center' }}>
          {this.props.jokes.isFetching ? '' : '到底了'}
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
        pageSize={10}
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
            refreshing={this.props.jokes.isRefreshing}
            onRefresh={this.onRefresh}
          />
        }
      />
    )
  }
}

JokesListView.propTypes = {
  jokes: PropTypes.object.isRequired,
  navigateTo: PropTypes.func.isRequired,
  getJokes: PropTypes.func.isRequired
}
