import unittest

class Test(unittest.TestCase):

    def setUp(self):
        self.s = Solution()

    def test_examples(self):
        self.assertEqual(self.s.buddyStrings("ab", "ba"), True)
        self.assertEqual(self.s.buddyStrings("ab", "ab"), False)
        self.assertEqual(self.s.buddyStrings("aa", "aa"), True)
        self.assertEqual(self.s.buddyStrings("aaaaaaabc", "aaaaaaacb"), True)
        self.assertEqual(self.s.buddyStrings("", "aa"), False)

    def test_single(self):
        self.assertEqual(self.s.buddyStrings("a", "a"), False)

    def test_empty_b(self):
        self.assertEqual(self.s.buddyStrings("aa", ""), False)

    def test_distant_swap(self):
        self.assertEqual(self.s.buddyStrings("aabaaaaac", "aacaaaaab"), True)

    def test_two_diffs_different_chars(self):
        self.assertEqual(self.s.buddyStrings("abcaa", "abcbb"), False)

    def test_dupe_too_different(self):
        self.assertEqual(self.s.buddyStrings("abcaaa", "abcbbb"), False)

class Solution:

    def buddyStrings(self, A: str, B: str) -> bool:
        if len(A) != len(B):
            return False
        seen = set()
        if A == B:
            for a in A:
                if a in seen:
                    return True
                seen.add(a)
            return False
        diffs = []
        for i in range(len(A)):
            a = A[i]
            if a != B[i]:
                diffs.append(i)
            if len(diffs) > 2:
                return False
        return len(diffs) == 2 and A[diffs[0]] == B[diffs[1]] and A[diffs[1]] == B[diffs[0]]

if __name__ == "__main__":
    unittest.main()
