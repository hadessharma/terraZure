import { detailsDisplayNames } from "@/utils";

function getDisplayName(name) {
  const match = detailsDisplayNames.find((item) => item.name === name);
  return match ? match.displayName : null;
}

export default function returnDetails(details) {
  return Object.entries(details).map(([key, value], i) => {
    if (key === "dnsServers") {
      if (value.length > 0) {
        value = value.split(`","`).join(", ");
      } else {
        value = "[ ]";
      }
    }
    return (
      <div key={i} className="flex gap-2">
        <p className="font-semibold capitalize">
          {getDisplayName(key) !== null ? getDisplayName(key) : key}
        </p>
        : <p className="capitalize">{value.toString()}</p>
      </div>
    );
  });
}
