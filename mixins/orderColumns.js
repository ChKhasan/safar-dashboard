export default {
  data() {
    return {
      columns: [
        {
          title: "Заказ ID",
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
          dataIndex: "dataEdit",
          scopedSlots: { customRender: "dataEdit" },
          className: "column-name",
          key: "dataEdit",
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
