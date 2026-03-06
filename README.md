# JavaScript Basic Concepts

## 1️⃣ Difference between `var`, `let`, and `const`

- **var** – Function scoped and can be **redeclared and updated**.
- **let** – Block scoped and can be **updated but not redeclared in the same scope**.
- **const** – Block scoped and **cannot be updated or redeclared after assignment**.

---

## 2️⃣ What is the Spread Operator (`...`)?

The **spread operator (`...`)** in JavaScript is used to **expand or unpack elements of an array or properties of an object into another array, object, or function arguments**.

Example:

```javascript
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
```

---

## 3️⃣ Difference between `map()`, `filter()`, and `forEach()`

- **map()** – Creates and returns a **new array** by transforming each element of the original array.
- **filter()** – Creates and returns a **new array** containing elements that **pass a specified condition**.
- **forEach()** – Executes a function for **each array element**, but **does not return a new array**.

---

## 4️⃣ What is an Arrow Function?

An **arrow function** is a shorter syntax for writing functions in JavaScript using the **`=>` (arrow) notation**.

Example:

```javascript
const add = (a, b) => a + b;
```

---

## 5️⃣ What are Template Literals?

**Template literals** are a feature in JavaScript that allow you to **embed variables and expressions inside strings using backticks (` `) and `${}` syntax**.

Example:

```javascript
const name = "Rahim";
const message = `Hello ${name}`;
```

---