"""
A password is considered strong if below conditions are all met:

It has at least 6 characters and at most 20 characters.
It must contain at least one lowercase letter, at least one uppercase letter, and at least one digit.
It must NOT contain three repeating characters in a row ("...aaa..." is weak, but "...aa...a..." is strong, assuming other conditions are met).
Write a function strongPasswordChecker(s), that takes a string s as input, and return the MINIMUM change required to make s a strong password. If s is already strong, return 0.

Insertion, deletion or replace of any one character are all considered as one change.
"""
import unittest

class Test(unittest.TestCase):

    def setUp(self):
        self.s = Solution()

    def test_examples(self):
        self.assertEqual(self.s.strongPasswordChecker("aaa111"), 2)

    def test_no_change(self):
        for i in range(1, 4):
            self.assertEqual(self.s.strongPasswordChecker("aB218d"*i), 0)

    def test_no_low(self):
        self.assertEqual(self.s.strongPasswordChecker("B2"*5), 1)

    def test_no_up(self):
        self.assertEqual(self.s.strongPasswordChecker("b2"*5), 1)

    def test_no_dig(self):
        self.assertEqual(self.s.strongPasswordChecker("bB"*5), 1)

    def test_no_low_up_dig(self):
        self.assertEqual(self.s.strongPasswordChecker("#!"*5), 3)

    def test_short(self):
        self.assertEqual(self.s.strongPasswordChecker("a"), 5)

    def test_short_basic_combos(self):
        self.assertEqual(self.s.strongPasswordChecker("abcde"), 2)
        self.assertEqual(self.s.strongPasswordChecker("ABCDE"), 2)
        self.assertEqual(self.s.strongPasswordChecker("12345"), 2)
        self.assertEqual(self.s.strongPasswordChecker("!@#$%"), 3)

    def test_long(self):
        self.assertEqual(self.s.strongPasswordChecker("abcdefghijklmnopqrstuvwxyZ1"), 7)

    def test_long_no_low_up_dig(self):
        self.assertEqual(self.s.strongPasswordChecker("abcdefghijklmnopqrstuvwxyZ"), 7)
        self.assertEqual(self.s.strongPasswordChecker("abcdefghijklmnopqrstuvwx1Z"), 6)

    def test_rep_single(self):
        self.assertEqual(self.s.strongPasswordChecker("B3"+"a"*6), 2)
        self.assertEqual(self.s.strongPasswordChecker("B3"+"a"*7+"x"), 2)
        self.assertEqual(self.s.strongPasswordChecker("B3"+"a"*8), 2)
        self.assertEqual(self.s.strongPasswordChecker("B3"+"a"*9), 3)

    def test_rep_multi(self):
        self.assertEqual(self.s.strongPasswordChecker("B"+"a"*6+"3"+"a"*9), 5)

    def test_rep_no_low(self):
        self.assertEqual(self.s.strongPasswordChecker("B3"+"A"*4), 1)

    def test_rep_no_low_up_dig(self):
        self.assertEqual(self.s.strongPasswordChecker("#!"+"#"*4), 3)

    def test_long_rep(self):
        self.assertEqual(self.s.strongPasswordChecker("B2"+"a"*19), 7)
        self.assertEqual(self.s.strongPasswordChecker("B2"+"a"*9+"3"+"a"*9), 6)
        self.assertEqual(self.s.strongPasswordChecker("B"+"a"*10+"3"+"a"*9), 6)
        self.assertEqual(self.s.strongPasswordChecker("a"*10+"3"+"B"*10), 7)

    def test_long_rep_no_low(self):
        self.assertEqual(self.s.strongPasswordChecker("B2"+"C"*19), 7)
        self.assertEqual(self.s.strongPasswordChecker("B2"+"C"*29), 17)

    def test_long_rep_no_low_up_dig(self):
        self.assertEqual(self.s.strongPasswordChecker("!!"+"#"*19), 7)
        self.assertEqual(self.s.strongPasswordChecker("!!"+"#"*29), 17)

    def test_very_long(self):
        self.assertEqual(self.s.strongPasswordChecker("aB3"*10000), 29980)
        self.assertEqual(self.s.strongPasswordChecker("abc"*10000), 29982)

    def test_very_long_rep(self):
        self.assertEqual(self.s.strongPasswordChecker("zzzx"*10000), 39982)
        self.assertEqual(self.s.strongPasswordChecker("zzz"*100+"abcdefghijklmnopqrstuvwxyZ1"*1000), 27280)
        self.assertEqual(self.s.strongPasswordChecker(("z"*9+"x")*10000), 99982)

    def test_short_rep(self):
        self.assertEqual(self.s.strongPasswordChecker("B3"+"a"*3), 1)
        self.assertEqual(self.s.strongPasswordChecker("a"*5), 2)

    def test_short_rep_no_low_up_dig(self):
        self.assertEqual(self.s.strongPasswordChecker("#"*3), 3)
        self.assertEqual(self.s.strongPasswordChecker("#"*5), 3)

