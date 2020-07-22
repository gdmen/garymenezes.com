from collections import defaultdict
from typing import List
import unittest

class Test(unittest.TestCase):

    def setUp(self):
        self.s = Solution()

    def test_examples(self):
        self.assertEqual(self.s.numIdenticalPairs([1,2,3,1,1,3]), 4)
        self.assertEqual(self.s.numIdenticalPairs([1,1,1,1]), 6)
        self.assertEqual(self.s.numIdenticalPairs([1,2,3]), 0)

    def test_empty(self):
        self.assertEqual(self.s.numIdenticalPairs([]), 0)

    def test_end(self):
        self.assertEqual(self.s.numIdenticalPairs([1,2,3,4,5,4,4]), 3)

class Solution:

    def numIdenticalPairs(self, nums: List[int]) -> int:
        count = 0
        history = defaultdict(int)
        for n in nums:
            count += history[n]
            history[n] += 1
        return count

if __name__ == "__main__":
    unittest.main()
