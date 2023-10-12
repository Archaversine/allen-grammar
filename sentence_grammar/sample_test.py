from cfg import CFG
cfgstr = open('tests/simple_sentence.cfg', 'r').read()
cfg = CFG.from_string(cfgstr)
sample = cfg.sample_sentence()
print('sample sentence:')
print(sample)
