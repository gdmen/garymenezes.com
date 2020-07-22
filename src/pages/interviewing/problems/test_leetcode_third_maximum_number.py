from math import inf
from typing import List
import unittest

class Test(unittest.TestCase):

    def setUp(self):
        self.s = Solution()

    def test_examples(self):
        self.assertEqual(self.s.thirdMax([3,2,1]), 1)
        self.assertEqual(self.s.thirdMax([1,2]), 2)
        self.assertEqual(self.s.thirdMax([2,2,3,1]), 1)

    def test_single(self):
        self.assertEqual(self.s.thirdMax([1]), 1)

    def test_inf(self):
        self.assertEqual(self.s.thirdMax([1, 2, -inf]), -inf)

    def test_no_third_max(self):
        self.assertEqual(self.s.thirdMax([1,2,2,2]), 2)

    def test_large(self):
        self.assertEqual(self.s.thirdMax([1,3,123,5,5,6,123,123,8,2,23,3,4,6,7,2,4,190,33,2,2]), 33)

class Solution:

    def thirdMax(self, nums: List[int]) -> int:
        f = s = t = None
        for n in nums:
            if n in (f, s, t):
                continue
            if f == None:
                f = n
            elif n > f:
                f, s, t = n, f, s
            elif s == None:
                s = n
            elif n > s:
                s, t = n, s
            elif t == None:
                t = n
            elif n > t:
                t = n
        return t if t != None else f

if __name__ == "__main__":
    unittest.main()
