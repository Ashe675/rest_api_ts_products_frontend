import { ActionFunctionArgs, Form, useNavigate, redirect, useFetcher } from "react-router-dom";
import { Product } from "../types/index";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";

type ProductDetailProps = {
  product: Product;
};

// eslint-disable-next-line react-refresh/only-export-components
export async function action({params}: ActionFunctionArgs) {
  if(params.id){
    await deleteProduct(+params.id)
    return redirect('/')
  }
}

export default function ProductDetails({ product }: ProductDetailProps) {
  const fetcher = useFetcher()
  const navigate = useNavigate()

  const isAvailable = product.availability

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">
        {product.name}
      </td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${ isAvailable ? 'text-black' : ' text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-gray-400 hover:cursor-pointer hover:bg-slate-200`}
          >
          {isAvailable ? 'Available' : 'Not Available'}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className=" flex gap-2 items-center">
          <button 
            onClick={() => navigate(`products/${product.id}/edit`)}
            className=" bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:bg-indigo-500"
          >Edit</button>
          <Form 
            className=" w-full "
            method="POST"
            onSubmit={ (e)=>{
              if( !confirm('Delete?')){
                e.preventDefault()
              }
            }}
            action={`products/${product.id}/delete`}
          >
            <input 
              type="submit"
              value="Delete"
              className=" bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:bg-red-500"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
