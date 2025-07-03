const fs = require('fs');
const assert = require('assert');

const template = JSON.parse(fs.readFileSync('simple-system/template.json', 'utf8'));

function createActor(type) {
  const data = JSON.parse(JSON.stringify(template.Actor[type] || {}));
  return { type, ...data };
}

function runTests() {
  const infantry = createActor('infantry');
  assert.deepStrictEqual(infantry.system, { move: 6, attack: 2, defense: 1 });

  const cavalry = createActor('cavalry');
  assert.deepStrictEqual(cavalry.system, { move: 8, attack: 3, defense: 2 });

  const artillery = createActor('artillery');
  assert.deepStrictEqual(artillery.system, { move: 4, attack: 4, defense: 1 });

  console.log('All actor defaults verified.');
}

runTests();
