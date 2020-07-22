from typing import List
import unittest

class Test(unittest.TestCase):

    def setUp(self):
        self.s = Solution()

    def test_examples(self):
        self.assertEqual(self.s.checkPossibility([4,2,3]), True)
        self.assertEqual(self.s.checkPossibility([4,2,1]), False)
        self.assertEqual(self.s.checkPossibility([1,4,5,3,2]), False)

    def test_empty(self):
        self.assertEqual(self.s.checkPossibility([]), True)

    def test_single(self):
        self.assertEqual(self.s.checkPossibility([1]), True)

    def test_double(self):
        self.assertEqual(self.s.checkPossibility([1,1]), True)
        self.assertEqual(self.s.checkPossibility([2,1]), True)
        self.assertEqual(self.s.checkPossibility([1,2]), True)

    def test_first(self):
        self.assertEqual(self.s.checkPossibility([3,2,3,4,5]), True)

    def test_last(self):
        self.assertEqual(self.s.checkPossibility([1,2,3,4,1]), True)

    def test_constrained(self):
        self.assertEqual(self.s.checkPossibility([4,5,3,4,5]), False)
        self.assertEqual(self.s.checkPossibility([3,4,3,4,5]), True)

class Solution:

    def checkPossibility(self, nums: List[int]) -> bool:
        if len(nums) <= 2:
            return True
        changed = False
        for i in range(len(nums)):
            adjusted = nums[i]
            if i+1 < len(nums):
                if nums[i] > nums[i+1]:
                    adjusted = nums[i+1]
            if i-1 >= 0:
                if adjusted < nums[i-1]:
                    if adjusted != nums[i]:
                        adjusted = nums[i]
                        continue
                    adjusted = nums[i-1]
            if adjusted != nums[i]:
                if changed:
                    return False
                changed = True
                nums[i] = adjusted
        prev = nums[0]
        for n in nums:
            if n < prev:
                return False
            prev = n
        return True

if __name__ == "__main__":
    unittest.main()
