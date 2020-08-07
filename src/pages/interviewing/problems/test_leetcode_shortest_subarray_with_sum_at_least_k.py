from typing import List
import unittest

class Test(unittest.TestCase):

    def setUp(self):
        self.s = Solution()

    def test_examples(self):
        self.assertEqual(self.s.shortestSubarray([1], 1), 1)
        self.assertEqual(self.s.shortestSubarray([1,2], 4), -1)
        self.assertEqual(self.s.shortestSubarray([2,-1,2], 3), 3)
        self.assertEqual(self.s.shortestSubarray([-34,37,51,3,-12,-50,51,100,-47], 151), 2)

    def test_multi_removal(self):
        self.assertEqual(self.s.shortestSubarray([-1,-1,1], 1), 1)
        self.assertEqual(self.s.shortestSubarray([1,-1,-1,1,2], 3), 2)
        self.assertEqual(self.s.shortestSubarray([3,-1,2,3], 5), 2)

    def test_long(self):
        self.assertEqual(self.s.shortestSubarray([1,-1]*25000, 2), -1)

class Solution:

    def shortestSubarray(self, A: List[int], K: int) -> int:
        val = A[0]
        ln = 1
        ps = [(val,ln)]
        ret = len(A)+1 if val < K else ln
        for j in range(1,len(A)):
            val += A[j]
            ln += 1
            if A[j] <= 0:
                ps[-1] = (ps[-1][0]+A[j], ps[-1][1]+1)
            else:
                ps.append((A[j],1))
            # Compress ps - any negative prev can be squashed since
            # it will always be removed if the prev before it is removed
            try:
                while ps[-1][0] < 0:
                    ps[-2] = (ps[-2][0]+ps[-1][0], ps[-2][1]+ps[-1][1])
                    del ps[-1]
            except IndexError:
                pass
            while ps and (val - ps[0][0] >= K):
                val -= ps[0][0]
                ln -= ps[0][1]
                del ps[0]
            if val >= K:
                ret = min(ret, ln)
        return -1 if ret == len(A)+1 else ret

if __name__=="__main__":
    unittest.main()
