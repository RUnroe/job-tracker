import { Link } from "react-router-dom";


const ApplicationList = () => {
  return ( 
    <main id="applicationList">
      <header className="section">
        <section className="container flex space-between">
          <h1>Job Tracker</h1>
          <div className="actions">
            <Link className="btn primary" to={"/application/new"}>
              Add New
            </Link>
          </div>
        </section>
      </header>
    </main>

   );
}
 
export default ApplicationList;