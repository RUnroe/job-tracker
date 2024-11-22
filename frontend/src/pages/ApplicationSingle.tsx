import { useParams } from "react-router-dom";


const ApplicationList = () => {
  const {id} = useParams();

  return ( 
    <main id="applicationList">
      <header>
        <h1>Application</h1>
        <div className="actions">
          <button>
            Save
          </button>
        </div>
      </header>
    </main>

   );
}
 
export default ApplicationList;