import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { ApplicationStatus } from "../types/ApplicationStatus";
import { InputFieldType } from "../types/InputFieldType";
import Input from "../components/Input";
import Skeleton from "react-loading-skeleton";


const ApplicationList = () => {

  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string | null>();

  const [applicationsList, setApplicationsList] = useState();
  const [tableStatistics, setTableStatistics] = useState<any>();

  //Fetch list and statistics
  useEffect(() => {
    //TODO: fetch list of applications
    
    //TODO: fetch statistics list
  }, []);



  const handleClickSelectedStatus = (clickedStatus: ApplicationStatus) => {
    //If the selected filter is clicked again, deselect the filter
    if(selectedStatusFilter === clickedStatus) {
      setSelectedStatusFilter(null);
    }
    else {
      setSelectedStatusFilter(clickedStatus);
    }
  }


  return ( 
    <main id="applicationList">
      <header className="section">
        <section className="container flex space-between gap-1">
          <h1>Job Tracker</h1>
          <div className="actions flex gap-1">
            <Link className="btn primary" to={"/application/new"}>
              Add New
            </Link>
          </div>
        </section>
      </header>

      <section className="section">
        <section className="container grid">
          <div className="left flex column gap-1">
            <Card>
              <label className="sub-title">Applications</label>

            </Card>
          </div>
          <div className="right flex column gap-1">
            <Card>
              {tableStatistics ? 
                <div>
                  <Input
                    title="Total"
                    fieldKey="totalApplications"
                    fieldType={InputFieldType.PlainText}
                    fieldValue={tableStatistics?.totalApplications}
                  />
                  <Input
                    title="This Month"
                    fieldKey="currentMonth"
                    fieldType={InputFieldType.PlainText}
                    fieldValue={tableStatistics?.currentMonth}
                  />
                  <Input
                    title="Last Month"
                    fieldKey="lastMonth"
                    fieldType={InputFieldType.PlainText}
                    fieldValue={tableStatistics?.lastMonth}
                  />
                </div>
                :
                <Skeleton count={3} className="input-group"/> 
              }
            </Card>
          </div>
        </section>
      </section>
    </main>

   );
}
 
export default ApplicationList;