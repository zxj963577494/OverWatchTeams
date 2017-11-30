import React from 'react'
import PropTypes from 'prop-types'
import { WingBlank } from 'antd-mobile'
import { cutstr, pcToMobile } from '../../utils/utils'
import fonts from '../../assets/font/font.css'
import styles from './style.css'

let Content = props => {
  const { content } = props
  if (!content.id) {
    return ''
  }
  return (
    <WingBlank>
      <div className={styles['content__title']}>{content.name}</div>
      <div className={styles['content__date']}>
        <span className={fonts.iconfont + ' ' + fonts['icon-date']}>
          {' '}
          {cutstr(content.date, 10, 1)}
        </span>
        <span>{content.category_name}</span>
        <span className={fonts.iconfont + ' ' + fonts['icon-attention_light']}>
          {' '}
          {content.pageviews}
        </span>
        <span className={fonts.iconfont + ' ' + fonts['icon-comment_light']}>
          {' '}
          {content.total_comments}
        </span>
        <span className={fonts.iconfont + ' ' + fonts['icon-appreciate_light']}>
          {' '}
          {content.like_count}
        </span>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: pcToMobile(content.content.rendered)
        }}
      />
    </WingBlank>
  )
}

Content.propTypes = {
  content: PropTypes.object.isRequired
}

export default Content
