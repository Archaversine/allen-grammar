from cfg import CFG

cfgstr = open('tests/test.cfg', 'r').read()
cfg = CFG.from_string(cfgstr)

# Should be S
root = cfg.root()
assert root == "S"

# Should be {S, A, B}
nts = cfg.nonterminals()
for nt in ["S", "A", "B"]:
    assert nt in nts
assert len(nts) == 3

# Should be {Hi, Dog, Man}
ts = cfg.terminals()
for t in ["Hi", "Dog", "Man"]:
    assert t in ts, "t: {}, ts: {}".format(t, ts)
assert len(ts) == 3

print("All test asserts passed!")

rules = cfg.rules()

