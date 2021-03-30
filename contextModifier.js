//this function finds, parses, and extracts Note++ notes
noteTextParser()
noteMessageInjector()
noteDisplayInjector()

const lines = text.split("\n")

const modifier = (text) => {
  //this function injects reformatted Note++ notes into context
  noteTextInjector()

  //this prevents submission to the AI if a command is used
if(state.contextStop){
  state.contextStop = false
  stop = true; return{ stop }
}

//this prevents the AI from running if /ai is toggled off
if(state.noteAIOff){
  stop = true; return{ stop }
}

  const finalText = lines.join("\n")
  return { text: finalText }
} 
modifier(text)
