import { Modal } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import ItemForm, { type Values } from "./ItemForm";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useMemo, useState } from "react";
import { TimeDiff } from "./utils";

export default function Content() {
  const [editItem, setEditItem] = useState<Values | null>(null);

  const [items, setItems] = useLocalStorage<Array<Values>>({
    key: "items",
    defaultValue: [],
  });

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "startedAt",
    direction: "desc",
  });

  const tableData = useMemo(() => {
    const data = [...items];
    const colName = sortStatus.columnAccessor as keyof Values;
    data.sort((a, b) => {
      const av = a[colName] || 0;
      const bv = b[colName] || 0;
      if (av < bv) {
        return sortStatus.direction === "asc" ? -1 : 1;
      }
      if (av > bv) {
        return sortStatus.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return data;
  }, [sortStatus, items]);

  const onSubmitEdit = async (editedItem: Values) => {
    const item = items.find((item) => item.id === editedItem.id);
    if (!item) return;
    setItems(
      items.map((item) => (item.id === editedItem.id ? editedItem : item))
    );
    setEditItem(null);
  };

  const onDelete = async (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    setEditItem(null);
  };

  return (
    <>
      <Modal
        opened={Boolean(editItem)}
        onClose={() => setEditItem(null)}
        title="Edit Consulta"
        centered
      >
        {editItem ? (
          <ItemForm
            onSubmit={onSubmitEdit}
            onDelete={onDelete}
            initialValues={editItem}
          />
        ) : null}
      </Modal>

      <DataTable<Values>
        withBorder
        borderRadius="sm"
        withColumnBorders
        striped
        highlightOnHover
        records={tableData}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        columns={[
          {
            accessor: "startedAt",
            sortable: true,
            render: (item) => item.startedAt.replace("T", " ").split(".")[0],
          },
          {
            accessor: "time",
            render: (item) => (
              <TimeDiff start={item.startedAt} end={item.endedAt} />
            ),
          },
          {
            accessor: "strength",
          },
        ]}
        onRowClick={(item) => setEditItem(item)}
      />
    </>
  );
}
