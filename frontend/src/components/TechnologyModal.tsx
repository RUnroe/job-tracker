import { Backdrop, Fade, Modal } from "@mui/material";
import { useState } from "react";



interface Props {
  open: boolean,
  allTechnologies: string[],
  handleAddTechnology: (technologies: string[]) => void,
  handleClose: () => void,
}

const TechnologyModal = ({open, allTechnologies, handleAddTechnology, handleClose}: Props) => {

  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [searchString, setSearchString] = useState<string>("");


  const selectTechnology = (technologyToAdd: string) => {
    setSelectedTechnologies([...selectedTechnologies, technologyToAdd]);
  };

  const deselectTechnology = (technologyToRemove: string) => {
    setSelectedTechnologies(selectedTechnologies.filter(tech => tech !== technologyToRemove));
  };

  return (  
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <div className="modal">
            <div className="modal-header flex space-between">
              <h2>Add Technology</h2>
              <button onClick={handleClose} className="close">×</button>
            </div>
            <div className="technology-filters">
                <div className="search-input-container">
                  <input type="text" value={searchString} onChange={event => setSearchString(event.target.value)} placeholder="Search..."/>
                  <button className="clear-btn close" onClick={() => setSearchString("")} title={"Clear search"}>×</button>
                </div>
              </div>
            <div className="modal-body">
              <div className="technology-item-list">
                {allTechnologies
                  .filter((tech:string) => tech.replace(" ", "").toLowerCase().includes(searchString.replace(" ", "").toLowerCase()))
                  .map((tech:string) => (
                  <div 
                    className={`technology-item ${selectedTechnologies.includes(tech) ? "selected" : ""}`} 
                    key={`${tech}-item`}
                    onClick={() => selectedTechnologies.includes(tech) ? deselectTechnology(tech) : selectTechnology(tech)}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn secondary" onClick={handleClose}>
                Close
              </button>
              <button className="btn primary" onClick={() => {handleAddTechnology(selectedTechnologies); handleClose();}}>
                Add ({selectedTechnologies.length}) item{selectedTechnologies.length !== 1 && "s"}
              </button>
            </div>
            
          </div>
        </Fade>
      </Modal>
  );
}
 
export default TechnologyModal;