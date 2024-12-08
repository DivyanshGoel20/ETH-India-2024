import json
import os
import sys
import time
import farcaster_utils
import db

from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent

# Import CDP Agentkit Langchain Extension.
from cdp_langchain.agent_toolkits import CdpToolkit
from cdp_langchain.utils import CdpAgentkitWrapper
from cdp_langchain.tools import CdpTool
from pydantic import BaseModel, Field
from cdp import *

# Configure a file to persist the agent's CDP MPC Wallet Data.
wallet_data_file = "wallet_data.txt"

abi = [{
    "inputs": [{
        "internalType": "contract ISuperToken",
        "name": "token",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "sender",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
    }, {
        "internalType": "bytes",
        "name": "userData",
        "type": "bytes"
    }],
    "name":
    "deleteFlow",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability":
    "nonpayable",
    "type":
    "function"
}]

# Define custom action prompts and input schemas
START_STREAM_PROMPT = """
This tool will start a money stream to a specified token recipient using SuperFluid.
"""
END_STREAM_PROMPT = """
This tool will close an existing money stream to a token recipient using SuperFluid.
"""
END_INCOMING_STREAM_PROMPT = """
This tool will close an existing incoming money stream from a token sender using SuperFluid.
"""


class StartStreamInput(BaseModel):
    """Input argument schema for starting a stream."""
    recipient: str = Field(...,
                           description="The Ethereum address of the recipient")
    token_address: str = Field(
        ..., description="The address of the token to stream")
    flow_rate: int = Field(...,
                           description="The flow rate of tokens per second")


class EndStreamInput(BaseModel):
    """Input argument schema for ending a stream."""
    recipient: str = Field(...,
                           description="The Ethereum address of the recipient")
    token_address: str = Field(
        ..., description="The address of the token being streamed")


class EndIncomingStreamInput(BaseModel):
    """Input argument schema for ending a stream."""
    sender: str = Field(..., description="The Ethereum address of the sender")
    token_address: str = Field(
        ..., description="The address of the token being streamed")


def start_stream(wallet: Wallet, recipient: str, token_address: str,
                 flow_rate: int) -> str:
    """Start a money stream using SuperFluid.
    Args:
        wallet (Wallet): The wallet initiating the stream.
        recipient (str): Recipient's Ethereum address.
        token_address (str): Address of the token to stream.
        flow_rate (int): Rate of token flow per second.
    Returns:
        str: Confirmation of stream creation.
    """
    try:
        # Initialize SuperFluid SDK (this is a hypothetical implementation)
        sf = SuperfluidSDK(wallet)
        stream_result = sf.create_stream(sender=wallet.address,
                                         receiver=recipient,
                                         token_address=token_address,
                                         flow_rate=flow_rate)
        return f"Stream started successfully. Stream ID: {stream_result.stream_id}"
    except Exception as e:
        return f"Error starting stream: {str(e)}"


def end_stream(wallet: Wallet, recipient: str, token_address: str) -> str:
    """Close an existing money stream using SuperFluid.
    Args:
        wallet (Wallet): The wallet closing the stream.
        recipient (str): Recipient's Ethereum address.
        token_address (str): Address of the token being streamed.
    Returns:
        str: Confirmation of stream closure.
    """
    try:
        # Initialize SuperFluid SDK (this is a hypothetical implementation)
        sf = SuperfluidSDK(wallet)
        close_result = sf.close_stream(sender=wallet.address,
                                       receiver=recipient,
                                       token_address=token_address)
        return f"Stream closed successfully. Result: {close_result}"
    except Exception as e:
        return f"Error closing stream: {str(e)}"


def end_incoming_stream(wallet: Wallet, sender: str,
                        token_address: str) -> str:
    """Close an existing incoming money stream using SuperFluid.
    Args:
        wallet (Wallet): The wallet closing the stream.
        recipient (str): Sender's Ethereum address.
        token_address (str): Address of the token being streamed.
    Returns:
        str: Confirmation of stream closure.
    """
    try:
        invocation = wallet.invoke_contract(
            contract_address="0xcfA132E353cB4E398080B9700609bb008eceB125",
            abi=abi,
            method="deleteFlow",
            args={
                "token": token_address,
                "sender": sender,
                "receiver": wallet.default_address,
                "userData": "0x"
            })

        invocation.wait()

        return f"Stream closed successfully. Result: {invocation}"
    except Exception as e:
        return f"Error closing stream: {str(e)}"


