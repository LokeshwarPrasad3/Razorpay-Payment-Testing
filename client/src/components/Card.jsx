
const Card = ({name, amount, img, checkoutHandler }) => {
  return (
    <>
      <div className="rounded shadow-md shadow-blue-200 bg-white">
        <img className="w-60 h-60" src={img} alt="Product" />
        <div className="px-6 py-2 flex w-full flex-col justify-center items-center">
          <div className="font-bold text-ceter text-xl ">{name}</div>
          <p className="text-gray-700 text-base">₹{amount}</p>
        </div>
        <div className="px-6 pb-4 flex justify-center items-center">
          <button
            className="bg-green-500 hover:bg-green-400 transition-all duration-300 text-white font-bold py-1 px-4 rounded"
            onClick={() => checkoutHandler(name, amount)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
