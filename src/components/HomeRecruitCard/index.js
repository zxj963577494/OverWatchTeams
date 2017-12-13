import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card, Flex, WhiteSpace } from 'antd-mobile'
import TimeAgo from 'timeago-react'

export default class HomeRecruitCard extends PureComponent {
  render() {
    const { item, navigateTo } = this.props
    return (
      <Card full>
        <Card.Header
          title={item.title}
          thumb={item.team.avatar}
          onClick={() => navigateTo(`/home/team/${item.team.objectId}`)}
        />
        <Card.Body>
          <Flex>
            <Flex.Item>
              <span style={{ color: 'red' }}>
                {item.team.englishFullName ||
                  item.team.chineseFullName ||
                  item.team.englishName ||
                  item.team.chineseName}
              </span>
            </Flex.Item>
            <Flex.Item>
              <span style={{ color: 'red' }}>{item.contact}</span>
            </Flex.Item>
          </Flex>
          <WhiteSpace />
          <Flex>
            <Flex.Item>{item.description}</Flex.Item>
          </Flex>
        </Card.Body>
        <Card.Footer
          content={
            <div>
              发布时间：<TimeAgo datetime={item.createdAt} locale="zh_CN" />
            </div>
          }
          extra={
            <div style={{ color: 'red' }}>
              有效日期：<TimeAgo datetime={item.endDate} locale="zh_CN" />
            </div>
          }
        />
      </Card>
    )
  }
}

HomeRecruitCard.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  item: PropTypes.object
}
