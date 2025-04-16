import React, { useState, useRef, useEffect } from 'react'
import Button from '../components/Button'
import styles from './modal.module.css'

export default function Modal({ project, isOpen, onSave, onClose }) {
  const [title, setTitle] = useState('')
  const inputref = useRef(null)

  useEffect(() => {
    isOpen && inputref?.current?.focus()
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  const handleSave = (event) => {
    event.preventDefault()
    onSave(title)
    onClose()
  }

  return (
    <div className={styles.dialogOverlay} role="dialog" onClick={onClose}>
      <div
        className={styles.dialog}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.dialogHeader}>
          <h2>Edit Project Details</h2>
          <Button className={styles.closeButton} onClick={onClose}>
            x
          </Button>
        </div>
        <div className={styles.dialogBody}>
          <div>
            <label htmlFor="project-name">Name</label>{' '}
            <input
              ref={inputref}
              type="text"
              id="project-name"
              name="projectName"
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
        </div>
        <div className={styles.dialogActions}>
          <Button className={styles.editButton} onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
