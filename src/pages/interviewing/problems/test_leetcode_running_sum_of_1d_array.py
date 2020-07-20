from typing import List
import unittest

class Test(unittest.TestCase):

    def setUp(self):
        self.s = Solution()

    def test_example_1(self):
        self.assertEqual(self.s.runningSum([1,2,3,4]), [1,3,6,10])

    def test_example_2(self):
        self.assertEqual(self.s.runningSum([1,1,1,1,1]), [1,2,3,4,5])

    def test_example_3(self):
        self.assertEqual(self.s.runningSum([3,1,2,10,1]), [3,4,6,16,17])

    def test_empty(self):
        self.assertEqual(self.s.runningSum([]), [])

    def test_negatives(self):
        self.assertEqual(self.s.runningSum([1,2,-4,-2,0,4]), [1,3,-1,-3,-3,1])

class Solution:

    def runningSum(self, nums: List[int]) -> List[int]:
        running = 0
        sums = []
        for n in nums:
            running += n
            sums.append(running)
        return sums

if __name__ == "__main__":
    unittest.main()
