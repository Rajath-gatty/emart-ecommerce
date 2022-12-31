import "./Skeleton.css";
const Skeleton = ({count=1}) => {
    const countArr = Array(count).fill();

    return (
        <>
            {countArr.map((_,i) => (
            <div key={i} className="border border-grey rounded-lg p-2">
                <div className="w-full h-36 skeleton-content rounded-lg"></div>
                <div className="skeleton-content h-6 w-full mt-3 rounded"></div>
                <div className="skeleton-content h-4 w-1/2 mt-8 rounded"></div>
                <div className="skeleton-content h-4 w-1/2 mt-2 mb-12 rounded"></div>
            </div> 
            ))}
        </>
    )
  }

  export default Skeleton;