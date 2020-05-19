const reasons = [
  {
    color: 'green',
    name: 'Krankheit'
  },
  {
    color: 'red',
    name: 'Arztbesuch'
  },
  {
    color: 'black',
    name: 'Ausflug'
  },
  {
    color: 'orange',
    name: 'Familiäre Gründe'
  },
  {
    color: 'red',
    name: 'Sonstiges'
  }
]

function convertReason(reason: number) {
  return reasons[reason];
}

function reasonToNumber(reason: string) {
  return reasons.findIndex(_reason => _reason.name === reason);
}

export { reasonToNumber };

export default convertReason;
