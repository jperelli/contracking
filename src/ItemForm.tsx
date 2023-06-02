import { useState } from "react";
import UUID from "pure-uuid";
import { useForm } from "@mantine/form";
import { IconCalendar } from "@tabler/icons-react";
import {
  Group,
  Button,
  Paper,
  Text,
  LoadingOverlay,
  useMantineTheme,
  Input,
  InputBase,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { getISODate } from "./utils";

export interface Values {
  id: string;
  startedAt: string;
  endedAt: string;

  strength: number;
}

interface ItemFormProps {
  // onsubmit is a promise function that returns nothing
  onSubmit?: (values: Values) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  initialValues?: Partial<Values>;
}

export default function ItemForm(props: ItemFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const theme = useMantineTheme();

  const form = useForm<Values>({
    initialValues: {
      id: props.initialValues?.id || new UUID(4).toString(),
      startedAt: props.initialValues?.startedAt || getISODate(),
      endedAt: props.initialValues?.endedAt || getISODate(),
      strength: props.initialValues?.strength || 1,
    },
  });

  const handleSubmit = () => {
    setLoading(true);
    setError(null);
    props
      .onSubmit?.(form.values)
      .then(() => {
        setLoading(false);
        form.reset();
        form.setFieldValue("id", new UUID(4).toString());
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleDelete = () => {
    setLoading(true);
    setError(null);
    props
      .onDelete?.(form.values.id)
      .then(() => {
        setLoading(false);
        form.reset();
        form.setFieldValue("id", new UUID(4).toString());
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <Paper
      sx={{
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LoadingOverlay visible={loading} />
        <Input type="hidden" {...form.getInputProps("id")} />
        <DateTimePicker
          mt="md"
          required
          placeholder="Started At"
          label="Started At"
          icon={<IconCalendar size={16} stroke={1.5} />}
          {...form.getInputProps("date")}
          value={new Date(form.values.startedAt)}
          onChange={(value) => form.setFieldValue("date", getISODate(value))}
        />
        <DateTimePicker
          mt="md"
          placeholder="Ended At"
          label="Ended At"
          icon={<IconCalendar size={16} stroke={1.5} />}
          {...form.getInputProps("date")}
          value={new Date(form.values.endedAt)}
          onChange={(value) => form.setFieldValue("date", getISODate(value))}
        />
        Duration: // show duration here
        {/* <Button onClick={() => {
          // open duration modal
        }}> */}
        <InputBase
          mt="md"
          required
          type="number"
          placeholder="Strength"
          label="Strength"
          {...form.getInputProps("strength")}
        />
        {error && (
          <Text color="red" size="sm" mt="sm">
            {error}
          </Text>
        )}
        <Group position="right" mt="xl">
          <Button color="red" onClick={handleDelete}>
            Delete
          </Button>
          <Button type="submit">Save</Button>
        </Group>
      </form>
    </Paper>
  );
}
