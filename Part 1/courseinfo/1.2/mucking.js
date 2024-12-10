const arto = {
  name: "arto",
  age: 35,
  nationality: "American",
  education: "Masters",

  // we can assign 'methods', or functionality to objects
  // by defining props that are functions
  greet: function () {
    console.log(`Hello, ${this.name}!`);
  },

  // simple adder func
  doAddition: function (a, b) {
    console.log(a + b);
  }
};

arto.greet();

// you can also assign methods after the object has been created, or "initialized"
arto.growOlder = function () {
  this.age += 1;
};

arto.growOlderByX = function (x) {
  this.age += x;
};

// arto.growOlder();
// console.log(`Arto is now ${arto.age}!`);
// arto.growOlder();
// console.log(`Arto is now ${arto.age}!`);
// arto.growOlderByX(10);
// console.log(`Arto is now ${arto.age}!`);

// we can store a REFERENCE to a method in a new variable:
// nb we don't have to add parentheses to the method name!
const refToAddition = arto.doAddition;
