import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Flex, WhiteSpace, Grid } from 'antd-mobile'
import { getArticlesRequest, getStickyArticlesRequest } from '../../actions'
import { MyCarousel, HomeListView, MyActivityIndicator } from '../../components'
import config from '../../config'
import styles from './style.css'

const data = [
  {
    url: '/home/teams',
    icon: config.BASE_PIC_URL + '/logo.png',
    text: '战队'
  },
  {
    url: '/home/teams',
    icon: config.BASE_PIC_URL + '/logo.png',
    text: '招募令'
  },
  {
    url: '/home/teams',
    icon: config.BASE_PIC_URL + '/logo.png',
    text: '组队上分'
  },
  {
    url: '/home/members',
    icon: config.BASE_PIC_URL + '/logo.png',
    text: '个人库'
  }
]

class Home extends Component {
  componentDidMount() {
    this.props.getStickyArticles({})
    this.props.getArticles({ page: 1 })
  }

  // 展示LOGO
  renderLogo(sticky) {
    return (
      <div>
        <Flex>
          <img
            src={sticky.default.pic}
            alt={sticky.default.title}
            style={{ height: 60, width: 200 }}
          />
        </Flex>
        <WhiteSpace size="lg" />
        <Flex>{sticky.default.title}</Flex>
      </div>
    )
  }

  // 展示轮播图
  renderCarousel() {
    const { navigateTo } = this.props
    return (
      <MyCarousel content={this.props.sticky.list} navigateTo={navigateTo} />
    )
  }

  render() {
    const { sticky, articles, navigateTo, app } = this.props
    return (
      <div>
        <MyActivityIndicator isFetching={app.isFetching} text={app.text} />
        <div className={styles['header__sticky']}>
          {sticky.isShowLogo ? this.renderLogo(sticky) : this.renderCarousel()}
        </div>
        <WhiteSpace size="xs" />
        <Grid
          data={data}
          columnNum={4}
          hasLine={false}
          renderItem={(dataItem, index) => (
            <div key={index} onClick={() => navigateTo(dataItem.url)}>
              <img
                src={dataItem.icon}
                style={{ width: '40px', height: '40px' }}
                alt=""
              />
              <div
                style={{ color: '#888', fontSize: '14px', marginTop: '6px' }}
              >
                <span>{dataItem.text}</span>
              </div>
            </div>
          )}
        />
        <WhiteSpace size="xs" />
        <div>
          <HomeListView articles={articles} navigateTo={navigateTo} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.root.app,
    sticky: state.root.sticky,
    articles: state.root.articles
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getArticles: payload => {
      dispatch(getArticlesRequest(payload))
    },
    getStickyArticles: () => {
      dispatch(getStickyArticlesRequest())
    },
    navigateTo: location => {
      dispatch(push(location))
    }
  }
}

Home.propTypes = {
  sticky: PropTypes.object.isRequired,
  articles: PropTypes.object.isRequired,
  getArticles: PropTypes.func.isRequired,
  getStickyArticles: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
