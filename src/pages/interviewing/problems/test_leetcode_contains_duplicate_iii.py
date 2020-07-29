from bisect import bisect_left
import queue
from typing import List
import unittest

class Test(unittest.TestCase):

    def setUp(self):
        self.s = Solution()

    def test_examples(self):
        self.assertEqual(self.s.containsNearbyAlmostDuplicate([1,2,3,1], 3, 0), True)
        self.assertEqual(self.s.containsNearbyAlmostDuplicate([1,0,1,1], 1, 2), True)
        self.assertEqual(self.s.containsNearbyAlmostDuplicate([1,5,9,1,5,9], 2, 3), False)
        self.assertEqual(self.s.containsNearbyAlmostDuplicate([1,2], 0, 1), False)

    def test_too_small(self):
        self.assertEqual(self.s.containsNearbyAlmostDuplicate([], 0, 0), False)
        self.assertEqual(self.s.containsNearbyAlmostDuplicate([1], 0, 0), False)

    def test_large_n(self):
        pass # removed for website rendering
    
    def test_large_k(self):
        self.assertEqual(self.s.containsNearbyAlmostDuplicate([1,0,1,1], 2147483647, 2), True)

    def test_large_t(self):
        self.assertEqual(self.s.containsNearbyAlmostDuplicate([1,0,1,1], 1, 2147483647), True)

    def test_edge_k(self):
        self.assertEqual(self.s.containsNearbyAlmostDuplicate([1,0,1], 2, 0), True)
        self.assertEqual(self.s.containsNearbyAlmostDuplicate([1,0,1], 1, 0), False)

class Solution:

    def containsNearbyAlmostDuplicate(self, nums: List[int], k: int, t: int) -> bool:
        if k <= 0:
            return False
        window = queue.Queue(k)
        k_sorted = []
        for n in nums:
            i = bisect_left(k_sorted, n)
            if i-1 >= 0 and abs(n-k_sorted[i-1]) <= t:
                return True
            if i < len(k_sorted) and abs(n-k_sorted[i]) <= t:
                return True
            k_sorted.insert(i, n)
            if window.full():
                r_i = bisect_left(k_sorted, window.get_nowait())
                del k_sorted[r_i]
            window.put_nowait(n)
        return False

if __name__ == "__main__":
    unittest.main()
