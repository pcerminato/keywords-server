import type { Lists } from "../types.js";

/* Makes a map which has the original word as the key and as the value as the list of enhanced words. */
export function makePartitionList(original: Lists, enhanced: Lists) {
  return {
    lists: {
      accepted: toJson(original.accepted, enhanced.accepted),
      denied: toJson(original.denied, enhanced.denied),
    },
  };
}

function toJson(originalList: string[], enhancedList: string[]) {
  return Object.fromEntries(makeMap(originalList, enhancedList).entries());
}

function makeMap(originalList: string[], enhancedList: string[]) {
  // init the map with all original words as key and empty arrays for values
  const map = new Map<string, string[]>(originalList.map((v) => [v, []]));
  let i = 0;
  let key = originalList[i] as string;

  // each original word precedes its enhancements,
  // here each enhanced word is set under its original.
  for (let j = 0; j < enhancedList.length; j++) {
    const enhancedWord = enhancedList[j] as string;
    if (map.has(enhancedWord)) {
      key = enhancedWord;
      // won't put the original repeated in the list.
      continue;
    }
    map.set(key, [...(map.get(key) || []), enhancedWord]);
  }
  return map;
}
