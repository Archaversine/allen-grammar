from __future__ import annotations

from collections import namedtuple

import herodotus_fast as hero

from relations import RELATION_STRS, RELATION_VERB_FORMS
from structured_event import StructuredEvent


# TODO: shorten name.
class StructuredRelationInstance:
    """Relation instance sentence broken down to relation and event components.
    """

    def __init__(self, relation: str, event1: StructuredEvent, event2: StructuredEvent):
        """Initializes a structured relation instance.

        The structured event verb forms are assumed to match the relation type
        of for proper natural language realization.

        Args:
            relation: The relation between the two events.
            event1: The first event.
            event2: The second event.
        """
        self.relation = relation
        self.event1 = event1
        self.event2 = event2

    def __str__(self):
        if self.relation == "precedes":
            return f"{self.event1} before {self.event2.person} started to {self.event2.vp}"
        elif self.relation == "preceded_by":
            return f"{self.event2} before {self.event1.person} started to {self.event1.vp}"
        elif self.relation == "meets":
            return f"{self.event1.person} stops {self.event1.vp} as {self.event2.person} starts to {self.event2.vp}"
        elif self.relation == "met_by":
            return f"{self.event2.person} stops {self.event2.vp} as {self.event1.person} starts to {self.event1.vp}"
        elif self.relation == "overlaps":
            # TODO: this looks wrong, double check
            return f"{self.event1.person} stops {self.event1.vp} as {self.event2.person} starts to {self.event2.vp}"
        elif self.relation == "overlapped_by":
            return f"{self.event2.person} stops {self.event2.vp} as {self.event1.person} starts to {self.event1.vp}"
        elif self.relation == "starts":
            return f"{self.event1.person} starts to {self.event1.vp} right as {self.event2.person} starts to {self.event2.vp}"
        elif self.relation == "started_by":
            return f"{self.event2.person} starts to {self.event2.vp} right as {self.event1.person} starts to {self.event1.vp}"
        elif self.relation == "finishes":
            return f"{self.event1.person} stops {self.event1.vp} when {self.event2.person} stops {self.event2.vp}"
        elif self.relation == "finished_by":
            return f"{self.event2.person} stops {self.event2.vp} when {self.event1.person} stops {self.event1.vp}"
        elif self.relation == "equals":
            return f"{self.event1} exactly when {self.event2}"
        elif self.relation == "during":
            return f"The time when {self.event1} is contained during the time when {self.event2}"
        elif self.relation == "contains":
            return f"The time when {self.event1} contains the time when {self.event2}"
        else:
            raise ValueError(f"Unknown relation: {self.relation}")

    def __repr__(self):
        return f"StructuredRelationInstance({self.relation}, {self.event1}, {self.event2}: {self.__str__()})"

    def generate(relation: str, person1: str, person2: str, tree: hero.GrammarTree) -> StructuredRelationInstance:
        """Generates a new structured relation instance with the given relation.

        Args:
            relation: The new relation for the new instance.
            person1: The person committing the first event.
            person2: The person committing the second event.
        """
        form1, form2 = RELATION_VERB_FORMS[relation]
        event1 = StructuredEvent.generate(person1, tree, form1)
        event2 = StructuredEvent.generate(person2, tree, form2)
        return StructuredRelationInstance(relation, event1, event2) 

    def __eq__(self, other):
        return self.relation == other.relation and \
            self.event1 == other.event1 and \
            self.event2 == other.event2

# TODO: make this a subclass of structuredrelationinstance so we can reuse
RewordedRelationInstance = namedtuple(
    "RewordedRelationInstance",
    ["structured_relation", "reworded"],
)
