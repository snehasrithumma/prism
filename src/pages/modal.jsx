import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import styles from './ProjectDetail.module.css'

export default function Modal({ project, isOpen, onSave, onClose }) {
  const [title, setTitle] = useState('')
  if (!isOpen) {
    return
  }

  const handleSave = (event) => {
    event.preventDefault()
    onSave(title)
    onClose()
  }

  return (
    <div className={styles.dialogOverlay} role="dialog" onClick={onClose}>
      <div
        className={styles.dialogContents}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.dialogTitle}>
          <h4>Edit Project</h4>
          <button onClick={onClose}>X</button>
        </div>
        <div className={styles.mainContent}>
          <form onSubmit={handleSave}>
            <div>
              <label htmlFor="projetcTitle">Title</label>
              <input
                required
                type="text"
                id="projetcTitle"
                name="name"
                onChange={(event) => setTitle(event.target.value)}
              />{' '}
            </div>
            <Button className={styles.editButton} type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
