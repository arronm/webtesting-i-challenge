const enhancer = require('./enhancer.js');
const { repair, succeed, fail, get } = enhancer;

let item = {
  name: 'Helmet',
  durability: 23,
  enhancement: 0,
};

let itemTypes = {
  name: 'string',
  durability: 'number',
  enhancement: 'number'
};

const baseTests = fn => {
  it('exists', () => {
    expect(typeof fn).toBe('function');
  });

  it('only accepts an object with an item shape', () => {
    expect(fn('not an item')).toBeFalsy();
    expect(fn(33)).toBeFalsy();
    expect(fn({ random: 'object' })).toBeFalsy();

    Object.keys(item).forEach(key => {
      let value = 'cheese';
      if (itemTypes[key] === 'string') {
        value = 33;
      }
      expect(fn({ ...item, [key]: value })).toBeFalsy();
    });
  });

  it('returns an object with an item shape', () => {
    // TODO: refactor this to use a loop
    const newItem = fn(item);
    expect(newItem).toHaveProperty('name');
    expect(newItem).toHaveProperty('enhancement');
    expect(newItem).toHaveProperty('durability');

    expect(typeof newItem.name).toBe(itemTypes.name);
    expect(typeof newItem.enhancement).toBe(itemTypes.enhancement);
    expect(typeof newItem.durability).toBe(itemTypes.durability);
  });
}

describe('enhancer', () => {
  describe('repairs', () => {
    baseTests(repair);
    it('an items durability to 100', () => {
      expect(repair(item)).toEqual({
        ...item,
        durability: 100,
      });
      expect(repair({
        ...item,
        durability: 20.1927834711982374981237491823749128374,
      })).toEqual({
        ...item,
        durability: 100,
      });
    });
    it('cannot have a durability of < 0 or > 100', () => {
      expect(
        repair({
          ...item,
          durability: 500,
        })
      ).toBeFalsy();
      expect(
        repair({
          ...item,
          durability: -300,
        })
      ).toBeFalsy();
    });
  });

  describe('succeeds', () => {
    baseTests(succeed);
    it('cannot have an enhancement below or above 20', () => {
      expect(
        succeed({
          ...item,
          enhancement: 100
        })
      ).toBeFalsy();
      expect(
        succeed({
          ...item,
          enhancement: -30
        })
      ).toBeFalsy();
    });
    it('will not increase enhancement over 20', () => {
      expect(
        succeed({
          ...item,
          enhancement: 20
        })
      ).toEqual({
        ...item,
        enhancement: 20
      });
    });
    it('will increment the enhancement level', () => {
      expect(succeed(item)).toEqual({ ...item, enhancement: 1 });
    });
  });

  describe('fails', () => {
    it('will reduce the durability based on initial enhancement level', () => {

    });
    it('will reduce the enhancement level by 1 if it is greater than 16 initially', () => {
      
    });
  })

  describe('gets', () => {
    it.todo('will get the name of the item based on the enhancement level');
  })
});