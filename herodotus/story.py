from structured_relation import StructuredRelationInstance

import herodotus_fast as hero
import relations

from collections import namedtuple
from dotenv import load_dotenv
from typing import List, Tuple

import os
import openai
import random


RewordedRelationInstance = namedtuple(
    "RewordedRelationInstance",
    ["structured_relation", "reworded"],
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


def generate_allen_questions(story: List[dict]) -> List[Tuple[str,str]]:
    """Generates questions for the given story.

    The questions will be generated based on the Allen relations in the story
    and an Allen Interval Algebra implementation. The answers to the questions will
    be a set of Allen internal relations.

    Args:
        story: The story to generate questions for.
    """
    # 1. Convert story to format matching Allen Interval Algebra implementation
    # 2. Generate inferred relations
    # 3. Group into source questions.
    # 4. Generate questions for each inferred relation set for each event pair.
    # TODO: complete
    raise NotImplementedError("Not yet implemented.")


def relation_set_to_yn_questions(relation_set):
    """Generates yes/no questions with the answers based on the given set of true relations.

    Args:
        relation_set: The set of relations to generate questions for.

    Returns:
        A list of tuples where the first element is the question and the second
        element is the answer.
    """
    raise NotImplementedError("Not yet implemented.")


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
        # TODO: add after implementing question generation.

