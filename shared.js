function noteTextParser (){
  tempText = text
  state.notes = []

  //this finds and caches Note++ formatted text
  authorsNotes = [...tempText.matchAll(/\{(a\/?n(\d+)):([^\{\}]*)\}\n?/gi)]
  unformattedNotes = [...tempText.matchAll(/\{(\d+):([^\{\}]*)\}\n?/gi)]
  editorsNotes = [...tempText.matchAll(/\{(e\/?n(\d+)):([^\{\}]*)\}\n?/gi)]
  editorsNotesScene = [...tempText.matchAll(/\{(e\/?ns(\d+)):([^\{\}]*)\}\n?/gi)]

  //this removes Note++ formatted text from the context
  //and tracks how m
  for (i = 0; i < authorsNotes.length; i++){
    tempText = tempText.replace(authorsNotes[i][0], "")
  }
  for (i = 0; i < unformattedNotes.length; i++){
    tempText = tempText.replace(unformattedNotes[i][0], "")
  }
  for (i = 0; i < editorsNotes.length; i++){
    tempText = tempText.replace(editorsNotes[i][0], "")
  }
  for (i = 0; i < editorsNotesScene.length; i++){
    tempText = tempText.replace(editorsNotesScene[i][0], "")
  }

  //this reformats the cached Note++ text into an array of 
  //objects ready to be injected into the context later
  for(i = 0; i < authorsNotes.length; i++){
    if(/\{a\/?n\d+:\s+\}\n?/i.test(authorsNotes[i][0])){
      authorsNotes[i][3] = ""
    }
    tempNote = authorsNotes[i][0].replace(`{${authorsNotes[i][1]}`, "[Author's note")
    tempNote = tempNote.replace("}\n", "}")
    tempNote = tempNote.replace("}", "]")
    tempLine = Number(authorsNotes[i][2])
    tempObject = {note: tempNote, line: tempLine}
    if(authorsNotes[i][3]){
      state.notes.push(tempObject)
    }
  }
  for(i = 0; i < unformattedNotes.length; i++){
    if(/\{\d+:\s+\}\n?/i.test(unformattedNotes[i][0])){
      unformattedNotes[i][2] = ""
    }
    tempNote = unformattedNotes[i][0].replace(`{${unformattedNotes[i][1]}:`, "")
    tempNote = tempNote.replace("}\n", "}")
    tempNote = tempNote.replace("}", "")
    tempLine = Number(unformattedNotes[i][1])
    tempObject = {note: tempNote, line: tempLine}
    if(unformattedNotes[i][2]){
      state.notes.push(tempObject)
    }
  }
  for(i = 0; i < editorsNotes.length; i++){
    if(/\{e\/?n\d+:\s+\}\n?/i.test(editorsNotes[i][0])){
      editorsNotes[i][3] = ""
    }
    tempNote = editorsNotes[i][0].replace(`{${editorsNotes[i][1]}`, "[Editor's note")
    tempNote = tempNote.replace("}\n", "}")
    tempNote = tempNote.replace("}", "]")
    tempLine = Number(editorsNotes[i][2])
    tempObject = {note: tempNote, line: tempLine}
    if(editorsNotes[i][3]){
      state.notes.push(tempObject)
    }
  }
  for(i = 0; i < editorsNotesScene.length; i++){
    if(/\{e\/?ns\d+:\s+\}\n?/i.test(editorsNotesScene[i][0])){
      editorsNotesScene[i][3] = ""
    }
    tempNote = editorsNotesScene[i][0].replace(`{${editorsNotesScene[i][1]}:`, "[Editor's note: this scene:<")
    tempNote = tempNote.replace("}\n", "}")
    tempNote = tempNote.replace("}", ">.]")
    tempLine = Number(editorsNotesScene[i][2])
    tempObject = {note: tempNote, line: tempLine}
    if(editorsNotesScene[i][3]){
      state.notes.push(tempObject)
    }
  }
  //this removes any empty author's notes
  //which can generate if the A/N field is used for Note++ notes
  tempText = tempText.replace(/\[Author's note:[\s\n]*\]\n?/g, "")
  text = tempText
}

//This injects the reformatted Note++ objects into the context
function noteTextInjector (){
  for (i = 0; i < state.notes.length; i++){
      if(state.notes[i].line > 0){
        if(lines.length > (state.notes[i].line - 1)){
          lines.splice(-(state.notes[i].line), 0, state.notes[i].note)
        } 
      } else if (state.notes[i].line == 0) {
        lines.push(state.notes[i].note)
      }
    }
  }
