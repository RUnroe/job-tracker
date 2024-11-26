import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { InputFieldType } from "../types/InputFieldType";
import Input from "../components/Input";
import Skeleton from "react-loading-skeleton";
import ApplicationListTable from "../components/ApplicationListTable";
import Application from "../types/Application";
import StatusFilters from "../components/StatusFilters";
import { SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import getAllApplications from "../webservice/getAllApplications";


const ApplicationList = () => {

  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string | null>();

  const [applicationsList, setApplicationsList] = useState<Application[]>();
  const [tableStatistics, setTableStatistics] = useState<any>();
  const [statusCounts, setStatusCounts] = useState<any>();


  //Fetch list and statistics
  useEffect(() => {
    //Fetch list of applications
    getAllApplications().then(response => response.json()).then(apps => {
      setApplicationsList(apps);
    });
    
    //TODO: fetch statistics list
    setTableStatistics({totalApplications: 100, currentMonth: 59, lastMonth: 22});
  }, []);


  const getCountsByStatus = () => {
    if(statusCounts) return statusCounts;
    let counts = {Applied: 0, Interview: 0, Offer: 0, Rejected: 0};
    if(applicationsList && applicationsList.length) {
      applicationsList.forEach(app => {
        counts[app.status] += 1;
      });
      //Cache value so we don't loop over list every rerender
      setStatusCounts(counts);
    }

    return counts;
  }



  const handleClickSelectedStatus = (clickedStatus: string) => {
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
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
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
              <StatusFilters
                selectedStatus={selectedStatusFilter || ""}
                handleSelectStatus={handleClickSelectedStatus}
                countsByStatus={getCountsByStatus()}
              />
              <ApplicationListTable applicationsList={selectedStatusFilter ? (applicationsList || []).filter(app => app.status === selectedStatusFilter) : (applicationsList || [])}  />
            </Card>
          </div>
          <div className="right flex column gap-1">
            <Card className="table-statistics">
              {tableStatistics ? 
                <>
                  <Input
                    title="Total Applications"
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
                </>
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