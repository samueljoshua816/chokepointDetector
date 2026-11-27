from pathlib import Path
from collections import Counter
import json

#like done in recordAccess.py, we need a way to put the data outside of this folder
root = Path(__file__).resolve().parent.parent
dataDir = root / "data"

with open (dataDir / "records.json", encoding="utf-8") as f:
    allRecords = json.load(f)

#only take records that arent completion records
progressRecords = [r for r in allRecords if r["progress"] < 100]

"""
purely done for metrics
helpful for determining which levels either:
1) Were directly placed in the extended list (76 - 150) and thus are gauranteed to not have progress records
2) Were on the main list but everyone with progress beat the level ex. Dark Decks

if they have 0 records
"""

totalCounts = Counter(r["position"] for r in allRecords)
progressCounts = Counter(r["position"] for r in progressRecords)
names = {r["position"]: r["demon"] for r in allRecords}

for pos in sorted(totalCounts):
    print(f"{pos} | {names[pos]} | {progressCounts[pos]} / {totalCounts[pos]}")

print(f"{len(progressRecords)} / {len(allRecords)} are progress records")

#send to data
with open(dataDir / "progress_records.json", "w", encoding="utf-8") as f:
    json.dump(progressRecords, f, indent=2, ensure_ascii=False)