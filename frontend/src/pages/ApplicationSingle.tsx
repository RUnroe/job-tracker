import { useParams } from "react-router-dom";


const ApplicationList = () => {
  const {id} = useParams();

  return ( 
    <main id="applicationList">
      <header>
        <h1>Application</h1>
        {id}
        <div className="actions">
          <button className="btn">
            Save
          </button>
          <button className="btn primary">
            Save
          </button>
          <button className="btn secondary">
            Save
          </button>
        </div>
      </header>
    </main>

   );
}
 
export default ApplicationList;