export const statusFilterFunction = (task, filter) => {
  // check if all is true
  const isAllTrue = filter.status.filter((item) => item.status === false);
  if (isAllTrue.length === 4) {
    return true;
  }
  // what is this task ?
  const thisTaskIs = task.priority.filter((item) => item.active === true);
  const thisTaskName = thisTaskIs[0].name.toLowerCase();
  // ok. is urgent on ?
  const i = filter.status.findIndex((item) => item.name === thisTaskName);
  if (i >= 0) {
    const statusIs = filter.status[i].status;
    if (!statusIs) {
      return false;
    } else {
      return true;
    }
  }
};

export const timeFilterFunction = (task, filter) => {
  const { time } = filter;
  if (!filter.timeZone[task.id]) {
    if (time === null) {
      return true;
    } else {
      return false;
    }
  }
  const timeZone = filter.timeZone[task.id].zone;
  if (time === null) {
    return true;
  }
  if (time === 0 && timeZone === 0) {
    return true;
  }
  if (time === 1 && timeZone <= 1) {
    return true;
  }
  if (time === 7 && timeZone <= 7) {
    return true;
  }
  if (time === 30 && timeZone <= 30) {
    return true;
  } else {
    return false;
  }
};

export const personFilterFunction = (task, filter) => {
  const { user } = filter;
  if (task.assign !== null) {
    return true;
  }
  if (user === task.assign) {
    return true;
  } else {
    return false;
  }
};
