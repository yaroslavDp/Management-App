import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  })

  function handleAddTask(taskText){
    setProjectsState(prevState => {
      const newTask = {
        text: taskText,
        projectId: prevState.selectedProjectId,
        id: Math.random()
      }
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      }
    })
  }
  function handleDeleteTask(id){
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(task => task.id !== id)
      }
    })
  }
  function handleStartAddProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    })
  }

  function handleCancelAddProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      }
    })
  }
  function handleAddProject(projectData){
    setProjectsState(prevState => {
      const newProject = {
       ...projectData,
       id: Math.random()
      }
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }
  function handleSelectProject(id){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      }
    })
  }
  function handleDeleteProject(id){
    setProjectsState(prevState => {
      return {
        ...prevState,
        projects: prevState.projects.filter(project => project.id !== id),
        selectedProjectId: undefined,
      }
    })
  }
  
  const selectedProject = projectsState.projects.find(project => project.id ===  projectsState.selectedProjectId)
  let content = <SelectedProject project={selectedProject} tasks={projectsState.tasks} onDeleteProject={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask}/>

  if(projectsState.selectedProjectId === null){
    content = <NewProject onAddProject={handleAddProject} onCanceAddlProject={handleCancelAddProject}/>
  } else if(projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar onStartAddProject={handleStartAddProject} projects={projectsState.projects} onSelectProject={handleSelectProject} selectedProjectId={projectsState.selectedProjectId}/>
      {content}
    </main>
  );
}

export default App;
