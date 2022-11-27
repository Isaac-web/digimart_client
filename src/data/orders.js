import StatusIndicator from "../components/StatusIndicator";

export const columns = [
  {
    key: "1",
    label: "Order ID",
    dataIndex: "orderId",
  },
  {
    key: "1",
    label: "Date",
    dataIndex: "date",
  },
  // {
  //   key: "2",
  //   label: "Delivery Date",
  //   dataIndex: "deliveryDate",
  // },

  {
    key: "4",
    label: "Number Of Items",
    dataIndex: "itemsCount",
    align: "center",
  },
  {
    key: "3",
    label: "Status",
    dataIndex: "status",
    align: "center",
    render: (item) => {
      return <StatusIndicator value={item.status} />;
    },
  },
  {
    key: "3",
    label: "Total",
    dataIndex: "total",
    align: "right"
  },
];
