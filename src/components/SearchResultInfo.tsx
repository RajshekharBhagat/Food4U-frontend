import { Link } from "react-router-dom";

type Props = {
    total: number,
    city: string,
};

const SearchResultInfo = ({total, city}: Props) => {
    return (
        <div className="text-xl mb-2 font-bold flex flex-col justify-between gap-3 lg:items-center lg:flex-row">
            <span>
                {total} Restaurants found in {city}  
                <Link to='/' className=" ml-1 text-sm font-semibold underline cursor-pointer text-blue-500">Change Location</Link>
            </span>
        </div>
    )
};

export default SearchResultInfo;
