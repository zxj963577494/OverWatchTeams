import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Flex, WhiteSpace, Grid, List } from 'antd-mobile'
import { setNavBar, getHomeGroupOrderListRequest } from '../../actions'
import {
  HomeGroupListView,
  MyActivityIndicator
} from '../../components'
import config from '../../config'
import styles from './style.css'

const data = [
  {
    url: '/home/resumeorders',
    icon: config.BASE_DEFAULT_PIC_URL,
    text: '寻找战队'
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
    text: '战队列表'
  },
  {
    url: '/home/users',
    icon: config.BASE_DEFAULT_PIC_URL,
    text: '个人列表'
  }
]

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      down: true,
      height: document.documentElement.clientHeight,
      data: []
    }
  }
  componentDidMount() {
    if (this.props.groupOrder.list.length === 0) {
      this.props.getHomeGroupOrderList({ page: 1 })
    }
    this.props.setNavBar({ title: 'OverWatch Teams', isCanBack: false })
  }

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
  // renderCarousel() {
  //   const { navigateTo } = this.props
  //   return (
  //     <MyCarousel content={} navigateTo={navigateTo} />
  //   )
  // }

  render() {
    const { navigateTo, groupOrder } = this.props
    return (
      <div>
        <MyActivityIndicator
          isFetching={groupOrder.isFetching}
          text={groupOrder.fetchingText}
        />
        <WhiteSpace />
        <div className={styles['header__sticky']}>{this.renderLogo()}</div>
        <WhiteSpace />
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
        <List renderHeader={() => '组队上分'}>
          <HomeGroupListView groupOrder={groupOrder} navigateTo={navigateTo} />
        </List>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    groupOrder: state.root.groupOrder.home.groupOrder
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getHomeGroupOrderList: payload => {
      dispatch(getHomeGroupOrderListRequest(payload))
    },
    navigateTo: location => {
      dispatch(push(location))
    },
    setNavBar: payload => {
      dispatch(
        setNavBar({ title: payload.title, isCanBack: payload.isCanBack })
      )
    }
  }
}

Home.propTypes = {
  setNavBar: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  getHomeGroupOrderList: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
