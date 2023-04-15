from langchain.chains import LLMChain
from langchain.chains.base import Chain
from utilities.wolfram_helpers import execute_wolfram_query

from typing import Dict, List


class CompositeChain(Chain):
    chain_1: LLMChain  # this is the chain that parses the mathway output
    # chain_2: LLMChain  # get the concise question from chain_2
    # chain_3: LLMChain  # this is the chain that combines chan_1 with wolfram output

    @property
    def input_keys(self) -> List[str]:
        # Union of the input keys of the two chains.
        all_input_vars = set(self.chain_1.input_keys).union(
            set(self.chain_2.input_keys))
        return list(all_input_vars)

    @property
    def output_keys(self) -> List[str]:
        return ['concat_output']

    def _call(self, inputs: Dict[str, str]) -> Dict[str, str]:
        output_1 = self.chain_1.run(inputs)
        # output_2 = self.chain_2.run(inputs)
        output_wolfram = execute_wolfram_query(
            "What is the derivative of x^2?")
        # output_3 = self.chain_3.run({**inputs, "wolfram": output_wolfram})
        return output_1, output_wolfram
