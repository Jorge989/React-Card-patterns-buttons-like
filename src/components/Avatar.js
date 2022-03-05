import React from 'react'
import styles from "./Avatar.module.css"
export default function Avatar({img,personName}) {
  return (
    <div className={styles.AvatarContainer}>
<img src={img} alt="foto"/>
<h2>{personName}</h2>
    </div>
  )
}
