from pathlib import Path
import requests
import json
import time

pointercrateURL = "https://pointercrate.com/api/v2/demons"
response = requests.get(f"{pointercrateURL}/listed/", params={"limit": 100, "after": 0}) 
response2 = requests.get(f"{pointercrateURL}/listed/", params={"limit": 50, "after": 100})

response.raise_for_status() 
demons = response.json()

response2.raise_for_status()
demons.extend(response2.json()) 

# print(response.json()) test

ids = [d["id"] for d in demons]

# print(ids) test
records = []

for i in range(len(ids)):
    levelData = requests.get(f"{pointercrateURL}/{ids[i]}").json()["data"]
    for r in levelData["records"]:
        records.append({
            "demon_id": levelData["id"],
            "demon": levelData["name"],
            "position": levelData["position"],
            "requirement": levelData["requirement"],
            "player": r["player"]["name"],
            "progress": r["progress"],
        })
    print(f'{levelData["position"]} | {levelData["name"]}: {len(levelData["records"])} records')
    time.sleep(0.25) #prevents rate limiting (hopefully)

root = Path(__file__).resolve().parent.parent
dir = root / "data"
dir.mkdir(exist_ok=True)

with open(dir/"records.json", "w", encoding="utf-8") as f:
    json.dump(records, f, indent=2, ensure_ascii=False)

#Export every level regardless of whether it has progress records or not

levels = [{"id": d["id"], "name": d["name"], "position": d["position"], "requirement": d["requirement"]} for d in demons ]

with open(dir/ "levels.json", "w", encoding="utf-8") as f:
    json.dump(levels,f, indent=2, ensure_ascii=False)