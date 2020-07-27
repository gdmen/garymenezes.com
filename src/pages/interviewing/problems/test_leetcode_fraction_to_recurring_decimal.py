from typing import List
import unittest

class Test(unittest.TestCase):

    def setUp(self):
        self.s = Solution()

    def test_examples(self):
        self.assertEqual(self.s.fractionToDecimal(1,2), "0.5")
        self.assertEqual(self.s.fractionToDecimal(2,1), "2")
        self.assertEqual(self.s.fractionToDecimal(2,3), "0.(6)")

    def test_partial_repeat(self):
        self.assertEqual(self.s.fractionToDecimal(1,12), "0.08(3)")

    def test_sequence_repeat(self):
        self.assertEqual(self.s.fractionToDecimal(1,7), "0.(142857)")

    def test_num_larger_than_denom(self):
        self.assertEqual(self.s.fractionToDecimal(8,7), "1.(142857)")

    def test_zero(self):
        self.assertEqual(self.s.fractionToDecimal(0,2), "0")

    def test_negatives(self):
        self.assertEqual(self.s.fractionToDecimal(-1,2), "-0.5")
        self.assertEqual(self.s.fractionToDecimal(1,-2), "-0.5")
        self.assertEqual(self.s.fractionToDecimal(-1,-2), "0.5")

class Solution:

    def fractionToDecimal(self, numerator: int, denominator: int) -> str:
        seen = []
        ans = []
        is_neg = (numerator < 0) != (denominator < 0)
        numerator = abs(numerator)
        denominator = abs(denominator)
        if numerator == 0:
            return "0"
        while numerator > 0:
            if len(ans) == 1:
                ans[0] = ans[0] + "."
            if numerator in seen:
                ans.insert(seen.index(numerator), "(")
                ans.append(")")
                break
            seen.append(numerator)
            if numerator < denominator:
                numerator *= 10
                if not ans:
                    ans = ["0."]
                    seen.insert(0, 0)
            ans.append(str(numerator // denominator))
            numerator = numerator % denominator
        if is_neg:
            ans.insert(0, "-")
        return "".join(ans)

if __name__ == "__main__":
    unittest.main()
