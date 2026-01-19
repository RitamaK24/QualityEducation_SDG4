from langgraph.graph import StateGraph
from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class TutorState(dict):
    pass

def analyze(state):
    prompt = f"""
    Student scored {state['score']} in {state['topic']}.
    Decide learning level: basic, intermediate, advanced.
    """
    res = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    state["level"] = res.choices[0].message.content.strip().lower()
    return state

def lesson(state):
    prompt = f"""
    Create a lesson for {state['topic']} at {state['level']} level.
    Include explanation + study tips.
    """
    res = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    state["lesson"] = res.choices[0].message.content
    return state

graph = StateGraph(TutorState)
graph.add_node("analyze", analyze)
graph.add_node("lesson", lesson)
graph.set_entry_point("analyze")
graph.add_edge("analyze", "lesson")

tutor_graph = graph.compile()
'''from langgraph.graph import StateGraph

class TutorState(dict):
    pass

def analyze(state):
    score = state["score"]
    if score < 40:
        state["level"] = "basic"
    elif score < 70:
        state["level"] = "intermediate"
    else:
        state["level"] = "advanced"
    return state

def lesson(state):
    state["lesson"] = f"{state['level']} level lesson on {state['topic']}"
    return state

graph = StateGraph(TutorState)
graph.add_node("analyze", analyze)
graph.add_node("lesson", lesson)
graph.set_entry_point("analyze")
graph.add_edge("analyze", "lesson")

tutor_graph = graph.compile()'''



'''def tutor_logic(state):
    marks = state.get("marks", 0)

    if marks >= 80:
        return {"path": "advanced"}
    elif marks >= 40:
        return {"path": "intermediate"}
    else:
        return {"path": "remedial"}

graph = StateGraph(dict)
graph.add_node("analyze", tutor_logic)
graph.set_entry_point("analyze")
tutor_graph = graph.compile()'''