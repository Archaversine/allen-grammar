from herodotus_fast import *

if __name__ == "__main__":
    pcfg_file = "../pcfg/brown-all-20240213-104843.pcfg"
    tree = parse_file(pcfg_file)
    #print(tree)
    print("Base")
    generation = tree.generate_tree_from_symbol("S")
    print(generation)

    print("Exp 2")
    generation = tree.generate_tree_from_symbol("S", exp=2)
    print(generation)

    print("Exp 10")
    generation = tree.generate_tree_from_symbol("S", exp=10)
    print(generation)
