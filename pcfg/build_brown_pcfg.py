"""
Builds a PCFG of the brown corpus.
"""

import os
import pdb
import sys

from collections import Counter
from datetime import datetime
from nltk.tree import Tree
from nltk.corpus.reader.util import read_sexpr_block

class ExceptionHook:
    instance = None
    def __call__(self, *args, **kwargs):
        if self.instance is None:
            from IPython.core import ultratb
            self.instance = ultratb.FormattedTB(mode="Plain", color_scheme="Linux", call_pdb=1)
        return self.instance(*args, **kwargs)

sys.excepthook = ExceptionHook()


BROWN_FILEPATH = "../../corpora/brown-corpus-a"
OUTPUT_BASE = "brown-a"
COMMENT_STR = "*x*"
# For now, just remove... later actually process properly.
REMOVE_STRS = [
    "|",
    "[",
    "]",
    "`",
    "\\",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "\x00",
]


# For each file in brown corpus
# - read file
# - read in each s-expression as a tree
# - count transition statistics
# - build pcfg from transition statistics

def read_brown_file_sexprs(filepath):
    fstream = open(filepath, 'r')
    sexprs = []
    sexpr_block = read_sexpr_block(fstream, comment_char=COMMENT_STR)
    while len(sexpr_block) > 0:
        sexprs.extend(sexpr_block)
        sexpr_block = read_sexpr_block(fstream, comment_char=COMMENT_STR)
    return sexprs


def trees_from_file(filepath):
    sexprs = read_brown_file_sexprs(filepath)
    # Filter ( END_OF_TEXT_UNIT )
    sexprs = [se for se in sexprs if se != "( END_OF_TEXT_UNIT )"]
    trees = [Tree.fromstring(sexpr) for sexpr in sexprs]
    return trees


def add_production_counts(counter_map, filepath):
    """
    Given a file of s-expression trees from the brown corpus counts productions.

    These counts are added to counter_map, a multi-level dictionary:
        nonterminal -> production rule -> count

    This multi-level dictionary uses Counter() as the intermediate step.
    """
    trees = trees_from_file(filepath)
    for tree in trees:
        for prod in tree.productions():
            if prod.lhs() not in counter_map:
                counter_map[prod.lhs()] = Counter()
            counter_map[prod.lhs()][prod] += 1

def nonterminal_production_str(nonterminal, rules):
    """Nonterminal complete production rule.
    """
    nonterminal_symbol = nonterminal.symbol()
    for remstr in REMOVE_STRS:
        nonterminal_symbol = nonterminal_symbol.replace(remstr, "")

    rule_strs = []
    for r in rules:
        all_res = []
        for gen in r.rhs():
            raw_res = gen
            if type(gen) != str:
                raw_res = gen.symbol()
            res = raw_res
            for remstr in REMOVE_STRS:
                res = res.replace(remstr, "")
            if res == '':
                continue
            if type(gen) == str:
                res = '"' + res + '"'
            all_res.append(res)
        if len(all_res) > 0:
            rule_strs.append(' '.join(all_res))
    if len(rule_strs) > 0:
        joined_rule_str = ' | '.join(list(set(rule_strs)))
        if joined_rule_str == '':
            return ""
        return "{} -> {}".format(nonterminal_symbol, joined_rule_str)
    else:
        return ""


def nonterminal_pcfg_str(nonterminal, rule_probs):
    # TODO(GENE): renormalize after filtering, probabilities won't sum to 1 now
    # b/c we compute probabilities before filtering production rules.
    nonterminal_symbol = nonterminal.symbol()
    for remstr in REMOVE_STRS:
        nonterminal_symbol = nonterminal_symbol.replace(remstr, "")

    rule_strs = []
    for r, prob in rule_probs.items():
        all_res = []
        for gen in r.rhs():
            raw_res = gen
            if type(gen) != str:
                raw_res = gen.symbol()
            res = raw_res
            for remstr in REMOVE_STRS:
                res = res.replace(remstr, "")
            if res == '':
                continue
            if type(gen) == str:
                res = '"' + res + '"'
            all_res.append(res)
        if len(all_res) > 0:
            rule_strs.append('{} '.format(prob) + ' '.join(all_res))
    if len(rule_strs) > 0:
        joined_rule_str = ' | '.join(list(set(rule_strs)))
        if joined_rule_str == '':
            return ""
        return "{} -> {}".format(nonterminal_symbol, joined_rule_str)
    else:
        return ""


def cfg_str(prod_counts):
    """Given a nonterminal -> production rule -> count dictionary, return a CFG string.
    """
    rule_strs = []
    for nt, rule_counts in prod_counts.items():
        # For now, ignore empty symbol (later we can insert dummy here)
        if nt.symbol() != '':
            rule_strs.append(nonterminal_production_str(nt, rule_counts.keys()))
    return '\n'.join([rs for rs in rule_strs if rs != ''])


def pcfg_str(prod_probs):
    rule_strs = []
    for nt, rule_probs in prod_probs.items():
        # For now, ignore empty symbol (later we can insert dummy here)
        if nt.symbol() != '':
            rule_strs.append(nonterminal_pcfg_str(nt, rule_probs))
    return '\n'.join([rs for rs in rule_strs if rs != ''])


prod_counts = {}
for f in os.listdir(BROWN_FILEPATH):
    print("File ", f)
    print("Counting productions...")
    # Count up productions.
    fp = os.path.join(BROWN_FILEPATH, f)
    if os.path.isfile(fp):
        print("traversing file: ", fp)
        add_production_counts(prod_counts, fp)

print("Computing production probabilities...")
# Compute production conditional probabilities.
# For each nonterminal, sum up production counts, and normalize production
# probabilities.
prod_probs = {}
for nt, rule_counts in prod_counts.items():
    nt_total = sum(count for _, count in rule_counts.items())
    prod_probs[nt] = {
        rule: count/nt_total
        for rule, count
        in rule_counts.items()
    }

print("Writing CFG...")
# Write CFG.
timestamp = datetime.now().strftime('%Y%m%d-%H%M%S')
with open(OUTPUT_BASE + '-{}.cfg'.format(timestamp), 'w') as cfg_f:
    cfg_f.write(cfg_str(prod_counts))

print("Writing PCFG...")
# Write PCFG
with open(OUTPUT_BASE + '-{}.pcfg'.format(timestamp), 'w') as pcfg_f:
    pcfg_f.write(pcfg_str(prod_probs))

print("Done!")

