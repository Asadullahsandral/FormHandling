import { useState } from "react";

export function useFilter(data, callback) {
  const [query, setQuery] = useState("");
  const filteredData = data.filter((item) =>
    callback(item).toLowerCase().includes(query.toLowerCase()),
  );
  return { setQuery, filteredData };
}
