export const productsData = {
  columns: [
    {
      title: "",
      key: "image",
      dataIndex: "image",
      render: (imageUri) => (
        <div className="w-10 h-10 bg-red-100 rounded-lg">{imageUri}</div>
      ),
    },
    { title: "Name", key: "name", dataIndex: "name" },
    { title: "Category", key: "categogy", dataIndex: "category" },
    { title: "Price", key: "price", dataIndex: "price" },
  ],
  data: [
    {
      id: "1",
      name: "Mango",
      category: "Fruits",
      price: 2,
    },
    {
      id: "2",
      name: "Cabbage",
      category: "Vegetable",
      price: 2,
    },
    {
      id: "3",
      name: "Beef",
      category: "Meat",
      price: 2,
    },
    {
      id: "4",
      name: "Bread",
      category: "Beverage",
      price: 2,
    },
    {
      id: "5",
      name: "Tilapia",
      category: "Fish",
      price: 2,
    },
  ],
};
