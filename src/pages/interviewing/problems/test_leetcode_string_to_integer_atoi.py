import re
import unittest

class Test(unittest.TestCase):

    def setUp(self):
        self.s = Solution()

    def test_examples(self):
        self.assertEqual(self.s.myAtoi("42"), 42)
        self.assertEqual(self.s.myAtoi("   -42"), -42)
        self.assertEqual(self.s.myAtoi("4193 with words"), 4193)
        self.assertEqual(self.s.myAtoi("words and 987"), 0)
        self.assertEqual(self.s.myAtoi("-91283472332"), -2147483648)

    def test_invalid(self):
        self.assertEqual(self.s.myAtoi(""), 0)
        self.assertEqual(self.s.myAtoi(" "), 0)
        self.assertEqual(self.s.myAtoi("    "), 0)
        self.assertEqual(self.s.myAtoi("x"), 0)
        self.assertEqual(self.s.myAtoi("       x 1"), 0)
        self.assertEqual(self.s.myAtoi(" #1"), 0)
        # tab characters don't count
        self.assertEqual(self.s.myAtoi("\t1"), 0)

    def test_maxint(self):
        self.assertEqual(self.s.myAtoi("  -2147483649 xx"), -2147483648)
        self.assertEqual(self.s.myAtoi("  -2147483648 as"), -2147483648)
        self.assertEqual(self.s.myAtoi("  2147483648 gg"), 2147483647)
        self.assertEqual(self.s.myAtoi("  2147483647 hh"), 2147483647)

class Solution:

    def __init__(self):
        self.regex = re.compile('^ *([+-]?)(\d+)')
        self.max_int = 2**31-1
        self.min_int = -(2**31)

    def myAtoi(self, string: str) -> int:
        res = 0
        m = self.regex.match(string)
        if m:
            sign = m.group(1)
            num = m.group(2)
            for i in range(len(num)):
                res += (ord(num[i])-48) * 10**(len(num)-1-i)
            if sign == "-":
                res *= -1
            if res < self.min_int:
                return self.min_int
            elif res > self.max_int:
                return self.max_int
        return res

if __name__ == "__main__":
    unittest.main()
