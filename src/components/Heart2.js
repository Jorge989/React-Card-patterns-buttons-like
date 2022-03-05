import React, { useState, useLayoutEffect, useCallback } from 'react'
import mojs from 'mo-js'
import styles from './Heart2.module.css'

const initialState = {
  count: 0,
  countTotal: 0,
  isClicked: false
}

/**
 * Custom Hook for animation
 */
const useClapAnimation = ({ clapEl, countEl, clapTotalEl }) => {
  const [animationTimeline, setAnimationTimeline] = useState(
    () => new mojs.Timeline()
  )

  useLayoutEffect(() => {
    if (!clapEl || !countEl || !clapTotalEl) {
      return
    }

    const tlDuration = 300
    const scaleButton = new mojs.Html({
      el: clapEl,
      duration: tlDuration,
      scale: { 1.3: 1 },
      easing: mojs.easing.ease.out
    })

    const triangleBurst = new mojs.Burst({
      parent: clapEl,
      radius: { 50: 95 },
      count: 5,
      angle: 30,
      children: {
        shape: 'polygon',
        radius: { 6: 0 },
        stroke: 'rgba(211,54,0,0.5)',
        strokeWidth: 2,
        angle: 210,
        delay: 30,
        speed: 0.2,
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
        duration: tlDuration
      }
    })

    const circleBurst = new mojs.Burst({
      parent: clapEl,
      radius: { 50: 75 },
      angle: 25,
      duration: tlDuration,
      children: {
        shape: 'circle',
        fill: 'rgba(149,165,166,0.5)',
        delay: 30,
        speed: 0.2,
        radius: { 3: 0 },
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
      }
    })

    const countAnimation = new mojs.Html({
      el: countEl,
      opacity: { 0: 1 },
      y: { 0: -30 },
      duration: tlDuration
    }).then({
      opacity: { 1: 0 },
      y: -80,
      delay: tlDuration / 2
    })

    const countTotalAnimation = new mojs.Html({
      el: clapTotalEl,
      opacity: { 0: 1 },
      delay: (3 * tlDuration) / 2,
      duration: tlDuration,
      y: { 0: -3 }
    })

    if (typeof clapEl === 'string') {
      const clap = document.getElementById('clap')
      clap.style.transform = 'scale(1,1)'
    } else {
      clapEl.style.transform = 'scale(1,1)'
    }

    const newAnimationTimeline = animationTimeline.add([
      scaleButton,
      countTotalAnimation,
      countAnimation,
      triangleBurst,
      circleBurst
    ])
    setAnimationTimeline(newAnimationTimeline)
  }, [clapEl, countEl, clapTotalEl])

  return animationTimeline
}

const MediumClap = () => {
  const MAXIMUM_USER_CLAP = 50
  const [clapState, setClapState] = useState(initialState)
  const { count, countTotal, isClicked } = clapState

  const [{ clapRef, clapCountRef, clapTotalRef }, setRefState] = useState({})

  const setRef = useCallback(node => {
    setRefState(prevRefState => ({
      ...prevRefState,
      [node.dataset.refkey]: node
    }))
  }, [])

  const animationTimeline = useClapAnimation({
    clapEl: clapRef,
    countEl: clapCountRef,
    clapTotalEl: clapTotalRef
  })

  const handleClapClick = () => {
    animationTimeline.replay()
    setClapState(prevState => ({
      isClicked: true,
      count: Math.min(count + 1, MAXIMUM_USER_CLAP),
      countTotal:
        count < MAXIMUM_USER_CLAP
          ? prevState.countTotal + 1
          : prevState.countTotal
    }))
  }

  return (
    <button
      ref={setRef}
      data-refkey='clapRef'
      className={styles.clap}
      onClick={handleClapClick}
    >
      <ClapIcon isClicked={isClicked} />
      <ClapCount count={count} setRef={setRef} />
      <CountTotal countTotal={countTotal} setRef={setRef} />
    </button>
  )
}

/**
 * subcomponents
 */

const ClapIcon = ({ isClicked }) => {
  return (
    <span>
     <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="682.667" height="682.667" viewBox="0 0 512 512"        className={`${styles.icon} ${isClicked && styles.checked}`}><path d="M122 35.7c-45.9 7-83.4 35.1-105.3 78.8-6.1 12.3-10.3 24.4-13.4 39.4C1 164.8.7 168.9.6 185c0 15.6.3 20.2 2.2 29 6.5 30 21.4 60.5 44.5 91.3 23.1 30.7 61.1 68.6 100.2 99.8 28 22.4 69.6 51.6 93.6 65.8 13.7 8.1 16 8.2 28.5.8 55.1-32.8 123.1-86.8 162.2-128.7 45.3-48.6 69.2-89.4 77.9-132.9 2.7-13.2 2.4-40.2-.5-54.9-9.3-46.5-36.8-85.1-75.1-105-12-6.3-18-8.6-30.6-11.8-13.6-3.5-37.5-4.4-51.5-2-16.1 2.8-35.7 10.3-48.4 18.4-15.6 10-32.3 26.1-41.8 40.3-2.9 4.3-5.5 7.9-5.8 7.9-.3 0-3-3.7-6-8.3-7.2-10.8-26-29.6-37-36.9-16.5-10.9-34.2-18.1-52.6-21.3-7.9-1.4-31.6-1.9-38.4-.8z"/></svg>
    </span>
  )
}
const ClapCount = ({ count, setRef }) => {
  return (
    <span ref={setRef} data-refkey='clapCountRef' className={styles.count}>
      + {count}
    </span>
  )
}

const CountTotal = ({ countTotal, setRef }) => {
  return (
    <span ref={setRef} data-refkey='clapTotalRef' className={styles.total}>
      {countTotal}
    </span>
  )
}

/**
 * Usage
 */

const Usage = () => {
  return <MediumClap />
}

export default Usage