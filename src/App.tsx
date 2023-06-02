import { MantineProvider } from "@mantine/core";
import Layout from "./Layout";
import { DatesProvider } from "@mantine/dates";
import "dayjs/locale/es";

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <DatesProvider
        settings={{ locale: "es", firstDayOfWeek: 0, weekendDays: [0] }}
      >
        <Layout />
      </DatesProvider>
    </MantineProvider>
  );
}
