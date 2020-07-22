import heapq
from typing import List
import unittest

class Test(unittest.TestCase):

    def setUp(self):
        self.s = Solution()

    def test_examples(self):
        self.assertCountEqual(self.s.kClosest([[1,3],[-2,2]], 1), [[-2,2]])
        self.assertCountEqual(self.s.kClosest([[3,3],[5,-1],[-2,4]], 2), [[-2,4],[3,3]])

    def test_empty(self):
        self.assertCountEqual(self.s.kClosest([], 0), [])

class Solution:

    class Point:
        __slots__ = "point", "dist"

        def __init__(self, point, dist):
            self.point, self.dist = point, dist

    def kClosest(self, points: List[List[int]], K: int) -> List[List[int]]:
        h = []
        for p in points:
            d = p[0]*p[0] + p[1]*p[1]
            pc = self.Point(p, d)
            h.append(pc)
        
        closest = heapq.nsmallest(K, h, key=lambda p: p.dist)
        return [p.point for p in closest]

if __name__ == "__main__":
    unittest.main()
