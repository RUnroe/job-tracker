import { Link, useParams } from "react-router-dom";
import Card from "../components/Card";
import Input from "../components/Input";
import { InputFieldType } from "../types/InputFieldType";
import { ApplicationStatus } from "../types/ApplicationStatus";
import { useState } from "react";

interface Props {
  isNew?: boolean;
}

const ApplicationList = ({ isNew }: Props) => {
  const { id } = useParams();

  const [application, setApplication] = useState({
    ID: "",
    company: "",
    position: "",
    location: "",
    isRemote: true,
    status: ApplicationStatus.Applied,
    salary: "",
    listingLink: "",
    technology: [],
    companyInfo: "",
    roleInfo: "",
    dateApplied: "",
    dateUpdated: "",
  });

  const fieldUpdateHandler = (
    fieldKey: string,
    newValue: string | number | boolean
  ) => {
    setApplication((prevApplication) => ({
      ...prevApplication,
      [fieldKey]: newValue,
    }));
  };

  const saveApplication = () => {};

  return (
    <main id="applicationList">
      <header className="section">
        <section className="container flex space-between">
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

            <Card>TECHNOLOGY</Card>

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
            <Card>STATUS</Card>

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
              />
            </Card>
          </div>
        </section>
      </section>
    </main>
  );
};

export default ApplicationList;
