from __future__ import annotations

import openai

from langchain_core.prompts import PromptTemplate

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
        # Lazy memoized evaluation of kind-of-event string.
        self._ke_str = None
        self._ke_template = PromptTemplate.from_template(
            """
            Please convert the following event into a atemporal generic event by changing only the main verb or auxiliary to the gerund (-ing) form but no copula (be / is / was). Do not include surrounding quotes. "{sentence}"
            """
        )

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

    def ke_str(self):
        """Generates the event as a kind of event."""
        # TODO: can we do this symbolically rather than relying on an LLM?
        if self._ke_str is not None:
            return self._ke_str

        prompt = self._ke_template.format(sentence=self.__str__()) 
        result = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": prompt},
            ],
        )
        self._ke_str = result['choices'][0]['message']['content']
        # Remove ending period if present.
        if self._ke_str[-1] == ".":
            self._ke_str = self._ke_str[:-1]

        return self._ke_str

    def __eq__(self, other):
        return self.person == other.person and self.vp == other.vp

    def __hash__(self):
        return hash((self.person, self.vp))

