from pathlib import Path
from collections import Counter
import json

root = Path(__file__).resolve().parent.parent
dataDir = root / "data"

with open (dataDir / "records.json", encoding="utf-8") as f:
    allRecords = json.load(f)

progressRecords = [r for r in allRecords if r["progress"] < 100]

totalCounts = Counter(r["position"] for r in allRecords)
progressCounts = Counter(r["position"] for r in progressRecords)
names = {r["position"]: r["demon"] for r in allRecords}

for pos in sorted(totalCounts):
    print(f"{pos} | {names[pos]} | {progressCounts[pos]} / {totalCounts[pos]}")

print(f"{len(progressRecords)} / {len(allRecords)} are progress records")

with open(dataDir / "progress_records.json", "w", encoding="utf-8") as f:
    json.dump(progressRecords, f, indent=2, ensure_ascii=False)