/* eslint-disable react/prop-types */

function ProductCard({ category, img }) {
  return (
    <>
      <div className="w-[350px]  flex flex-col gap-6 mb-10">
        <div className="rounded-[10px] overflow-hidden">
          <img src={img} alt="" />
        </div>
        <div className="flex gap-4 font-poppins text-primary justify-around items-center">
          <h4 className="">{category}</h4>
          <a
            href=""
            className="border-solid border-[1px] border-primary p-2 px-5 rounded-md"
          >
            View Details
          </a>
        </div>
      </div>
    </>
  );
}
export default ProductCard;