def initialize_agent():
    """Initialize the agent with CDP Agentkit."""
    # Initialize LLM.
    llm = ChatOpenAI(model="gpt-4o-mini")

    wallet_data = None

    if os.path.exists(wallet_data_file):
        with open(wallet_data_file) as f:
            wallet_data = f.read()

    # Configure CDP Agentkit Langchain Extension.
    values = {}
    if wallet_data is not None:
        # If there is a persisted agentic wallet, load it and pass to the CDP Agentkit Wrapper.
        values = {"cdp_wallet_data": wallet_data}

    agentkit = CdpAgentkitWrapper(**values)

    # persist the agent's CDP MPC Wallet Data.
    wallet_data = agentkit.export_wallet()
    with open(wallet_data_file, "w") as f:
        f.write(wallet_data)

    # Initialize CDP Agentkit Toolkit and get tools.
    cdp_toolkit = CdpToolkit.from_cdp_agentkit_wrapper(agentkit)
    tools = cdp_toolkit.get_tools()

    # Define new tools for stream management
    # startStreamTool = CdpTool(
    #     name="start_stream",
    #     description=START_STREAM_PROMPT,
    #     cdp_agentkit_wrapper=agentkit,
    #     args_schema=StartStreamInput,
    #     func=start_stream,
    # )

    # endStreamTool = CdpTool(
    #     name="end_stream",
    #     description=END_STREAM_PROMPT,
    #     cdp_agentkit_wrapper=agentkit,
    #     args_schema=EndStreamInput,
    #     func=end_stream,
    # )

    endIncomingStreamTool = CdpTool(
        name="end_incoming_stream",
        description=END_INCOMING_STREAM_PROMPT,
        cdp_agentkit_wrapper=agentkit,
        args_schema=EndIncomingStreamInput,
        func=end_incoming_stream,
    )

    # Append the new tools
    tools.append(endIncomingStreamTool)

    # Store buffered conversation history in memory.
    memory = MemorySaver()
    config = {"configurable": {"thread_id": "CDP Agentkit Chatbot Example!"}}

    # Create ReAct Agent using the LLM and CDP Agentkit tools.
    return create_react_agent(
        llm,
        tools=tools,
        checkpointer=memory,
        state_modifier=
        "You are a masterful roaster, skilled in the art of insulting people smartly.",
    ), config


# Autonomous Mode
def run_autonomous_mode(agent_executor, config, interval=10):
    """Run the agent autonomously with specified intervals."""
    print("Starting autonomous mode...")
    while True:
        try:
            username = db.read_roast_data(1)['roastee'] or ''
            # Provide instructions autonomously
            user_casts = farcaster_utils.get_user_cast_data(username)
            cast_data = ", ".join(user_casts)
            thought = (
                "Take the following cast data and roast this person harshly in 250 characters. This is just for fun, don't take it seriously."
                "The cast data is as follows: {}".format(cast_data))

            # Run agent in autonomous mode
            for chunk in agent_executor.stream(
                {"messages": [HumanMessage(content=thought)]}, config):
                roast = ""
                if "agent" in chunk:
                    roast = chunk["agent"]["messages"][0].content
                    print(chunk["agent"]["messages"][0].content)
                elif "tools" in chunk:
                    roast = chunk["tools"]["messages"][0].content
                    print(chunk["tools"]["messages"][0].content)
                print("-------------------")

                cast = farcaster_utils.post_roast(username, roast)

            # return f"Operation successful: {cast.hash}"

            # Wait before the next action
            time.sleep(interval)

        except KeyboardInterrupt:
            print("Goodbye Agent!")
            sys.exit(0)


# Chat Mode
def run_chat_mode(agent_executor, config):
    """Run the agent interactively based on user input."""
    print("Starting chat mode... Type 'exit' to end.")
    while True:
        try:
            user_input = input("\nUser: ")
            if user_input.lower() == "exit":
                break

            # Run agent with the user's input in chat mode
            for chunk in agent_executor.stream(
                {"messages": [HumanMessage(content=user_input)]}, config):
                if "agent" in chunk:
                    print(chunk["agent"]["messages"][0].content)
                elif "tools" in chunk:
                    print(chunk["tools"]["messages"][0].content)
                print("-------------------")

        except KeyboardInterrupt:
            print("Goodbye Agent!")
            sys.exit(0)


# Mode Selection
def choose_mode():
    """Choose whether to run in autonomous or chat mode based on user input."""
    while True:
        print("\nAvailable modes:")
        print("1. chat    - Interactive chat mode")
        print("2. auto    - Autonomous action mode")

        choice = input(
            "\nChoose a mode (enter number or name): ").lower().strip()
        if choice in ["1", "chat"]:
            return "chat"
        elif choice in ["2", "auto"]:
            return "auto"
        print("Invalid choice. Please try again.")


def main():
    """Start the chatbot agent."""
    agent_executor, config = initialize_agent()

    mode = choose_mode()
    if mode == "chat":
        run_chat_mode(agent_executor=agent_executor, config=config)
    elif mode == "auto":
        run_autonomous_mode(agent_executor=agent_executor, config=config)


if __name__ == "__main__":
    print("Starting Agent...")
    main()
