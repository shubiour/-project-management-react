import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";
import SelectedProject from "./components/SelectedProject";

function App() {

  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

  function handleDeleteProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectId),
      };
    });
  }

  function handleSelectProject(id){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleAddProject(data) {
    setProjectsState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...data,
        id: projectId,
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleCancelAddProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }
  
  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content = <SelectedProject project={selectedProject} onDeleteProject={handleDeleteProject}/>;
 
  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar  onStartAddProject={handleStartAddProject} projects={projectsState.projects} onSelectProject={handleSelectProject}/>
      {content}
    </main>
  );
}

export default App;
