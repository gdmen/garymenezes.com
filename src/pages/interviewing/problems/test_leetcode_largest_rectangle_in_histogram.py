from collections import defaultdict
import math
from typing import List
import unittest

class Test(unittest.TestCase):

    def setUp(self):
        self.s = Solution()

    def _test(self, i, o):
        self.assertEqual(self.s.largestRectangleArea(i), o)

    def test_examples(self):
        self._test([2,1,5,6,2,3], 10)
        self._test([1,2,5,6,3,1], 10)

    def test_empty(self):
        self._test([], 0)
        self._test([0], 0)
        self._test([0,0,0,0,0], 0)

    def test_single(self):
        for i in range(1, 11):
            self._test([i], i)
            self._test([0,i,0], i)

    def test_increasing(self):
        self._test([0,1,2], 2)
        self._test([0,1,2,3], 4)
        self._test([0,1,2,3,4], 6)
        self._test([0,1,2,3,4,5], 9)
        self._test([0,1,2,3,4,5,6], 12)

    def test_decreasing(self):
        self._test([2,1,0], 2)
        self._test([3,2,1,0], 4)
        self._test([4,3,2,1,0], 6)
        self._test([5,4,3,2,1,0], 9)
        self._test([6,5,4,3,2,1,0], 12)

    def test_sorted_linked_list(self):
        l = Solution.SortedLinkedList(lambda v: v[0])
        self.assertEqual(l.insert_and_delete_greater((1,0)), [])
        self.assertEqual(l.list(), [(1,0)])
        self.assertEqual(l.insert_and_delete_greater((1,1)), [])
        self.assertEqual(l.list(), [(1,0),(1,1)])
        self.assertEqual(l.insert_and_delete_greater((2,2)), [])
        self.assertEqual(l.list(), [(1,0),(1,1),(2,2)])
        self.assertEqual(l.insert_and_delete_greater((1,3)), [(2,2)])
        self.assertEqual(l.list(), [(1,0),(1,1),(1,3)])
        self.assertCountEqual(l.insert_and_delete_greater((0,4)), [(1,0),(1,1),(1,3)])
        self.assertEqual(l.list(), [(0,4)])

class Solution:

    class SortedLinkedList:

        class Node:

            def __init__(self, value):
                self.v = value

            def __str__(self):
                return str(self.v)

        def __init__(self, get_cmp_val):
            self.get_cmp_val = get_cmp_val
            self.len = 0
            self.i_to_n = {}
            self.n_to_i = {}

        def __str__(self):
            return self.__repr__()

        def __repr__(self):
            return str(self.list())

        def list(self):
            return [self.i_to_n[i].v for i in range(self.len)]

        def find_insert(self, value):
            l, r = 0, self.len-1
            while l <= r:
                m = math.ceil((l + r) / 2)
                nm = self.i_to_n[m]
                if self.get_cmp_val(nm.v) <= self.get_cmp_val(value):
                    l = m + 1
                elif self.get_cmp_val(nm.v) > self.get_cmp_val(value):
                    r = m - 1
            return l

        """
        1. insert value
        2. delete all elements greater than value
        3. return those greater elements
        """
        def insert_and_delete_greater(self, value):
            n = self.Node(value)
            ind = self.find_insert(value)
            dels = []
            for i in range(self.len-1, ind-1, -1):
                r = self.i_to_n[i]
                dels.append(r.v)
                del self.i_to_n[i]
                del self.n_to_i[r]
            self.i_to_n[ind] = n
            self.n_to_i[n] = ind
            self.len = ind+1
            return dels

    def largestRectangleArea(self, heights: List[int]) -> int:
        if not heights:
            return 0
        res = []
        hsort = self.SortedLinkedList(lambda v: v[0])
        for i in range(len(heights)):
            dels = hsort.insert_and_delete_greater((heights[i], i))
            res.append((dels, i))
        res.append((hsort.list(), len(heights)))
        hsort = self.SortedLinkedList(lambda v: v[0])
        for i in range(len(heights)-1, -1, -1):
            dels = hsort.insert_and_delete_greater((heights[i], i))
            res.append((dels, i))
        res.append((hsort.list(), -1))
        totals = defaultdict(int)
        area = 0
        for dels,i in res:
            for v in dels:
                totals[v] += abs(i - v[1])
                area = max(v[0] * (totals[v] - 1), area)
        return area

if __name__=="__main__":
    unittest.main()
