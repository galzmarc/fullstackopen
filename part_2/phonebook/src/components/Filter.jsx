const Filter = ({filter, filterFunc}) => {
  return (
    <div>
      filter shown with: <input value={filter} onChange={filterFunc}/>
    </div>
  )
}

export default Filter;