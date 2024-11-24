
interface Props {
  tagKey: string,
  label: string, 
  isNew?: boolean, 
  handleRemove?: () => void, 
  handleOpenAddPopup?: () => void,
}


const Tag = ({tagKey, label, isNew, handleRemove, handleOpenAddPopup}: Props) => {
  return ( 
    isNew ? 
    <div className={`tag new`} onClick={handleOpenAddPopup} key={tagKey}>
      + {label || "Add"}
    </div>
    :
    <div className={`tag`}>
      {label}
      <button onClick={handleRemove} key={tagKey} className="close">
        ×
      </button>
    </div>
  );
}
 
export default Tag;