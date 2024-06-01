

// function Dropdown = ({ projects })=>{
function Dropdown(){
  
  return(
    /*
    <select className="mb-2 mt-2 w-4/6 px-2 py-2">
      {projects.map((project) => (
        <a
          key={project.project_id}
          href={`/users/shipping/${project.project_id}`}
        >
        <ProjectBlog project={project} />
        </a>
      ))}
      </select>
    
    <select className="border rounded p-2">
      {projects.map((project, project_id) => (
        <option key={project_id} value={project.title}>
          {project.title}
        </option>
      ))}
    </select>
    */
    
    <select className="mb-2 mt-2 w-4/6 px-2 py-2">
      <option value="">โครงการ</option>
      <option>โครงการ2</option>
      <option>โครงการ3</option>
      <option>โครงการ4</option>
      <option>โครงการ5</option>
    </select>
    
      
    );
}
export default Dropdown;