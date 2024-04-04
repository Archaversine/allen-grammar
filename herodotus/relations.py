import herodotus_fast as hero

# Given two names, return a sentence where the first name commits an action 
# that precedes the action committed by the second name.
def precedes(tree: hero.GrammarTree, name1: str, name2: str) -> str:
    return tree.generate_from_format(f"'{name1} V|1#3sgp 'before '{name2} 'started 'to V|2#inf")

def preceded_by(tree: hero.GrammarTree, name1: str, name2: str) -> str:
    return precedes(tree, name2, name1)

# Given two names, return a sentence where the first name commits an action 
# that meets the action committed by the second name.
def meets(tree: hero.GrammarTree, name1: str, name2: str) -> str:
    return tree.generate_from_format(f"'{name1} 'stops V|1#part 'as '{name2} 'starts 'to V|2#inf")

def met_by(tree: hero.GrammarTree, name1: str, name2: str) -> str:
    return meets(tree, name2, name1)

def overlaps(tree: hero.GrammarTree, name1: str, name2: str) -> str:
    return tree.generate_from_format(f"'{name1} 'stops V|1#part 'as '{name2} 'starts 'to V|2#inf")

def overlapped_by(tree: hero.GrammarTree, name1: str, name2: str) -> str: 
    return overlaps(tree, name2, name1)

def starts(tree: hero.GrammarTree, name: str, name2: str) -> str:
    return tree.generate_from_format(f"'{name} 'starts 'to V|1#inf 'right 'as '{name2} 'starts 'to V|2#inf")

def started_by(tree: hero.GrammarTree, name1: str, name2: str) -> str:
    return starts(tree, name2, name1)

def finishes(tree: hero.GrammarTree, name1: str, name2: str) -> str:
    return tree.generate_from_format(f"'{name1} 'stops 'V|1#part 'when '{name2} 'stops V|2#part")

def finished_by(tree: hero.GrammarTree, name1: str, name2: str) -> str:
    return finishes(tree, name2, name1)

def equals(tree: hero.GrammarTree, name1: str, name2: str) -> str:
    return tree.generate_from_format(f"'{name1} 'V|1#part 'exactly 'when '{name2} V|2#part")

if __name__ == '__main__':
    hero.init_conjugation()
    tree = hero.parse_file('verb-test.cfg')

    for _ in range(5):
        print(precedes(tree, 'Bob', 'Alice'))

    print('-' * 20)

    for _ in range(5): 
        print(meets(tree, 'Bob', 'Alice'))
