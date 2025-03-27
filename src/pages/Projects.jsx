import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllProjects, createProject } from '../services/project'
import Button from '../components/Button'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [suggestions, setSuggestion] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
      const allProjects = await getAllProjects()
      setProjects(allProjects)
    }
    fetchProjects()
  }, [])

  const handleCreateProject = async () => {
    const newProject = await createProject({
      name: 'New Project',
      description: 'A new project description',
    })
    setProjects([...projects, newProject])
  }

  const filterProjects = (val) => {
    setSuggestion(
      projects.filter((project) =>
        project.name.toLowerCase().includes(val.toLowerCase())
      )
    )
  }

  return (
    <div>
      <Button onClick={handleCreateProject}>Create New Project</Button>
      <label htmlFor="serach">Search Projects</label>
      <input
        type="text"
        id
        onChange={(event) => filterProjects(event.target.value)}
      />
      {suggestions.map((project) => (
        <div>{project.name}</div>
      ))}
      {projects.map((project) => (
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
