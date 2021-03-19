//this function finds, parses, and extracts Note++ notes
noteTextParser()

const lines = text.split("\n")

const modifier = (text) => {
  //this function injects reformatted Note++ notes into context
  noteTextInjector ()
  
  //this records the last model input for the /lmi command
  state.lmi = lines.join("\n").slice(-(info.maxChars))
  
  //this prevents submission to the AI if the /lmi command is used
  if(state.lmiToggle){
    state.lmiToggle = false
    stop = true; return{ stop }
  }

  const finalText = lines.join("\n")
  return { text: finalText }
} 
modifier(text)
