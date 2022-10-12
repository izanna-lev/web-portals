import moment from "moment";

// For table serial numbers
export const SerialNum = (limit: number, page: number, index: number) => {
  const value = limit * page - limit + index + 1;
  if (value < 10) {
    return "0" + value;
  }
  return value;
};

// Set background image to an element
export const setBackground = (image: string, id: string) => {
  const imageElement = document.getElementById(id);
  if (imageElement) {
    imageElement.style.backgroundImage = `url(${image})`;
    imageElement.style.backgroundPosition = "center";
    imageElement.style.backgroundSize = "100%";
  }
};

// Get formatted date from UTC to Locale
export const getFormattedDate = (dateTimeString: string) => {
  if (dateTimeString) {
    const getUTCDate = new Date(dateTimeString).toISOString();
    const formattedDate = moment(getUTCDate).format("D-MMM-YYYY");
    return formattedDate;
  }
  return "NA";
};

// Get formatted time from UTC to Locale
export const getFormattedTime = (dateTimeString: string) => {
  if (dateTimeString) {
    const getUTCTime = new Date(dateTimeString).toISOString();
    const formattedTime = moment(getUTCTime).format("LT");
    return formattedTime;
  }
  return "NA";
};

// Compare two dates
export const compareDateRange = (fromDateTime: string, toDateTime: string) => {
  if (fromDateTime && toDateTime) {
    const startDateTime = new Date(fromDateTime);
    const endDateTime = new Date(toDateTime);
    if (startDateTime.getTime() >= endDateTime.getTime()) {
      return 0;
    }
    return 1;
  }
  return 0;
};

// Get no. of days within two dates
export const getDays = (fromDateTime: string, toDateTime: string) => {
  if (fromDateTime && toDateTime) {
    const startDateTime = new Date(fromDateTime);
    const endDateTime = new Date(toDateTime);
    const timeDifference = endDateTime.getTime() - startDateTime.getTime();
    // To calculate the no. of days between two dates
    return timeDifference / (1000 * 3600 * 24);
  }
  return -1;
};

// Edit list item in redux global state
export const editListItem = (
  dispatch: any,
  list: [],
  setList: any,
  id: string
) => {
  const updatedList = list.map((item: any) => {
    if (item._id === id) return { ...item, edit: true };
    return { ...item, edit: false };
  });
  dispatch(setList(updatedList));
};

// Get value of ref
export const getRefValue = (ref: any) => ref.current.value;
