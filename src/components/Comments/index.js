import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListView } from 'antd-mobile'

export default class Comments extends Component {
  constructor(props) {
    super(props)
    this.onEndReached = this.onEndReached.bind(this)
  }

  onEndReached = event => {
    if (this.props.comments.isFetching && !this.props.comments.isLoadMore) {
      return
    }
    const page = this.props.comments.page + 1
    this.props.getComments({ page: page })
  }

  render() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    }).cloneWithRows(this.props.comments.list)
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
        <div key={rowID} style={{ padding: '0 15px' }}>
          <div>{rowData.content.rendered}</div>
        </div>
      )
    }
    const fonter = () => {
      return (
        <div style={{ padding: 5, textAlign: 'center' }}>
          {this.props.comments.isFetching ? '' : '到底了'}
        </div>
      )
    }
    return (
      <ListView
        dataSource={dataSource}
        initialListSize={6}
        pageSize={10}
        renderFooter={fonter}
        renderRow={row}
        style={{
          height: '100%',
          overflow: 'auto'
        }}
        renderSeparator={separator}
        className="am-list"
        onEndReached={this.onEndReached}
        onEndReachedThreshold={100}
      />
    )
  }
}

Comments.propTypes = {
  comments: PropTypes.object.isRequired,
  getComments: PropTypes.func.isRequired
}
