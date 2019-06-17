module.exports = {
  succeed,
  fail,
  repair,
  get,
};

const itemShape = item => {
  const keys = Object.keys(item);
  return (
    keys.includes('name') &&
    keys.includes('durability') &&
    keys.includes('enhancement')
  );
};

const itemTypes = item => {
  const { name, durability, enhancement } = item;
  return (
    typeof name === 'string' &&
    typeof durability === 'number' &&
    typeof enhancement === 'number'
  );
};

const itemConstraints = item => {
  return (
    item.durability >= 0 &&
    item.durability <= 100 &&
    item.enhancement >= 0 &&
    item.enhancement <= 20
  );
};

const checkItem = item => {
  return (
    typeof item === 'object' &&
    itemShape(item) &&
    itemTypes(item) &&
    itemConstraints(item)
  );
};

function succeed(item) {
  const { enhancement } = item;
  if (!checkItem(item)) {
    return false;
  }
  return {
    ...item,
    enhancement: enhancement + 1 >= 20 ? 20 : enhancement + 1
  };
}

function fail(item) {
  const { enhancement, durability } = item;
  if (!checkItem(item)) {
    return false;
  }
  const durabilityReduction = enhancement >= 15 ? 10 : 5;
  const enhancementReduction = enhancement > 16 ? 1 : 0;

  return {
    ...item,
    enhancement: enhancement - enhancementReduction,
    durability: durability - durabilityReduction
  };
}

function repair(item) {
  if (!checkItem(item)) {
    return false;
  } else {
    return {
      ...item,
      durability: 100
    };
  }
}

function get(item) {
  if (!checkItem(item)) {
    return false;
  }
  if (item.enhancement > 0) {
    return {
      ...item,
      name: item.name + ` [+${item.enhancement}]`
    };
  } else {
    return item;
  }
}
