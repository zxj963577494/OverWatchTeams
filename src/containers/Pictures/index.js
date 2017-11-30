import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getPicturesRequest } from '../../actions'
import { PicturesListView, MyActivityIndicator } from '../../components'

class Picture extends Component {
  componentDidMount() {
    this.props.getPictures({ page: 1 })
  }

  render() {
    const { pictures, navigateTo, getPictures } = this.props
    return (
      <div style={{ height: '100%' }}>
        <MyActivityIndicator isFetching={pictures.isFetching} />
        <PicturesListView
          pictures={pictures}
          navigateTo={navigateTo}
          getPictures={getPictures}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    pictures: state.root.pictures
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPictures: payload => {
      dispatch(getPicturesRequest(payload))
    },
    navigateTo: location => {
      dispatch(push(location))
    }
  }
}

Picture.propTypes = {
  pictures: PropTypes.object.isRequired,
  getPictures: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Picture)
