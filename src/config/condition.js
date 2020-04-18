const isInSeason = (data, place = null) => {
  const currentMonth = new Date().getMonth() + 1;

  if (data.season.north.length === 12) {
    return true;
  }

  if (place === 'NORTH') {
    return data.season.north.includes(currentMonth);
  } else if (place === 'SOUTH') {
    return data.season.south.includes(currentMonth);
  }

  return (
    data.season.north.includes(currentMonth) ||
    data.season.south.includes(currentMonth)
  );
};

const isInTime = (data) => {
  if (!isInSeason(data)) {
    return false;
  }

  if (!data.timeAppear) {
    return true;
  }

  const now = new Date();
  const currentHour = now.getHours();

  const { from, to } = data.timeAppear;

  if (to < from) {
    return currentHour >= from || currentHour === 0 || currentHour <= to;
  }

  return currentHour >= from && currentHour <= to;
};

export const condition = {
  IN_SEASON: {
    label: '當季',
    value: 'IN_SEASON',
    execute: isInSeason,
  },
  NOW: {
    label: '現在時間',
    value: 'NOW',
    execute: isInTime,
  },
  NORTH: {
    label: '北半球',
    value: 'NORTH',
    execute: (data) => isInSeason(data, 'NORTH'),
  },
  SOUTH: {
    label: '南半球',
    value: 'SOUTH',
    execute: (data) => isInSeason(data, 'SOUTH'),
  },
};
