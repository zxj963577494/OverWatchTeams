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
    text: '战队库'
  },
  {
    url: '/home/recruitorders',
    icon: config.BASE_PIC_URL + '/logo.png',
    text: '招募令'
  },
  {
    url: '/home/grouporders',
    icon: config.BASE_PIC_URL + '/logo.png',
    text: '组队上分'
  },
  {
    url: '/home/users',
    icon: config.BASE_PIC_URL + '/logo.png',
    text: '个人库'
  },
  {
    url: '/home/warorders',
    icon: config.BASE_PIC_URL + '/logo.png',
    text: '训练赛约战'
  },
  {
    url: '/home/warorders',
    icon: config.BASE_PIC_URL + '/logo.png',
    text: '想打比赛'
  }
]

class Home extends Component {
  componentDidMount() {}

  // 展示LOGO
  renderLogo(sticky) {
    return (
      <div>
        <Flex>
          <img
            src={config.BASE_DEFAULT_PIC_URL}
            alt="这个世界需要更多的英雄"
            style={{ height: 60, width: 200 }}
          />
        </Flex>
        <WhiteSpace size="lg" />
        <Flex>这个世界需要更多的英雄</Flex>
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
    const { navigateTo, app } = this.props
    return (
      <div>
        <MyActivityIndicator isFetching={app.isFetching} text={app.text} />
        <WhiteSpace size="xs" />
        <div className={styles['header__sticky']}>{this.renderLogo()}</div>
        <WhiteSpace size="xs" />
        <Grid
          data={data}
          columnNum={3}
          hasLine={false}
          className="home__Grid"
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
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.root.app
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    navigateTo: location => {
      dispatch(push(location))
    }
  }
}

Home.propTypes = {
  navigateTo: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
