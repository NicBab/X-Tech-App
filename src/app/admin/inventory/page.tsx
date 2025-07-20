"use client";

import { useState } from "react";
import { useGetProductsQuery, Product } from "@/redux/api/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "@/app/(components)/Header";
import { PlusCircleIcon, SearchIcon } from "lucide-react";

// ✅ Columns with proper type
const columns: GridColDef<Product>[] = [
  { field: "productId", headerName: "ID", width: 90 },
  {
    field: "mfr",
    headerName: "Manufacturer",
    width: 150,
    valueGetter: (params) => params.row.mfr ?? "N/A",
  },
  {
    field: "name",
    headerName: "Product Name",
    width: 200,
  },
  {
    field: "sku",
    headerName: "SKU",
    width: 150,
    valueGetter: (params) => params.row.sku ?? "N/A",
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 150,
    type: "number",
  },
  {
    field: "price",
    headerName: "Price",
    width: 120,
    valueGetter: (params) =>
      typeof params.row.price === "number"
        ? `$${params.row.price.toFixed(2)}`
        : "N/A",
  },
];

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: products = [],
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  if (isLoading) {
    return <div className="py-4 text-gray-500">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="py-4 text-red-500 text-center">
        Failed to fetch products.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* SEARCH */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white text-black"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER & BUTTON */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Inventory" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" /> Create Product
        </button>
      </div>

      {/* TABLE */}
      <DataGrid
        rows={[
  {
    productId: "p1",
    name: "Pump",
    mfr: "Acme",
    sku: "P-1001",
    stockQuantity: 20,
    price: 100.5,
  },
]}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        autoHeight
        className="bg-white text-black border border-gray-200 shadow"
      />
    </div>
  );
};

export default Inventory;
