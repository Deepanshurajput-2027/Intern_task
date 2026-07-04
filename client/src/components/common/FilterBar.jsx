import './FilterBar.css';

const FilterBar = ({ children }) => {
  return (
    <div className="filter-bar">
      {children}
    </div>
  );
};

export default FilterBar;
