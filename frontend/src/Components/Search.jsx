const Search = ({ searchQuery, category }) => {
    return (
        <div
            className={`bg-light-grey flex items-center rounded-full border max-w-2xl w-full border-grey ${
                category && "hidden"
            } order-3 col-start-1 col-end-4 justify-self-center border-[5px] mt-4 md:mt-0 border-transparent`}
        >
            <input
                type="text"
                onChange={(e) => searchQuery(e.target.value)}
                placeholder="Search"
                className="p-1 md:p-3 w-full pl-6 md:pl-8 bg-light-grey rounded-full outline-none border-none"
            />
            <button className=" bg-primary py-2 px-6 md:py-3 md:px-8 rounded-full text-white">
                Search
            </button>
        </div>
    );
};

export default Search;
