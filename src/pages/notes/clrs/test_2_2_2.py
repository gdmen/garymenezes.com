# 2.2-2
import unittest

class TestSort(unittest.TestCase):

    def test_empty(self):
        self.assertEqual(sort([]), [])

    def test_single(self):
        self.assertEqual(sort([-1]), [-1])
        self.assertEqual(sort([0]), [0])
        self.assertEqual(sort([1]), [1])

    def test_many(self):
        self.assertEqual(sort([1,2,3,4,5]), [1,2,3,4,5])
        self.assertEqual(sort([2,5,3,1]), [1,2,3,5])
        self.assertEqual(sort([4,3,2,1]), [1,2,3,4])

def sort(A: list) -> list:
    for i in range(len(A)-1):
        small = i
        for j in range(i+1, len(A)):
            if A[j] < A[small]:
                small = j
        tmp = A[i]
        A[i] = A[small]
        A[small] = tmp
    return A

if __name__ == "__main__":
    unittest.main()
