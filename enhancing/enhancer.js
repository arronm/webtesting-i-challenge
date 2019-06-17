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
  if (!checkItem(item)) {
    return false;
  }
  return { ...item };
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
  return { ...item };
}
