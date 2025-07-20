// "use client";

// import { useGetProductsQuery } from "@/state/api";
// import Header from "@/app/(components)/Header";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import { useState } from "react";
// import { PlusCircleIcon, SearchIcon } from "lucide-react";

// const columns: GridColDef[] = [
//   { field: "productId", headerName: "ID", width: 90 },
//   //   {
//   //   field: "rating",
//   //   headerName: "Rating",
//   //   width: 110,
//   //   type: "number",
//   //   valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
//   // },
//   {
//     field: "mfr",
//     headerName: "Manufacturer",
//     width: 110,
//     type: "string",
//     valueGetter: (value, row) => (row.mfr ? row.mfr : "N/A"),
//   },
//   { field: "name", headerName: "Product Name", width: 200 },
//   {
//     field: "sku",
//     headerName: "Sku",
//     width: 110,
//     type: "string",
//     valueGetter: (value, row) => (row.sku ? row.sku : "N/A"),
//   },
//   {
//     field: "stockQuantity",
//     headerName: "Stock Quantity",
//     width: 150,
//     type: "number",
//   },
//   {
//     field: "price",
//     headerName: "Price",
//     width: 110,
//     type: "number",
//     valueGetter: (value, row) => `$${row.price}`,
//   },
// ];

// const Inventory = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const {
//     data: products,
//     isLoading,
//     isError,
//   } = useGetProductsQuery(searchTerm);

//   if (isLoading) {
//     return <div className="py-4">Loading...</div>;
//   }

//   if (isError || !products) {
//     return (
//       <div className="text-center text-red-500 py-4">
//         Failed to fetch products
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col">
//       {/* SEARCH BAR */}
//       <div className="mb-6">
//         <div className="flex items-center border-2 border-gray-200 rounded">
//           <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
//           <input
//             className="w-full py-2 px-4 rounded bg-white"
//             placeholder="Search inventory..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>
//       {/* HEADER BAR */}
//       <div className="flex justify-between items-center mb-6">
//         <Header name="Inventory" />
//         <button
//           className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
//           onClick={() => setIsModalOpen(true)}
//         >
//           <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Create
//           Product
//         </button>
//       </div>
//       <DataGrid
//         rows={products}
//         columns={columns}
//         getRowId={(row) => row.productId}
//         checkboxSelection
//         className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-500"
//       />
//     </div>
//   );
// };

// export default Inventory;
