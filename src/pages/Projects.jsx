import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllProjects, createProject } from '../services/project'
import Button from '../components/Button'
import styles from './Projects.module.css'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [suggestions, setSuggestion] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
      const allProjects = await getAllProjects()
      setProjects(allProjects)
      setSuggestion(allProjects)
    }
    fetchProjects()
  }, [])

  const handleCreateProject = async () => {
    const newProject = await createProject({
      name: 'New Project',
      description: 'A new project description',
    })
    setProjects([...projects, newProject])
    setSuggestion([...projects, newProject])
  }

  const filterProjects = (val) => {
    val !== ''
      ? setSuggestion(
          projects.filter((project) =>
            project.name.toLowerCase().includes(val.toLowerCase())
          )
        )
      : setSuggestion(projects)
  }

  const debounce = (fn, wait) => {
    let timer = null
    return function (...args) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, wait)
    }
  }

  const debounceFunction = debounce(filterProjects, 700)

  return (
    <div>
      <Button style={{ float: 'right' }} onClick={handleCreateProject}>
        Create New Project
      </Button>
      <div>
        <input
          className={styles.searchIcon}
          type="text"
          id="search"
          placeholder="Search Projects"
          onChange={(event) => debounceFunction(event.target.value)}
        />
      </div>
      {/* {suggestions.map((project) => (
        <div>{project.name}</div>
      ))} */}
      {suggestions.map((project) => (
        <div key={project.id} className="p-4 border-b border-gray-200">
          <Link to={`/projects/${project.id}`} className="block">
            <h2 className="text-lg font-semibold">{project.name}</h2>
            <small>{project.id}</small>
            <p className="text-sm text-gray-600">{project.description}</p>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Projects
