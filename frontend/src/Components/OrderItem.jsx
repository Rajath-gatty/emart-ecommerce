
const OrderItem = ({item}) => {

    return (
        <div key={item.id} className="flex flex-grow-0 items-center gap-8 p-4 w-full border-b ">
    <div className="w-full">
        <div className="flex justify-between">
            <div>
                <h2 className="text-sm font-medium font-open mb-1 max-w-[250px]">{item.title}</h2>
                <span className="text-gray-400 mr-4 text-xs">red color</span>
            </div>
            <div>
                <span className="text-xl text-gray-500 mr-4">x</span>
                <span className="text-xl font-medium">{item.quantity}</span>
            </div>
        </div>
    </div>
</div>
    )
}

export default OrderItem;