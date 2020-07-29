import unittest

class Test(unittest.TestCase):

    def setUp(self):
        self.s = Solution()

    def test_examples(self):
        self.assertEqual(self.s.divide(10, 3), 3)
        self.assertEqual(self.s.divide(7, -3), -2)

    def test_no_remainder(self):
        self.assertEqual(self.s.divide(10, 2), 5)
        self.assertEqual(self.s.divide(10, 10), 1)
        self.assertEqual(self.s.divide(-10, -1), 10)

    def test_zero(self):
        self.assertEqual(self.s.divide(0, 2), 0)
        self.assertEqual(self.s.divide(0, -2), 0)

    def test_maxint(self):
        self.assertEqual(self.s.divide(1, pow(2, 31)-1), 0)
        self.assertEqual(self.s.divide(1, -pow(2, 31)), 0)
        self.assertEqual(self.s.divide(pow(2, 31)-1, 1), pow(2, 31)-1)
        self.assertEqual(self.s.divide(pow(2, 31)-1, -1), -(pow(2, 31)-1))
        self.assertEqual(self.s.divide(-pow(2, 31), 1), -pow(2, 31))
        self.assertEqual(self.s.divide(-pow(2, 31), -1), pow(2, 31)-1)
        self.assertEqual(self.s.divide(pow(2, 31)-1, pow(2, 31)-1), 1)
        self.assertEqual(self.s.divide(-pow(2, 31), pow(2, 31)-1), -1)
        self.assertEqual(self.s.divide(pow(2, 31)-1, -pow(2, 31)), 0)
        self.assertEqual(self.s.divide(-pow(2, 31), -pow(2, 31)), 1)

class Solution:

    def divide(self, dividend: int, divisor: int) -> int:
        is_neg = (dividend < 0) != (divisor < 0)
        dividend, divisor = abs(dividend), abs(divisor)
        quotient = 0
        while dividend >= divisor:
            curr_divisor = divisor
            curr_quotient = 1
            while dividend >= curr_divisor:
                curr_divisor <<= 1
                curr_quotient <<= 1
            curr_divisor >>= 1
            curr_quotient >>= 1
            dividend -= curr_divisor
            quotient += curr_quotient
        if is_neg:
            quotient *= -1
        if quotient < -pow(2, 31) or quotient > pow(2, 31)-1:
            return pow(2, 31)-1
        return quotient

if __name__ == "__main__":
    unittest.main()
