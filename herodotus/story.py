import os
import openai
import random

from dotenv import load_dotenv
from typing import List, Tuple

import herodotus_fast as hero
import relations

from idris2_allen import run_idris2_allen, construct_relation_lookup
from relations import RELATION_STRS
from structured_relation import (
    StructuredRelationInstance,
    RewordedRelationInstance,
)


def generate_story_sentence(relation_str, p1, p2, tree):
    """Generates a sentence for a story.

    A sentence is generated based on the given relation function, the two
    people. The generated sentence will be in the form of a
    RewordedRelationInstance.

    Args:
        relation_str: The Allen relation string between the two people.
        p1: The first person in the sentence.
        p2: The second person in the sentence.
        tree: The grammar tree to use for generating the sentence.
    """
    generated = StructuredRelationInstance.generate(relation_str, p1, p2, tree)
    reworded = relations.reword(generated)
    return RewordedRelationInstance(generated, reworded)


def generate_story(n_sentences: int, tree: hero.GrammarTree):
    """Generates a story of n_sentences sentences.

    Each sentence will represent a single Allen relation which is randomly selected.
    This story will only contain two people which are also randomly selected. The
    events are generated using the given grammar tree.

    Each sentence in the story will be represented as a tuple of the raw
    sentence, the relation, the two events, and the two seeded people.
    The repeated people are used to ensure that this can be easily generalized
    to more than two people. All of this will be represented as a
    RewordedRelationInstance. This namedtuple will contain the hierarchical
    structure to interface with the Allen Interval Algebra implementation
    and subsequent questions.

    Args:
        n_sentences: The number of sentences to generate.
        tree: The grammar tree to use for generating events.
    """
    # TODO: generate people from larger list
    people = ["Alice", "Bob"]

    story = []
    for i in range(n_sentences):
        # TODO: should this be randomized?
        p1 = people[0]
        p2 = people[1]
        relation = random.choice(relations.RELATION_STRS)
        story_sentence = generate_story_sentence(relation, p1, p2, tree)
        story.append(story_sentence)
    return story


def lookup_table_to_yn_questions(relation_lookup) -> List[Tuple[str,str]]:
    """Generates yes/no questions with the answers based on a relation lookup table.

    Args:
        relation_lookup: A lookup table for each event pair and the inferred relations of the form
            StructuredEvent -> StructuredEvent -> List[str]

    Returns:
        A list of tuples where the first element is the question, the second
        element is the answer, the third element is a tuple of the two
        structured events.
    """
    # TODO: structure code to track the source events for the question
    qa_tuples = []
    for event1, e1_lookup in relation_lookup.items():
        e1_reference = event1.ke_str()
        for event2, relations in e1_lookup.items():
            e2_reference = event2.ke_str()
            # Generate questions for each relation.
            for relation in RELATION_STRS:
                # Generate question based on relation.
                question = f'Do the events {e1_reference} and {e2_reference} have the relation {relation}?'
                answer = "yes" if relation in relations else "no"
                qa_tuples.append((question, answer, (event1, event2)))
    return qa_tuples


def generate_allen_questions(story: List[RewordedRelationInstance]) -> List[Tuple[str,str]]:
    """Generates questions for the given story.

    The questions will be generated based on the Allen relations in the story
    and an Allen Interval Algebra implementation. The answers to the questions will
    be a set of Allen internal relations.

    Args:
        story: The story to generate questions for.
    """
    # 1. Generate inferred relations from allen interval algebra implementation.
    inferred_relations = run_idris2_allen(story)
    # 2. Construct lookup table for each event-pair.
    relation_lookup = construct_relation_lookup(inferred_relations)
    print("Relation lookup table")
    print(relation_lookup)
    # 3. Generate questions for each inferred relation set for each event pair.
    qa_tuples = lookup_table_to_yn_questions(relation_lookup)
    print("qa_tuples")
    for q, a, events in qa_tuples:
        print(q, a, events)
    return qa_tuples


if __name__ == '__main__':
    load_dotenv()
    openai.api_key = os.getenv("OPENAI_API_KEY")
    hero.init_conjugation()
    tree = hero.parse_file("verb-test.cfg")

    # Generate some stories, check that they look reasonable.
    for length in range(1, 6):
        print(f"Generating story of length {length}")
        story = generate_story(length, tree)
        print(story)

        # Generate some questions, check that they look reasonable.
        print("Generating questions...")
        questions = generate_allen_questions(story)
        # TODO: add after implementing question generation.

