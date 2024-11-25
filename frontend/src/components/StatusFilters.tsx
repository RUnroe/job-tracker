import { ApplicationStatus } from "../types/ApplicationStatus";


interface Props {
  selectedStatus: string,
  handleSelectStatus: (clickedStatus: string) => void,
  countsByStatus: {
    Applied: number,
    Interview: number,
    Offer: number,
    Rejected: number,
  },
}

const StatusFilters = ({selectedStatus, handleSelectStatus, countsByStatus}: Props) => {
  return (  
    <div className="status-filter-row">
      { (Object.keys(ApplicationStatus) as Array<keyof typeof ApplicationStatus>).map((status) => (
        <div 
          className={`status-filter ${selectedStatus === status ? "selected" : ""}`} 
          key={`${status}-filter-button`}
          onClick={() => handleSelectStatus(status)}
        >
          <span className="count">{countsByStatus?.[status]}</span>
          {status}
        </div>
      ))}
    </div>
  );
}
 
export default StatusFilters;