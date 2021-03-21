const modifier = (text) => {
  let modifiedText = text
  const lowered = text.toLowerCase()

  //this implements a command to display the last model input
  if(/\n? ?(> You |> You say "|)(\/lmi)/i.test(text)) {
    modifiedText = "\n" + state.lmi
    state.lmiToggle = true
  }

  //at a request, I included a command to toggle the AI
  state.message = ""
  if(/\n? ?(> You |> You say "|)(\/ai)/i.test(text)){
    state.noteAIOff = state.noteAIOff ? false : true
    state.message = state.noteAIOff ? "The AI has been turned off." : "The AI has been turned on."
    text = null; stop = true; return{ text, stop }
  }

  return { text: modifiedText }
}

modifier(text)
