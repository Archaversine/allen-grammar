from __future__ import annotations

import herodotus_fast as hero

class StructuredEvent:
    """A structured event is an event broken down into its components.

    The components of an event are the person committing the event and a
    representation of the event that allows for varied generations as
    necessary, whether that be an infinitive form, a gerund form, or etc.
    in order to naturall compose into the desired context.
    """

    def __init__(self, person: str, vp: str, form: str):
        """Initializes a structured event.

        Args:
            person: The person committing the event.
            vp: The event verb phrase being committed in present tense.
            form: The form of the verb phrase following pattern.en conjugation
                rule names
        """
        self.person = person
        self.vp = vp
        # Currently only used for informative purposes.
        # Later we may use this to convert the form if desired.
        self.form = form

    def __str__(self):
        return f"{self.person} {self.vp}"

    def generate(person: str, tree: hero.GrammarTree, form: str) -> StructuredEvent:
        """Generates a new structured event with the given form.

        Args:
            person: The person committing the event.
            tree: The grammar tree to use for generating the event verb phrase.
            form: The form of the verb phrase following pattern.en conjugation
                rule names.
        """
        vp = tree.generate_from_format(f"V|1{form}")
        return StructuredEvent(person, vp, form)

