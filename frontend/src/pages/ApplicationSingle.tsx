import { Link, useParams } from "react-router-dom";
import Card from "../components/Card";
import Input from "../components/Input";
import { InputFieldType } from "../types/InputFieldType";
import { ApplicationStatus } from "../types/ApplicationStatus";
import { useEffect, useState } from "react";
import Tag from "../components/Tag";
import TechnologyModal from "../components/TechnologyModal";
import Application from "../types/Application";
import getAllTechnologies from "../webservice/getAllTechnologies";

interface Props {
  isNew?: boolean;
}

const ApplicationList = ({ isNew }: Props) => {
  const { id } = useParams();

  const [openTechnologyPopup, setOpenTechnologyPopup] = useState(false);
  const [application, setApplication] = useState<Application>({
    company: "",
    position: "",
    location: "",
    isRemote: true,
    status: ApplicationStatus.Applied,
    salary: "",
    listingLink: "",
    technologies: ["React"],
    companyInfo: "",
    roleInfo: "",
    dateApplied: "",
    dateUpdated: "",
  });

  const [allTechnologies, setAllTechnologies] = useState<string[]>();

  //Fetch data by id if viewing an existing application
  useEffect(() => {
    if(!isNew) {
      //TODO: fetch application by id
      console.log(id);
    }

    getAllTechnologies().then(response => response.json()).then(technologies => {
      setAllTechnologies(technologies.map((tech: {"_id": string, label: string}) => tech.label));
    });
    
  }, []);



  const fieldUpdateHandler = (
    fieldKey: string,
    newValue: string | number | boolean
  ) => {
    setApplication((prevApplication) => ({
      ...prevApplication,
      [fieldKey]: newValue,
    }));
  };


  const removeTag = (tagToRemove: string) => {
    let newApplication = structuredClone(application);
    newApplication.technologies = newApplication.technologies.filter(tech => tech !== tagToRemove);
    setApplication(newApplication);
  }


  const addTags = (tagsToAdd: string[]) => {
    let newApplication = structuredClone(application);
    //Filter out duplicates
    newApplication.technologies = Array.from(new Set([...newApplication.technologies, ...tagsToAdd]));
    setApplication(newApplication);
  }

  const saveApplication = () => {};

  return (
    <main id="applicationSingle">
      <header className="section">
        <section className="container flex space-between gap-1">
          <h1>{isNew && "New "}Application</h1>
          <div className="actions flex gap-1">
            <Link className="btn secondary" to={"/application/list"}>
              Back to List
            </Link>
            <button className="btn primary" onClick={saveApplication}>
              {isNew ? "Create" : "Save"}
            </button>
          </div>
        </section>
      </header>

      <section className="section">
        <section className="container grid">
          <div className="left flex column gap-1">
            <Card className="col-2">
              <Input
                title="Company"
                fieldKey="company"
                fieldType={InputFieldType.Text}
                fieldValue={application.company}
                fieldUpdateHandler={fieldUpdateHandler}
              />
              <Input
                title="Position"
                fieldKey="position"
                fieldType={InputFieldType.Text}
                fieldValue={application.position}
                fieldUpdateHandler={fieldUpdateHandler}
              />
            </Card>
            <Card className="col-2">
              <Input
                title="Salary"
                fieldKey="salary"
                fieldType={InputFieldType.Text}
                fieldValue={application.salary}
                fieldUpdateHandler={fieldUpdateHandler}
              />
              <Input
                title="Listing Link"
                fieldKey="listingLink"
                fieldType={InputFieldType.Text}
                fieldValue={application.listingLink}
                fieldUpdateHandler={fieldUpdateHandler}
              />
            </Card>

            <Card>
              <label className="sub-title">Technology</label>
              <div className="tag-list">
                {application.technologies?.sort()?.map(tech => (
                  <Tag 
                    key={tech}
                    tagKey={tech}
                    label={tech} 
                    handleRemove={() => removeTag(tech)}
                  />
                ))}
                <Tag 
                    key={"addtech"}
                    tagKey={"add"}
                    label={"Add"} 
                    isNew
                    handleOpenAddPopup={() => setOpenTechnologyPopup(true)}
                  />
              </div>
            </Card>

            <Card className="col-2">
              <Input
                title="Company Info"
                fieldKey="companyInfo"
                fieldType={InputFieldType.TextArea}
                fieldValue={application.companyInfo}
                fieldUpdateHandler={fieldUpdateHandler}
              />
              <Input
                title="Role Info"
                fieldKey="roleInfo"
                fieldType={InputFieldType.TextArea}
                fieldValue={application.roleInfo}
                fieldUpdateHandler={fieldUpdateHandler}
              />
            </Card>
          </div>

          <div className="right flex column gap-1">
            <Card>
              <label className="sub-title">Status</label>
              <div className="button-group">
                <button 
                  className={`btn ${application.status === ApplicationStatus.Applied ? "selected" : ""}`}
                  onClick={() => fieldUpdateHandler("status", ApplicationStatus.Applied)}
                >
                  Applied
                </button>
                <button 
                  className={`btn ${application.status === ApplicationStatus.Interview ? "selected" : ""}`}
                  onClick={() => fieldUpdateHandler("status", ApplicationStatus.Interview)}
                >
                  Interview
                </button>
                <button 
                  className={`btn ${application.status === ApplicationStatus.Offer ? "selected" : ""}`}
                  onClick={() => fieldUpdateHandler("status", ApplicationStatus.Offer)}
                >
                  Offer
                </button>
                <button 
                  className={`btn ${application.status === ApplicationStatus.Rejected ? "selected" : ""}`}
                  onClick={() => fieldUpdateHandler("status", ApplicationStatus.Rejected)}
                >
                  Rejected
                </button>
              </div>
            </Card>

            <Card>
              <Input
                title="Location"
                fieldKey="location"
                fieldType={InputFieldType.Text}
                fieldValue={application.location}
                fieldUpdateHandler={fieldUpdateHandler}
              />
              <Input
                title="Remote"
                fieldKey="isRemote"
                fieldType={InputFieldType.Checkbox}
                fieldChecked={application.isRemote}
                fieldUpdateHandler={fieldUpdateHandler}
              />
              </Card>
            <Card>
              <Input
                title="Date Applied"
                fieldKey="dateApplied"
                fieldType={InputFieldType.Calendar}
                fieldValue={application.dateApplied}
                fieldUpdateHandler={fieldUpdateHandler}
              />
              <Input
                title="Date Updated"
                fieldKey="dateUpdated"
                fieldType={InputFieldType.Calendar}
                fieldValue={application.dateUpdated}
                fieldUpdateHandler={fieldUpdateHandler}
                disabled
              />
            </Card>
          </div>
        </section>
      </section>
      {openTechnologyPopup && 
        <TechnologyModal
          open={openTechnologyPopup}
          allTechnologies={allTechnologies}
          handleAddTechnology={addTags}
          handleClose={() => setOpenTechnologyPopup(false)}
        />
      }
    </main>
  );
};

export default ApplicationList;
