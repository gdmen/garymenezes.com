from typing import List
import unittest

class Test(unittest.TestCase):

    def setUp(self):
        self.s = Solution()

    def test_examples(self):
        self.assertEqual(self.s.nearestPalindromic("123"), "121")
        self.assertEqual(self.s.nearestPalindromic("1805170081"), "1805115081")
        self.assertEqual(self.s.nearestPalindromic("1903828091"), "1903773091")
        self.assertEqual(self.s.nearestPalindromic("1283"), "1331")

    def test_one_digit(self):
        for i in range(1, 11):
            self.assertEqual(self.s.nearestPalindromic(str(i)), str(i-1))

    def test_wraparound(self):
        self.assertEqual(self.s.nearestPalindromic("99"), "101")
        self.assertEqual(self.s.nearestPalindromic("98"), "99")
        self.assertEqual(self.s.nearestPalindromic("101"), "99")
        self.assertEqual(self.s.nearestPalindromic("1901"), "1881")
        self.assertEqual(self.s.nearestPalindromic("100001"), "99999")
        self.assertEqual(self.s.nearestPalindromic("110011"), "109901")
        self.assertEqual(self.s.nearestPalindromic("105555"), "105501")

    def test_center(self):
        self.assertEqual(self.s.nearestPalindromic("909"), "919")
        self.assertEqual(self.s.nearestPalindromic("989"), "979")
        self.assertEqual(self.s.nearestPalindromic("999"), "1001")
        self.assertEqual(self.s.nearestPalindromic("1001"), "999")
        self.assertEqual(self.s.nearestPalindromic("1000"), "999")

    def test_long(self):
        self.assertEqual(self.s.nearestPalindromic("333332110"), "333333333")
        self.assertEqual(self.s.nearestPalindromic("30321"), "30303")

class Solution:

    def nearestPalindromic(self, n: str) -> str:
        mid = hi = lo = n
        half = n[:len(n)//2+len(n)%2]
        hi = str(int(half) + 1)
        if len(hi) > len(half):
            hi = "1" + "0" * (len(n)-1) + "1"
        else:
            hi = (hi[:-1] if len(n)%2 else hi) + hi[::-1]
        lo = str(int(half) - 1)
        if len(lo) < len(half) or (lo == "0" and len(lo) < len(n)):
            lo = "9" * (len(n)-1)
        else:
            lo = (lo[:-1] if len(n)%2 else lo) + lo[::-1]
        mid = (half[:-1] if len(n)%2 else half) + half[::-1]
        mid_dif = abs(int(mid) - int(n))
        hi_dif = abs(int(hi) - int(n))
        lo_dif = abs(int(lo) - int(n))
        return str(int(mid if mid_dif and mid_dif <= hi_dif and mid_dif < lo_dif else hi if hi_dif < lo_dif else lo))

if __name__=="__main__":
    unittest.main()
