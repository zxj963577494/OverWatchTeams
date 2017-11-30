import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  getDetailRequest,
  getCommentsRequest,
  postPageCountRequest
} from '../../actions'
// eslint-disable-next-line
import { Content, MyActivityIndicator, Comments } from '../../components'

class Detail extends Component {
  componentDidMount() {
    this.props.getDetail(
      this.props.match.params.id,
      this.props.match.path.includes('picture') ? 1 : 0
    )
    this.props.getComments({ post: this.props.match.params.id })
    this.props.postPageCount({ id: this.props.match.params.id })
  }

  render() {
    const { detail, isFetching } = this.props.detail
    return (
      <div className="page__content">
        <MyActivityIndicator isFetching={isFetching} />
        <Content content={detail} />
        {/* <Comments
          comments={this.props.comments}
          getComments={this.props.getComments}
        /> */}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const list = state.root.comments.list.filter(item => {
    return item.post.toString() === ownProps.match.params.id
  })
  state.root.comments.list = list
  return {
    detail: state.root.detail,
    comments: state.root.comments
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDetail: (id, t) => {
      dispatch(getDetailRequest({ include: id, t: t }))
    },
    getComments: payload => {
      dispatch(getCommentsRequest(payload))
    },
    postPageCount: payload => {
      dispatch(postPageCountRequest(payload))
    }
  }
}

Detail.propTypes = {
  detail: PropTypes.object.isRequired,
  getDetail: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
  postPageCount: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
