from typing import Optional, Set, Dict

import os
import json
import subprocess

# Python implementation of an allen interval
class Interval:
    def __init__(self, name: str, relations: Dict[str, str]):
        self.name = name
        self.relations = relations

class AllenNetwork:
    def __init__(self, intervals: Optional[Set[str]]):
        self.intervals = {}

        if intervals is not None:
            for interval in intervals:
                self.intervals[interval] = Interval(interval, {})

    # Create an empty interval with no constraints between it and any other interval (requires update)
    def add_interval(self, interval: Interval) -> None:
        self.intervals[interval.name] = interval

    # Remove an interval from the network (requires update)
    def remove_interval(self, interval: Interval) -> None:
        self.intervals.remove(interval)

    # Convert the network to a json string
    def to_json(self) -> str:
        data = {}
        data["intervals"] = list(self.intervals.keys())
        data["relations"] = []

        for interval in self.intervals:
            for other in self.intervals[interval].relations:
                data["relations"].append({
                    "from": interval,
                    "to": other,
                    "rels": self.intervals[interval].relations[other]
                })

        return json.dumps(data)

    # Load the network from a json string
    def from_json(self, data: str) -> None:
        data = json.loads(data)

        for interval in data["intervals"]:
            self.intervals[interval] = Interval(interval, {})

        for relation in data["relations"]:
            self.intervals[relation["from"]].relations[relation["to"]] = relation["rels"]
    
    # Specify the exact relations between two intervals (requires update)
    def override_relation(self, first: str, second: str, rels: str) -> None:
        self.intervals[first].relations[second] = rels

    # Using allen.js, update the allen network to have all the 
    # appropriate intervals between all the intervals
    def update(self) -> None:
        with open("__allen_temp_input.json", 'w') as f:
            f.write(self.to_json())

        subprocess.run(["node", "allen.js", "file", "__allen_temp_input.json", "__allen_temp_output.json"])

        with open("__allen_temp_output.json", 'r') as f:
            self.from_json(f.read())

        # remove json files 
        os.remove("__allen_temp_input.json")
        os.remove("__allen_temp_output.json")

if __name__ == '__main__':
    print("Testing AllenNetwork.py...")

    network = AllenNetwork({"A", "B"})
    network.override_relation("A", "B", "p")

    print("Initial network:")
    print(network.to_json())

    network.update()

    print("Updated network:")
    print(network.to_json())
