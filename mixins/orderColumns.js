export default {
  data() {
    return {
      columns: [
        {
          title: "Заказ ID",
          dataIndex: "orderId",
          key: "orderId",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "orderId" },
          className: "column-service",
        },
        {
          title: "дата добавления",
          dataIndex: "dataAdd",
          scopedSlots: { customRender: "dataAdd" },
          className: "column-date",
          key: "dataAdd",
        },
        {
          title: "Услуга",
          dataIndex: "dataEdit",
          scopedSlots: { customRender: "dataEdit" },
          className: "column-name",
          key: "dataEdit",
        },
        {
          title: "сумма",
          dataIndex: "price",
          scopedSlots: { customRender: "price" },
          className: "column-name",
          key: "price",
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
          dataIndex: "tags",
          scopedSlots: { customRender: "tags" },
          className: "column-tags",
          key: "tags",
        },
        {
          title: "ДЕЙСТВИЯ",
          key: "btns",
          dataIndex: "btns",
          scopedSlots: { customRender: "btns" },
          className: "column-btns",
          width: "150px",
          align: "center",
        },
      ],
    };
  },
};
