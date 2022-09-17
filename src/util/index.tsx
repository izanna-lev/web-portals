import moment from "moment";

// For table serial numbers
export const SerialNum = (limit: number, page: number, index: number) => {
  let value = limit * page - limit + index + 1;
  if (value < 10) {
    return "0" + value;
  }
  return value;
};

export const setBackground = (image: string, id: string) => {
  const imageElement = document.getElementById(id);
  if (imageElement) {
    imageElement.style.backgroundImage = `url(${image})`;
    imageElement.style.backgroundPosition = "center";
    imageElement.style.backgroundSize = "100%";
  }
};

export const getFormattedDate = (dateTimeString: string) => {
  if (dateTimeString) {
    const getUTCDate = new Date(dateTimeString).toISOString();
    const formattedDate = moment(getUTCDate).format("D-MMM-YYYY");
    return formattedDate;
  }
  return "NA";
};

export const getFormattedTime = (dateTimeString: string) => {
  if (dateTimeString) {
    const getUTCTime = new Date(dateTimeString).toISOString();
    const formattedTime = moment(getUTCTime).format("LT");
    return formattedTime;
  }
  return "NA";
};