class Solution:

    def _get_errors(self, s: str):
        srt = int(len(s) < 6)
        lng = int(len(s) > 20)
        low,up,dig = 0,0,0
        rep = 0
        prev = ""
        count = 1
        for i in range(len(s)):
            c = s[i]
            if not low and c.isalpha() and not c.isupper():
                low = 1
            elif not up and c.isalpha() and c.isupper():
                up = 1
            elif not dig and c.isdigit():
                dig = 1
            if rep:
                continue
            if c == prev:
                count += 1
                if count >= 3:
                    rep = 1
            else:
                count = 1
            prev = c
        if not (srt or lng or rep or not low or not up or not dig):
            return None
        return (srt, lng, not low, not up, not dig, rep)

    def _helper(self, s: str, cache: dict) -> int:
        if s in cache:
            return cache[s]
        s_err = self._get_errors(s)
        if not s_err:
            cache[s] = 0
            return 0
        srt,lng,low,up,dig,rep = s_err
        if not (srt or lng or rep):
            changes = low + up + dig
            cache[s] = changes
            return changes
        if not rep:
            changes = 0
            if srt:
                changes = max(6 - len(s), low+up+dig)
            elif lng:
                changes = len(s) - 20 + low+up+dig
            cache[s] = changes
            return changes
        # Find and store all repetitions
        prev = ""
        counts = []
        count_inds = []
        for i in range(len(s)):
            c = s[i]
            if c == prev:
                counts[-1] += 1
            else:
                counts.append(1)
                count_inds.append(i)
            prev = c
        # If we have repetitions AND a long error, we target repetitions and remove characters
        if lng:
            removals = [0]*len(counts)
            max_changes = len(s) - 20
            fixed_inds = [i for i in range(len(counts))]
            # Greedily remove from repetitions of length %3==0 or %3==1
            for m in range(2):
                if max_changes == 0:
                    break
                for i in range(len(counts)-1, -1, -1):
                    if max_changes == 0:
                        break
                    r = counts[i]
                    if r < 3:
                        del counts[i]
                        del fixed_inds[i]
                        continue
                    if r % 3 != m:
                        continue
                    # * stay at or above 20 chars
                    # * only remove enough to bump this repetition down to the next lower "number-of-changes" bracket
                    to_remove = min(max_changes, m+1)
                    removals[fixed_inds[i]] += to_remove
                    counts[i] -= to_remove
                    max_changes -= to_remove
            # All remaining repetitions now have length%3 == 2
            for i in range(len(counts)):
                if max_changes == 0:
                    break
                r = counts[i]
                to_remove = min(max_changes, r-2)
                removals[fixed_inds[i]] += to_remove
                max_changes -= to_remove
            changes = 0
            for i in range(len(removals)-1, -1, -1):
                to_remove = removals[i]
                ind = count_inds[i]
                s = s[:ind]+s[ind+to_remove:]
                changes += to_remove
            changes += self._helper(s, cache)
            cache[s] = changes
            return changes
        # If we have only repetitions, we compute the number of changes required
        # (short with repetitions is incidentally handled here - walk through the possible short-rep cases to see why)
        changes = max(sum([c//3 for c in counts]), low+up+dig)
        cache[s] = changes
        return changes

    def strongPasswordChecker(self, s: str) -> int:
        cache = {}
        return self._helper(s, cache)

if __name__ == "__main__":
    unittest.main()
