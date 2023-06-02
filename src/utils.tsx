export function getISODate(date?: Date | null): string {
  const d = date || new Date();
  const tzoffset = (new Date()).getTimezoneOffset() * 60000;
  const localISOTime = (new Date(d.valueOf() - tzoffset)).toISOString().slice(0, -1);
  return localISOTime.split('T')[0];
}

export function getISOTime(date?: Date | null): string {
  return (date || new Date()).toISOString().split('T')[1];
}

export function TimeDiff(props: { start: Date | string; end: Date | string | null }) {
  const start = new Date(props.start);
  const end = props.end ? new Date(props.end) : new Date();
  const diff = end.getTime() - start.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  return (
    <>
      <span>{hours}:</span>
      <span>{minutes}:</span>
      <span>{seconds}</span>
    </>
  );
}