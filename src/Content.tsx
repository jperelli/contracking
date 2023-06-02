import { Button, Modal, Stack } from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import ItemForm, { type Values } from "./ItemForm";
import TrackerButton from "./TrackerButton";
import Chart from "./Chart";
import Table from "./Table";

export default function Content() {
  const [opened, { open, close }] = useDisclosure(false);

  const [items, setItems] = useLocalStorage<Array<Values>>({
    key: "items",
    defaultValue: [],
  });

  const onSubmitAdd = async (newItem: Values) => {
    setItems(items.concat(newItem));
    close();
  };

  return (
    <Stack align="stretch" justify="center">
      <TrackerButton />

      <Chart />

      <Table />

      <Button onClick={open}>Add Manual</Button>
      <Modal opened={opened} onClose={close} title="Add Manual" centered>
        <ItemForm onSubmit={onSubmitAdd} />
      </Modal>
    </Stack>
  );
}
