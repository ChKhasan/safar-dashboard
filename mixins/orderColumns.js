export default {
  data() {
    return {
      columns: [
        {
          title: "ID заказа",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "orderId" },
          className: "column-service",
        },
        {
          title: "дата добавления",
          scopedSlots: { customRender: "dataAdd" },
          className: "column-date",
        },
        {
          title: "Услуга",
          dataIndex: "orders",
          scopedSlots: { customRender: "orders" },
          className: "column-name",
          key: "orders",
        },
        {
          title: "Время начала",
          dataIndex: "date_of_adoption",
          scopedSlots: { customRender: "date_of_adoption" },
          className: "column-name",
          key: "date_of_adoption",
          customRender: (text) => text ? text:'----'
        },
        {
          title: "сумма",
          dataIndex: "amount",
          scopedSlots: { customRender: "amount" },
          className: "column-name",
          key: "amount",
        },
        {
          title: "Клиент",
          dataIndex: "client",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "client" },
          className: "column-name",
          key: "client",
          align: "left",
          width: "20%",
        },

        {
          title: "статус",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          className: "column-tags",
          key: "status",
        },
        {
          title: "ДЕЙСТВИЯ",
          key: "id",
          dataIndex: "id",
          scopedSlots: { customRender: "btns" },
          className: "column-btns",
          width: "100px",
          align: "center",
        },
      ],
    };
  },
};
