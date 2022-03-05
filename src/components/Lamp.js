import React, { useState, useLayoutEffect, useCallback } from 'react'
import mojs from 'mo-js'
import styles from './Lamp.module.css'

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
        stroke: '#faea0d',
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
    <span  id="spanicon">
    <svg         xmlns="http://www.w3.org/2000/svg" width="812.000000pt" height="812.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"className={`${styles.icon} ${isClicked && styles.checked}`}><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"className={`${styles.icon} ${isClicked && styles.checked}`}><path d="M2469 5097 c-18 -12 -44 -38 -57 -57 -23 -34 -23 -36 -20 -296 3
-247 4 -264 24 -291 26 -36 99 -73 144 -73 45 0 118 37 144 73 20 27 21 44 24
291 3 260 3 262 -20 296 -38 56 -82 80 -148 80 -43 0 -65 -6 -91 -23z"/><path d="M1275 4715 c-44 -24 -66 -46 -81 -82 -19 -44 -17 -121 4 -159 33 -59
244 -344 273 -369 60 -50 156 -53 218 -8 33 24 71 98 71 138 0 16 -11 53 -25
80 -31 64 -251 362 -287 389 -37 27 -132 33 -173 11z"/><path d="M3695 4716 c-16 -7 -40 -24 -51 -37 -50 -56 -249 -337 -267 -377 -57
-130 65 -269 203 -232 58 16 86 44 211 217 141 194 148 207 149 266 0 102 -59
168 -158 174 -34 2 -69 -2 -87 -11z"/><path d="M2419 4110 c-558 -64 -999 -496 -1080 -1059 -14 -102 -7 -318 15
-416 44 -203 115 -345 282 -570 137 -185 210 -290 297 -432 l57 -91 0 -206 0
-206 565 0 565 0 0 198 0 199 91 144 c94 149 151 230 301 431 138 187 194 301
245 496 24 96 27 125 28 277 0 183 -13 271 -62 415 -124 366 -438 668 -807
775 -48 13 -115 29 -149 35 -93 15 -262 20 -348 10z"/><path d="M540 3693 c-88 -33 -134 -146 -96 -236 24 -58 66 -83 244 -141 250
-82 277 -89 323 -81 45 8 101 51 125 96 20 39 18 117 -5 159 -28 54 -68 75
-286 145 -192 61 -261 74 -305 58z"/><path d="M4263 3632 c-111 -37 -214 -76 -229 -87 -59 -44 -83 -149 -50 -214
24 -45 80 -88 125 -96 46 -8 73 -1 323 81 178 58 220 83 244 141 31 74 6 169
-58 214 -24 17 -48 24 -93 26 -51 2 -89 -8 -262 -65z"/><path d="M724 2482 c-110 -37 -212 -75 -227 -85 -58 -38 -83 -139 -53 -210 17
-43 67 -84 116 -97 49 -13 85 -5 317 71 237 78 273 107 273 222 0 62 -25 108
-79 144 -57 39 -117 31 -347 -45z"/><path d="M4049 2527 c-54 -36 -79 -82 -79 -144 0 -116 35 -144 288 -227 108
-35 211 -67 229 -71 69 -14 162 35 189 102 32 75 4 175 -59 213 -18 11 -123
49 -234 85 -227 73 -278 80 -334 42z"/><path d="M1498 1700 c-26 -14 -71 -68 -166 -197 -71 -98 -134 -188 -141 -200
-6 -12 -11 -46 -11 -76 0 -154 189 -230 295 -118 66 70 266 356 276 396 39
142 -120 265 -253 195z"/><path d="M3465 1706 c-74 -33 -118 -124 -96 -201 10 -40 210 -326 276 -396 77
-82 219 -66 274 31 23 41 28 111 11 156 -6 14 -69 107 -141 205 -101 138 -140
184 -169 199 -45 23 -111 25 -155 6z"/><path d="M2039 927 c-76 -50 -86 -139 -22 -203 l34 -34 509 0 509 0 34 34 c68
68 52 167 -35 212 -22 11 -116 14 -511 14 l-484 0 -34 -23z"/></g></svg>
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