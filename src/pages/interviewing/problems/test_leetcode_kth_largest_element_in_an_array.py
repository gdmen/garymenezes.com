import heapq
from typing import List
import unittest

class Test(unittest.TestCase):

    def setUp(self):
        self.s = Solution()

    def test_examples(self):
        self.assertEqual(self.s.findKthLargest([3,2,1,5,6,4], 2), 5)
        self.assertEqual(self.s.findKthLargest([3,2,3,1,2,4,5,5,6], 4), 4)

class Solution:

    def findKthLargest(self, nums: List[int], k: int) -> int:
        h = [-n for n in nums]
        heapq.heapify(h)
        for i in range(k-1):
            heapq.heappop(h)
        return -heapq.heappop(h)

if __name__ == "__main__":
    unittest.main()
