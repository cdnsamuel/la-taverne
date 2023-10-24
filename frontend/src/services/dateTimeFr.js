const dateTimeFr = (dateTime) => {
  const currentDate = new Date(dateTime);

  const date = currentDate.toLocaleDateString("fr", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
  const time = currentDate.toLocaleTimeString("fr", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { date, time };
};

export default dateTimeFr;
