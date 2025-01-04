import moment from "moment";

export const formatTime = (timestamp: string): string => {
  if (!timestamp) return "";
  return moment(timestamp, "YYYYMMDDTHHmmssZ").format("Do MMMM YYYY, HH.mm");
};
