import React from 'react'
import PropTypes from 'prop-types'
import { Carousel } from 'antd-mobile'
import styles from './style.css'

let MyCarousel = props => {
  return (
    <Carousel
      className={styles.carousel}
      autoplay={false}
      infinite
      selectedIndex={1}
      swipeSpeed={35}
    >
      {props.content.map(item => (
        <a
          onClick={() => props.navigateTo(`/article/${item.id}`)}
          key={item.id}
        >
          <img
            src={item.thumbnail}
            alt={item.title.rendered}
            style={{ height: '200px', width: '100%' }}
          />
        </a>
      ))}
    </Carousel>
  )
}

MyCarousel.propTypes = {
  content: PropTypes.array.isRequired,
  navigateTo: PropTypes.func.isRequired
}

export default MyCarousel
