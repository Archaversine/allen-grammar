
# Relations for 'pmoFDseSdfOMP' for allen's interval algebra
# Function translates into a coherent english sentence
def rel_to_words(a: str, r: str, b: str) -> str:
    if r == 'p':
        return f"{a} before {b}"
    if r == 'm': 
        return f"{a} until {b}"
    if r == 'o': 
        return f"{a} when {b}"
    if r == 'F': 
        return f"{a} up until {b}"
    if r == 'D': 
        return f"{b} only when {a}"
    if r == 's': 
        return f"{a} as {b}"
    if r == 'e': 
        return f"{a} exactly when {b}"
    if r == 'S': 
        return f"{a} since {b}" 
    if r == 'd': 
        return f"{a} during when {b}"
    if r == 'O': 
        return f"{b} around when {a}"
    if r == 'M': 
        return f"{b} until {a}"
    if r == 'P': 
        return f"{a} after {b}"
    
    # If all else fails
    return f"{a}. {b}"
