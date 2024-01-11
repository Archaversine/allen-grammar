import os
import time

from herodotusInterpreter import *

"""Benchmark the speedup of unpickling trees vs building them from scratch.

Run from the herodotus directory with:
    python3 -m benchmark.pickling_benchmark
"""

BENCHMARK_TMP_DIR = ".benchmark_tmp"

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        time_taken = time.time() - start
        print("Time taken: ", time_taken)
        return result, time_taken
    return wrapper

if __name__ == "__main__":
    test_cfg_paths = [
        "test_cfgs/simple_sentence.cfg",
        "test_cfgs/scientific_notation.cfg",
        "../pcfg/brown-tiny-20231017-211551.cfg",
        "../pcfg/brown-tiny-20231017-211551.pcfg",
        "../pcfg/brown-a-20231212-134952.cfg",
        "../pcfg/brown-a-20231212-134952.pcfg",
    ]

    if not os.path.exists(BENCHMARK_TMP_DIR):
        os.mkdir(BENCHMARK_TMP_DIR)

    for cfg_path in test_cfg_paths:
        print("Testing: ", cfg_path)
        # Time building tree from path.
        print("Timing build_tree...")
        built_tree, time_taken = timer(build_tree)(cfg_path, silent=True)
        filename = os.path.basename(cfg_path)
        save_path = os.path.join(BENCHMARK_TMP_DIR, "{}.pkl".format(filename))
        save_tree(built_tree, save_path, silent=True)

        # Time loading tree from saved path.
        print("Timing load_tree...")
        loaded_tree, time_taken = timer(load_tree)(save_path, silent=True)

        print("Done testing: ", cfg_path)
        print()

    # Clean up.
    # Delete benchmark tmp dir and all files in it.
    for file in os.listdir(BENCHMARK_TMP_DIR):
        os.remove(os.path.join(BENCHMARK_TMP_DIR, file))
    os.rmdir(BENCHMARK_TMP_DIR)

