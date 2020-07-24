from typing import List
import unittest

class Test(unittest.TestCase):

    def setUp(self):
        pass

    def test_example_1(self):
        sq = SubrectangleQueries([[1,2,1],[4,3,4],[3,2,1],[1,1,1]])
        self.assertEqual(sq.getValue(0, 2), 1)
        sq.updateSubrectangle(0, 0, 3, 2, 5)
        self.assertEqual(sq.getValue(0, 2), 5)
        self.assertEqual(sq.getValue(3, 1), 5)
        sq.updateSubrectangle(3, 0, 3, 2, 10)
        self.assertEqual(sq.getValue(3, 1), 10)
        self.assertEqual(sq.getValue(0, 2), 5)

    def test_example_2(self):
        sq = SubrectangleQueries([[1,1,1],[2,2,2],[3,3,3]]);
        self.assertEqual(sq.getValue(0, 0), 1)
        sq.updateSubrectangle(0, 0, 2, 2, 100);
        self.assertEqual(sq.getValue(0, 0), 100)
        self.assertEqual(sq.getValue(2, 2), 100)
        sq.updateSubrectangle(1, 1, 2, 2, 20);
        self.assertEqual(sq.getValue(2, 2), 20)

    def test_empty(self):
        sq = SubrectangleQueries([])

# Your SubrectangleQueries object will be instantiated and called as such:
# obj = SubrectangleQueries(rectangle)
# obj.updateSubrectangle(row1,col1,row2,col2,newValue)
# param_2 = obj.getValue(row,col)
class SubrectangleQueries:

    def __init__(self, rectangle: List[List[int]]):
        self.rec = rectangle

    def updateSubrectangle(self, row1: int, col1: int, row2: int, col2: int, newValue: int) -> None:
        for r in range(row1, row2+1):
            for c in range(col1, col2+1):
                self.rec[r][c] = newValue

    def getValue(self, row: int, col: int) -> int:
        return self.rec[row][col]

if __name__ == "__main__":
    unittest.main()
