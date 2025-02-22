import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../components/Card";
import Input from "../components/Input";
import { InputFieldType } from "../types/InputFieldType";
import { ApplicationStatus } from "../types/ApplicationStatus";
import { useEffect, useState } from "react";
import Tag from "../components/Tag";
import TechnologyModal from "../components/TechnologyModal";
import Application from "../types/Application";
import getAllTechnologies from "../webservice/getAllTechnologies";
import { RedirectToSignIn, SignedOut } from "@clerk/clerk-react";
import postCreateApplication from "../webservice/postCreateApplication";
import putUpdateApplication from "../webservice/putUpdateApplication";
import getApplicationById from "../webservice/getApplicationById";
import { ToastContainer, toast } from 'react-toastify';

interface Props {
  isNew?: boolean;
}

const ApplicationList = ({ isNew }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [openTechnologyPopup, setOpenTechnologyPopup] = useState(false);
  const [application, setApplication] = useState<Application>({
    company: "",
    position: "",
    location: "",
    isRemote: true,
    status: ApplicationStatus.Applied,
    salary: "",
    listingLink: "",
    technologies: [],
    companyInfo: "",
    roleInfo: "",
    dateApplied: (new Date().toISOString().split("T")[0]),
    dateUpdated: "",
  });

  const [allTechnologies, setAllTechnologies] = useState<string[]>();

  //Fetch data by id if viewing an existing application
  useEffect(() => {
    if(!isNew && id) {
      //Fetch application by id
      getApplicationById(id)
      .then(response => response.json())
      .then(app => 
        setApplication(
          {
            ...app, 
            //Trim date time string to match input field requirements
            // dateUpdated: app.dateUpdated.includes(".") ? app.dateUpdated.split(".")[0] : app.dateUpdated
            dateUpdated: toIsoString(new Date(app.dateUpdated))
          }
      ));
    }

    getAllTechnologies().then(response => response.json()).then(technologies => {
      setAllTechnologies(technologies.map((tech: {"_id": string, label: string}) => tech.label).sort());
    });
    
  }, []);




  function toIsoString(date: Date) {
    var pad = function(num: number) {
            return (num < 10 ? '0' : '') + num;
        };
  
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) 
  }


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

  const saveApplication = async () => {

    console.log("Attempting to save");
    if(isNew) {
      let response = await postCreateApplication(application);
      let id = await response.json();
      console.log(id);
      //Redirect to created application
      navigate(`/application/${id}`);
      toast.success("Application Created!");
    }
    else {
      await putUpdateApplication(application);
      toast.success("Application Saved!");
    }

  };
  return (
    <main id="applicationSingle">
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <ToastContainer autoClose={2000} />
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
              >
                {application.listingLink &&
                  <a
                    className="btn secondary small" 
                    href={application.listingLink}
                    target="_blank"
                  >
                    View
                  </a>
                }
              </Input>
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
                fieldType={InputFieldType.DateTime}
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
          allTechnologies={allTechnologies?.filter((tech:string) => !application.technologies?.includes(tech)) || []}
          handleAddTechnology={addTags}
          handleClose={() => setOpenTechnologyPopup(false)}
        />
      }
    </main>
  );
};

export default ApplicationList;
