const enhancer = require('./enhancer.js');

let item = {
  name: 'Helmet',
  durability: 23,
  enhancement: 0,
};

describe('enhancer', () => {
  describe('repairs', () => {
    it.todo('an items durability to 100');
    it.todo('cannot have a durability of < 0 or > 100');
  });

  describe('succeeds', () => {
    it.todo('cannot have an enhancement below or above 20');
    it.todo('will not increase enhancement over 20');
    it.todo('will increment the enhancement level');
  });

  describe('fails', () => {
    it.todo('will reduce the durability based on initial enhancement level');
    it.todo('will reduce the enhancement level by 1 if it is greater than 16 initially');
  })

  describe('gets', () => {
    it.todo('will get the name of the item based on the enhancement level');
  })
});