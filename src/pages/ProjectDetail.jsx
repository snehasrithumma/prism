import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { deleteProject, getProject } from '../services/project'
import Button from '../components/Button'
import styles from './ProjectDetail.module.css'
import { updateProject } from '../services/project'
import Modal from './modal'

const ProjectDetail = () => {
  const [project, setProject] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const fetchProject = async () => {
      const projectData = await getProject(id)
      setProject(projectData)
    }
    fetchProject()
  }, [id])

  if (!project) {
    return <div>Loading...</div>
  }

  // curl -v --location 'http://localhost:11434/api/generate' --header 'Content-Type: application/json' --data '{"model": "tinyllama","prompt": "why is the sky blue?", "stream": true}'

  // const getImage = async () => {
  //   await fetch('http://localhost:11434/api/generate', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       model: 'tinyllama',
  //       prompt: 'Give me an image with blue sky',
  //       stream: true,
  //     }),
  //   })
  //     .then((response) => {
  //       const reader = response.body.getReader()
  //       const decoder = new TextDecoder()
  //       let result = ''
  //       while (true) {
  //         const { done, value } = reader.read()
  //         if (done) break
  //         result += decoder.decode(value, { stream: true })
  //       }
  //       setImageSrc(`data:image/png;base64,${result.trim()}`)
  //     })
  //     .catch((error) => {
  //       console.log()
  //     })
  // }

  const close = () => {
    setOpenDialog(false)
  }

  const openEditDialog = () => {
    setOpenDialog(true)
  }

  const save = (data) => {
    updateProject(project.id, { name: data }).then((data) => {
      setProject(data)
    })
  }

  return (
    <>
      <Modal
        project={project}
        isOpen={openDialog}
        onSave={save}
        onClose={close}
      />
      <div className={styles.container}>
        <h1 className={styles.heading}>{project.name}</h1>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.section}>
          <h2 className={styles.subheading}>Project Details</h2>
          <p>
            <strong>Created:</strong>{' '}
            {new Date(project.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Last Updated:</strong>{' '}
            {new Date(project.updatedAt).toLocaleDateString()}
          </p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.subheading}>Inspirations</h2>
          {project.inspirations?.length > 0 ? (
            <ul className={styles.inspirationList}>
              {project.inspirations.map((inspiration) => (
                <li key={inspiration.id}>
                  {inspiration.websiteMetadata.title ||
                    inspiration.websiteMetadata.url}
                </li>
              ))}
            </ul>
          ) : (
            <p>No inspirations added yet.</p>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <Button className={styles.editButton} onClick={openEditDialog}>
            Edit
          </Button>
          <Button className={styles.deleteButton} onClick={deleteProject}>
            Delete
          </Button>
        </div>
      </div>
    </>
  )
}

export default ProjectDetail
