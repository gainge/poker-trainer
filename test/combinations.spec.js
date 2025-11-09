import {it, expect} from "./testutil.js"
import { combinations } from "../src/util.js";

it('should generate correct combinations of 2 from [1,2,3]', () => {
    const result = combinations([1, 2, 3], 2);
    const expected = [
        [1, 2],
        [1, 3],
        [2, 3]
    ];
    expect(JSON.stringify(result) == JSON.stringify(expected), `Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(result)}`);
});

it('should generate correct combinations of 3 from [A,B,C,D]', () => {
    const result = combinations(['A', 'B', 'C', 'D'], 3);
    const expected = [
        ['A', 'B', 'C'],
        ['A', 'B', 'D'],
        ['A', 'C', 'D'],
        ['B', 'C', 'D']
    ];
    expect(JSON.stringify(result) == JSON.stringify(expected), `Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(result)}`);
});

it('should return empty array when k is 0', () => {
    const result = combinations([1, 2, 3], 0);
    const expected = [[]];
    expect(JSON.stringify(result) == JSON.stringify(expected), `Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(result)}`);
});

it('should return empty array when k is greater than array length', () => {
    const result = combinations([1, 2], 3);
    const expected = [];
    expect(JSON.stringify(result) == JSON.stringify(expected), `Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(result)}`);
});

it('should generate correct combinations of 1 from [X,Y,Z]', () => {
    const result = combinations(['X', 'Y', 'Z'], 1);
    const expected = [
        ['X'],
        ['Y'],
        ['Z']
    ];
    expect(JSON.stringify(result) == JSON.stringify(expected), `Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(result)}`);
});

it('should generate correct combinations of 0 from empty array', () => {
    const result = combinations([], 0);
    const expected = [[]];
    expect(JSON.stringify(result) == JSON.stringify(expected), `Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(result)}`);
});

it('should return empty array when input array is empty and k > 0', () => {
    const result = combinations([], 2);
    const expected = [];
    expect(JSON.stringify(result) == JSON.stringify(expected), `Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(result)}`);
});

it('should generate correct combinations of 4 from [1,2,3,4,5]', () => {
    const result = combinations([1, 2, 3, 4, 5], 4);
    const expected = [
        [1, 2, 3, 4],
        [1, 2, 3, 5],
        [1, 2, 4, 5],
        [1, 3, 4, 5],
        [2, 3, 4, 5]
    ];
    expect(JSON.stringify(result) == JSON.stringify(expected), `Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(result)}`);
});

it('should generate correct combinations of all elements when k equals array length', () => {
    const result = combinations([7, 8, 9], 3);
    const expected = [
        [7, 8, 9]
    ];
    expect(JSON.stringify(result) == JSON.stringify(expected), `Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(result)}`);
});

it('should handle combinations of strings with special characters', () => {
    const result = combinations(['@', '#', '$'], 2);
    const expected = [
        ['@', '#'],
        ['@', '$'],
        ['#', '$']
    ];
    expect(JSON.stringify(result) == JSON.stringify(expected), `Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(result)}`);
});

it('should generate correct combinations of 3 from [a,b,c,d,e]', () => {
    const result = combinations(['a', 'b', 'c', 'd', 'e'], 3);
    const expected = [
        ['a', 'b', 'c'],
        ['a', 'b', 'd'],
        ['a', 'b', 'e'],
        ['a', 'c', 'd'],
        ['a', 'c', 'e'],
        ['a', 'd', 'e'],
        ['b', 'c', 'd'],
        ['b', 'c', 'e'],
        ['b', 'd', 'e'],
        ['c', 'd', 'e']
    ];
    expect(JSON.stringify(result) == JSON.stringify(expected), `Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(result)}`);
});

it('should generate correct combinations when dealing with objects', () => {
    const items = [{id: 1}, {id: 2}, {id: 3}];
    const result = combinations(items, 2);
    const expected = [
        [{id: 1}, {id: 2}],
        [{id: 1}, {id: 3}],
        [{id: 2}, {id: 3}]
    ];
    expect(JSON.stringify(result) == JSON.stringify(expected), `Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(result)}`);
});

it('should generate correct combinations in complex cases dealing with objects', () => {
    const items = [{name: 'Alice'}, {name: 'Bob'}, {name: 'Charlie'}, {name: 'Diana'}, {name: 'Susan'}];
    const result = combinations(items, 3);
    const expected = [
        [{name: 'Alice'}, {name: 'Bob'}, {name: 'Charlie'}],
        [{name: 'Alice'}, {name: 'Bob'}, {name: 'Diana'}],
        [{name: 'Alice'}, {name: 'Bob'}, {name: 'Susan'}],
        [{name: 'Alice'}, {name: 'Charlie'}, {name: 'Diana'}],
        [{name: 'Alice'}, {name: 'Charlie'}, {name: 'Susan'}],
        [{name: 'Alice'}, {name: 'Diana'}, {name: 'Susan'}],
        [{name: 'Bob'}, {name: 'Charlie'}, {name: 'Diana'}],
        [{name: 'Bob'}, {name: 'Charlie'}, {name: 'Susan'}],
        [{name: 'Bob'}, {name: 'Diana'}, {name: 'Susan'}],
        [{name: 'Charlie'}, {name: 'Diana'}, {name: 'Susan'}]
    ];
    expect(JSON.stringify(result) == JSON.stringify(expected), `Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(result)}`);
});

it('should generate correct combinations of 5 from [1,2,3,4,5,6,7]', () => {
    const result = combinations([1, 2, 3, 4, 5, 6, 7], 5);
    const expected = [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 6],
        [1, 2, 3, 4, 7],
        [1, 2, 3, 5, 6],
        [1, 2, 3, 5, 7],
        [1, 2, 3, 6, 7],
        [1, 2, 4, 5, 6],
        [1, 2, 4, 5, 7],
        [1, 2, 4, 6, 7],
        [1, 2, 5, 6, 7],
        [1, 3, 4, 5, 6],
        [1, 3, 4, 5, 7],
        [1, 3, 4, 6, 7],
        [1, 3, 5, 6, 7],
        [1, 4, 5, 6, 7],
        [2, 3, 4, 5, 6],
        [2, 3, 4, 5, 7],
        [2, 3, 4, 6, 7],
        [2, 3, 5, 6, 7],
        [2, 4, 5, 6, 7],
        [3, 4, 5, 6, 7]
    ];
    expect(JSON.stringify(result) == JSON.stringify(expected), `Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(result)}`);
});
