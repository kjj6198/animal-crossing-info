const NUMBER_REG = /(\d)(?=(\d{3})+(?!\d))/g;
const DELIMITER = ',';

function formatNumber(num, delimiter = DELIMITER) {
  const str = String(num);

  return str.replace(NUMBER_REG, `$1${delimiter}`);
}

function priceComparator(a, b) {
  return b - a;
}

export const fishTableConfig = {
  no: {
    name: '編號',
    type: 'number',
    formatter: (t) => `#${t}`,
  },
  icon: {
    name: '',
    type: 'image',
    style: {
      width: '30px',
    },
  },
  name: {
    name: '魚名',
    type: 'text',
    align: 'left',
    className: 'fishName',
  },
  price: {
    name: '價格',
    type: 'currency',
    align: 'right',
    sortable: true,
    formatter: function priceFormatter(t) {
      return formatNumber(t);
    },
    comparator: priceComparator,
  },
  price08: {
    accessor: (d) => d.price,
    name: '0.8 倍收購價',
    type: 'currency',
    align: 'right',
    sortable: true,
    formatter: function price08Formatter(t) {
      return formatNumber(t * 0.8);
    },
    comparator: priceComparator,
  },
  price15: {
    accessor: (d) => d.price,
    name: '1.5 倍收購價',
    type: 'currency',
    align: 'right',
    sortable: true,
    comparator: priceComparator,
    formatter: function price15Formatter(t) {
      return formatNumber(t * 1.5);
    },
  },
  season: {
    name: '出現月份',
    type: 'text',
    align: 'center',
    formatter: function seasonFormatter(t) {
      if (t.north.length === 12) {
        return '全季節';
      }

      return `<p>北半球：${t.north.join(',')}<br />南半球：${t.south.join(
        ','
      )}</p>`;
    },
  },
  timeAppear: {
    name: '時間帶',
    type: 'text',
    align: 'center',
    formatter: (t) => (t === null ? '全天' : `${t.from} - ${t.to}`),
  },
  place: {
    name: '出現場所',
    type: 'text',
    formatter: (t) => t[0],
    sortable: true,
    align: 'center',
    comparator: function placeComparator(a, b) {
      return b[0].charCodeAt(0) - a[0].charCodeAt(0);
    },
  },
};
