import StatusIndicator from "../components/StatusIndicator";

export const columns = [
  {
    key: "1",
    label: "Order ID",
    dataIndex: "orderId",
  },
  {
    key: "2",
    label: "Customer",
    dataIndex: "customerName",
  },
  {
    key: "3",
    label: "Date",
    dataIndex: "date",
  },
  {
    key: "4",
    label: "Number Of Items",
    dataIndex: "itemsCount",
    align: "center",
  },
  {
    key: "5",
    label: "Status",
    dataIndex: "status",
    align: "center",
    render: (item) => {
      return <StatusIndicator value={item.status} />;
    },
  },
  {
    key: "6",
    label: "Total",
    dataIndex: "total",
    align: "right",
  },
];
