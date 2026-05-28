import { makePartitionList } from "./makePartitionList.js";

describe("utils", () => {
  describe("makePartitionList()", () => {
    /* TODO: This test suite is not exaustive; it covers a general case
    just for the sake of using it for TDD. */
    test("Makes partitioned list from original and enhanced list", () => {
      const original = JSON.parse(
        '{"lists":{"accepted":["health","nutrition","meditation"],"denied":["diabetes","obesity","stress"]}}',
      );
      const enhanced = JSON.parse(
        '{"lists":{"accepted":["health","wellbeing","wellness","vitality","nutrition","nourishment","diet","balanced diet","eating habits","meditation","mindfulness","calmness","inner peace","relaxation"],"denied":["diabetes","high blood sugar","glucose levels","blood glucose","obesity","overweight","excess weight","weight gain","stress","anxiety","tension","pressure"]}}',
      );

      const expected = JSON.stringify({
        "lists": {
          "accepted": {
            "health": ["wellbeing", "wellness", "vitality"],
            "nutrition": [
              "nourishment",
              "diet",
              "balanced diet",
              "eating habits",
            ],
            "meditation": [
              "mindfulness",
              "calmness",
              "inner peace",
              "relaxation",
            ],
          },
          "denied": {
            "diabetes": ["high blood sugar", "glucose levels", "blood glucose"],
            "obesity": ["overweight", "excess weight", "weight gain"],
            "stress": ["anxiety", "tension", "pressure"],
          },
        },
      });

      const result = makePartitionList(
        original.lists,
        enhanced.lists,
      );

      expect(JSON.stringify(result)).toEqual(expected);
    });
  });
});
