// A Boolean Function searches if the key exist in object

// params - object
//          key
// returns true/false

export const doesKeyExist = (object, key) => {
  return key in object;
};
