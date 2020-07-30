from collections import defaultdict
import math
from typing import List
import unittest

class Test(unittest.TestCase):

    def setUp(self):
        self.s = Solution()

    def test_examples(self):
        self.assertEqual(self.s.maxPoints([[1,1],[2,2],[3,3]]), 3)
        self.assertEqual(self.s.maxPoints([[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]), 4)
        self.assertEqual(self.s.maxPoints([[1,1],[2,1],[2,2],[1,4],[3,3]]), 3)

    def test_duplicates(self):
        self.assertEqual(self.s.maxPoints([[0,0],[0,0]]), 2)
        self.assertEqual(self.s.maxPoints([[1,1],[2,2],[1,1]]), 3)
        self.assertEqual(self.s.maxPoints([[0,0],[1,1],[0,0],[1,1],[1,1]]), 5)
        p = [[1,1]]*100
        p.append([2,2])
        self.assertEqual(self.s.maxPoints(p), 101)

    def test_small(self):
        self.assertEqual(self.s.maxPoints([]), 0)
        self.assertEqual(self.s.maxPoints([[1,1]]), 1)
        self.assertEqual(self.s.maxPoints([[1,1],[5135351,5181483]]), 2)

    def test_diff_y_interects(self):
        self.assertEqual(self.s.maxPoints([[1,3],[3,2],[3,1],[4,1],[2,3],[1,4]]), 4)

    def test_horizontal_line(self):
        self.assertEqual(self.s.maxPoints([[1,1],[2,1],[3,1],[0,0]]), 3)

    def test_negatives(self):
        self.assertEqual(self.s.maxPoints([[-3,2],[-4,1],[-2,3],[-1,4]]), 4)
        self.assertEqual(self.s.maxPoints([[-1,3],[-3,2],[-3,1],[-4,1],[-2,3],[-1,4]]), 4)

    def test_vertical_line(self):
        self.assertEqual(self.s.maxPoints([[0,0],[0,1],[0,2],[1,1]]), 3)

class Solution:

    def maxPoints(self, points: List[List[int]]) -> int:
        if len(points) == 0:
            return 0
        weights = defaultdict(int)
        for p in points:
            weights[(p[0],p[1])] += 1
        if len(weights) == 1:
            return len(points)
        # slope_x,slope_y,y_intercept_num,y_intercept_denom: set
        lines = defaultdict(set)
        points = [*weights]
        for i in range(len(points)):
            for j in range(i+1, len(points)):
                s_x = points[i][0] - points[j][0]
                if s_x == 0:
                    # vertical line - slope is undefined and there is no y-intercept
                    # use the slope numerator to distinguish different vertical lines
                    s_y = points[i][0]
                    i_n = 0
                    i_d = 0
                else:
                    s_y = points[i][1] - points[j][1]
                    is_neg = (s_x < 0) != (s_y < 0)
                    s_x, s_y = abs(s_x), abs(s_y)
                    s_gcd = math.gcd(s_x, s_y)
                    if s_gcd != 0:
                        s_x //= s_gcd
                        s_y //= s_gcd
                    if is_neg:
                        s_x *= -1
                    # compute the y-intercept
                    i_n = s_x*points[i][1] - s_y*points[i][0]
                    i_d = s_x
                    if i_n == 0:
                        i_d = 0
                    else:
                        i_gcd = math.gcd(i_n, i_d)
                        if i_gcd != 0:
                            i_n /= i_gcd
                            i_d /= i_gcd
                key = "%d,%d,%d,%d" % (s_x, s_y, i_n, i_d)
                lines[key].add(points[i])
                lines[key].add(points[j])
        ret = 1
        for _,ps in lines.items():
            ret = max(ret, sum([weights[p] for p in ps]))
        return ret

if __name__ == "__main__":
    unittest.main()
