"""
Python interface for the Idris2 Allen Interval Algebra library.

This library uses json files to store the input and output Allen relations.

Each file is of the following format:

{
    "interavls": ["<interval1>", "<interval2>", ...],
    "relations": [
        {
            "from": "<interval_from>",
            "to": "<interval_to>",
            "rels": "<relation string>"
        },
        ...
    ]
}
"""

import json
import os
import subprocess

from tempfile import mkstemp
from typing import Any, Dict, List, Tuple

from relations import RELATION_TO_SHORT, RELATION_FROM_SHORT
from structured_event import StructuredEvent
from structured_relation import (
    StructuredRelationInstance,
    RewordedRelationInstance,
)


# TODO: make type of story List[StructuredRelationInstance] after making RewordedRelationInstance a subclass of StructuredRelationInstance
def story_to_i2a(story: List[RewordedRelationInstance]) -> Tuple[Dict[str, Any], Dict[StructuredEvent, str]]:
    """
    Convert a story to the Idris2 Allen Interval Algebra format.

    Args:
        story: The story.

    Returns:
        A tuple of the Idris2 Allen Interval Algebra format and the interval
        map to interpret the new format.
    """

    unique_intervals = []
    relations = []

    # 1. Find all unique events and store as intervals.
    for instance in story:
        structured = instance.structured_relation
        if structured.event1 not in unique_intervals:
            unique_intervals.append(structured.event1)
        if structured.event2 not in unique_intervals:
            unique_intervals.append(structured.event2)
    # Names for intervals.
    # TODO: make this more descriptive (but challenging to ensure uniqueness at the same time) -- maybe main verb + index for non-equal cases?
    interval_map = {
        interval: str(iid)
        for iid, interval
        in enumerate(unique_intervals)
    }

    # 2. Store structured relations as Allen relations.
    for instance in story:
        structured = instance.structured_relation
        relations.append({
            "from": interval_map[structured.event1],
            "to": interval_map[structured.event2],
            "rels": RELATION_TO_SHORT[structured.relation]
        })
    
    # Format and return.
    i2a = {
        "intervals": list(interval_map.values()),
        "relations": relations
    }
    return i2a, interval_map

def i2a_to_structured(i2a: Dict[str, Any], interval_map: Dict[StructuredEvent, str]) -> List[StructuredRelationInstance]:
    """Load Idris2 Allen Interval Algebra output into internal data structures.
    """
    reverse_map = { v: k for k, v in interval_map.items() }
    structured = []
    for relation in i2a["relations"]:
        for rel in relation["rels"]:
            structured.append(StructuredRelationInstance(
                RELATION_FROM_SHORT[rel],
                reverse_map[relation["from"]],
                reverse_map[relation["to"]]
            ))
    return structured


def run_idris2_allen(story: List[RewordedRelationInstance]) -> List[StructuredRelationInstance]:
    """Run the Idris2 Allen Interval Algebra library.

    Args:
        story: The story to infer Allen relations for.

    Returns:
        A list of structured relation instances corresponding to the inferred
        Allen relations.
    """

    infd, inpath = mkstemp()
    _, outpath = mkstemp()

    i2a_story, event2id_map = story_to_i2a(story)
    
    print("Story in Idris2 Allen Interval Algebra format:") 
    print(i2a_story)

    # Write input story to the input file.
    with os.fdopen(infd, "w") as f:
        f.write(json.dumps(i2a_story))
    # Remove output file, just used mkstemp to get a unique name.
    os.remove(outpath)

    print("Running Allen Interval Algebra library...")
    print("Input file:", inpath)
    print("Output file:", outpath)
    # Run the Idris2 Allen Interval Algebra library
    subprocess.run(["node", "./../idris2_allen/allen.js", "file", inpath, outpath])

    # Read in results.
    with open(outpath, "r") as f:
        results = json.load(f)
        print("")
        print("Raw results:")
        print(results)
        structured = i2a_to_structured(results, event2id_map)
        print("")
        print("Structured results:")
        print(structured)

    # Cleanup
    os.remove(inpath)
    os.remove(outpath)
    
    return structured

def construct_relation_lookup(relations: List[StructuredRelationInstance]) -> Dict[str, Dict[str, List[str]]]:
    """
    Construct a lookup from event1 to event2 to a list of relation strings.

    Args:
        relations: The structured relation instances.

    Returns:
        A lookup from event to event to a list of full relation strings.
    """

    lookup = {}
    for instance in relations:
        if instance.event1 not in lookup:
            lookup[instance.event1] = {}
        if instance.event2 not in lookup[instance.event1]:
            lookup[instance.event1][instance.event2] = []

        if instance.relation not in lookup[instance.event1][instance.event2]:
            lookup[instance.event1][instance.event2].append(instance.relation)

    return lookup

