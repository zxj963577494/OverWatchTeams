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
    url: '/home/resumeorders',
    icon: config.BASE_DEFAULT_PIC_URL,
    text: '战队自荐'
  },
  {
    url: '/home/recruitorders',
    icon: config.BASE_DEFAULT_PIC_URL,
    text: '战队招募'
  },
  {
    url: '/home/warorders',
    icon: config.BASE_DEFAULT_PIC_URL,
    text: '比赛约战'
  },
  {
    url: '/home/grouporders',
    icon: config.BASE_DEFAULT_PIC_URL,
    text: '组队上分'
  },
  {
    url: '/home/teams',
    icon: config.BASE_DEFAULT_PIC_URL,
    text: '战队库'
  },
  {
    url: '/home/users',
    icon: config.BASE_DEFAULT_PIC_URL,
    text: '个人库'
  }
]

class Home extends Component {
  componentDidMount() {}

  // 展示LOGO
  renderLogo(sticky) {
    return (
      <div>
        <Flex>
          <WhiteSpace size="lg" />
          <Flex.Item>
            <img
              src={config.BASE_PIC_HOME_LOGO_URL}
              alt="这个世界需要更多的英雄"
              style={{ height: 150, width: 300 }}
            />
          </Flex.Item>
        </Flex>
        <Flex>
          <Flex.Item>这个世界需要更多的英雄</Flex.Item>
        </Flex>
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
