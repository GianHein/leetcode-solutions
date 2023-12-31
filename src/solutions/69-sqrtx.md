# 69. Sqrt(x)

- Difficulty: Easy
- Related Topics: Math, Binary Search

## Problem

<p>Given a non-negative integer <code>x</code>, return <em>the square root of </em><code>x</code><em> rounded down to the nearest integer</em>. The returned integer should be <strong>non-negative</strong> as well.</p>

<p>You <strong>must not use</strong> any built-in exponent function or operator.</p>

<ul>
    <li>For example, do not use <code>pow(x, 0.5)</code> in c++ or <code>x ** 0.5</code> in python.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> x = 4
<strong>Output:</strong> 2
<strong>Explanation:</strong> The square root of 4 is 2, so we return 2.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> x = 8
<strong>Output:</strong> 2
<strong>Explanation:</strong> The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
    <li><code>0 &lt;= x &lt;= 2<sup>31</sup> - 1</code></li>
</ul>

## Solution

```javascript
/**
 * @param {number} x
 * @return {number}
 */

// This is a binary search implementation.
var mySqrt = function (x) {
  // Defining the left and right boundaries of the search
  let left = 0;
  let right = x;

  //  Iterating until the left and right boundaries meet
  while (left <= right) {
    // Calculating the middle point.
    // Using (left + right) / 2 would cause an overflow.
    let mid = left + (right - left) / 2;

    // If the middle point is the square root of x, return it.
    if (Math.floor(mid * mid) == x) return Math.floor(mid);
    // If the middle point is greater than the square root of x,
    // the square root of x is in the left half of the search.
    if (mid * mid > x) right = mid;
    // If the middle point is less than the square root of x,
    // the square root of x is in the right half of the search.
    if (mid * mid < x) left = mid;
  }
};

// Surprisingly, this solution was arguably worse than the previous one.
// It took 109ms to run and a memory usage of 44.21MB,
// beating only 11.49% of the submissions.
// There is most definitely room for optimization on this one.
```

```javascript
// This is an old solution that I have submitted.
// At the time, I did not know that binary search
// was the expected solution (see related topics).
// I am keeping it here for reference.

/**
 * @param {number} x
 * @return {number}
 */

// This is a Heron's method implementation.
// https://en.wikipedia.org/wiki/Methods_of_computing_square_roots#Heron's_method

var mySqrt = function (x) {
  // Starting with an approximation of 4 (the square root of 16)
  let approximation = 4;

  // Iterating 24 times to get a good approximation
  for (let i = 0; i <= 24; i++) {
    let current = approximation;
    // Heron's method
    approximation = 0.5 * (current + x / current);
  }

  return Math.floor(approximation);
};

// Even though the solution took 74ms to run and
// a memory usage of 43.9MB, beating 39.65% of the submissions,
// I am still not fully satisfied with it.
// The solution is not very elegant and I am sure there is a better way to do it.
```

**Explanation:**

View solution.
