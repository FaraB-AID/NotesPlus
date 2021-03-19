if(!state.notesInitialize){
  state.notesRecord = []
  state.notesEndBy = 0
  state.notesInitialize = true
}

//this function finds, parses, and extracts Note++ notes
function noteTextParser (){
  tempText = text
  state.notes = []

  //this finds and caches Note++ formatted text
  authorsNotes = [...tempText.matchAll(/\{(\d*)(a\/?n(\d+)):([^\{\}]*)\}\n?/gi)]
  unformattedNotes = [...tempText.matchAll(/\{(\d*)([\s-,\.]?(\d+)):([^\{\}]*)\}\n?/gi)]
  editorsNotes = [...tempText.matchAll(/\{(\d*)(e\/?n(\d+)):([^\{\}]*)\}\n?/gi)]
  editorsNotesScene = [...tempText.matchAll(/\{(\d*)(e\/?ns(\d+)):([^\{\}]*)\}\n?/gi)]

  //this removes Note++ formatted text from the context
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
    for(ii = 0; ii < state.notesRecord.length; ii++){
      if(state.notesRecord[ii].record == authorsNotes[i][0]){
        state.notesRecordMatch = true
      }
    }
    if(/\{\d*a\/?n\d+:\s+\}\n?/i.test(authorsNotes[i][0])){
      authorsNotes[i][4] = ""
    }
    tempNote = authorsNotes[i][0].replace(`{${authorsNotes[i][1]}${authorsNotes[i][2]}`, "[Author's note")
    tempNote = tempNote.replace("}\n", "}")
    tempNote = tempNote.replace("}", "]")
    tempLine = Number(authorsNotes[i][3])
    tempEndBy = Number(authorsNotes[i][1]) ? info.actionCount + Number(authorsNotes[i][1]) : 0
    tempRecord = {record: authorsNotes[i][0], endBy: tempEndBy}
    tempObject = {record: authorsNotes[i][0], note: tempNote, line: tempLine}
    if(authorsNotes[i][4]){
      state.notes.push(tempObject)
    }
    if(!state.notesRecordMatch){
      state.notesRecord.push(tempRecord)
    }
    state.notesRecordMatch = false
  }
  for(i = 0; i < unformattedNotes.length; i++){
    for(ii = 0; ii < state.notesRecord.length; ii++){
      if(state.notesRecord[ii].record == unformattedNotes[i][0]){
        state.notesRecordMatch = true
      }
    }
    if(/\{\d*[\s-,\.]?\d+:\s+\}\n?/i.test(unformattedNotes[i][0])){
      unformattedNotes[i][4] = ""
    }
    tempNote = unformattedNotes[i][0].replace(`{${unformattedNotes[i][1]}${unformattedNotes[i][2]}:`, "")
    tempNote = tempNote.replace("}\n", "}")
    tempNote = tempNote.replace("}", "")
    tempLine = Number(unformattedNotes[i][3])
    tempEndBy = Number(unformattedNotes[i][1]) ? info.actionCount + Number(unformattedNotes[i][1]) : 0
    tempRecord = {record: unformattedNotes[i][0], endBy: tempEndBy}
    tempObject = {record: unformattedNotes[i][0], note: tempNote, line: tempLine}
    if(unformattedNotes[i][4]){
      state.notes.push(tempObject)
    }
    if(!state.notesRecordMatch){
      state.notesRecord.push(tempRecord)
    }
    state.notesRecordMatch = false
  }
  for(i = 0; i < editorsNotes.length; i++){
    for(ii = 0; ii < state.notesRecord.length; ii++){
      if(state.notesRecord[ii].record == editorsNotes[i][0]){
        state.notesRecordMatch = true
      }
    }
    if(/\{\d*e\/?n\d+:\s+\}\n?/i.test(editorsNotes[i][0])){
      editorsNotes[i][4] = ""
    }
    tempNote = editorsNotes[i][0].replace(`{${editorsNotes[i][1]}${editorsNotes[i][2]}`, "[Editor's note")
    tempNote = tempNote.replace("}\n", "}")
    tempNote = tempNote.replace("}", "]")
    tempLine = Number(editorsNotes[i][3])
    tempEndBy = Number(editorsNotes[i][1]) ? info.actionCount + Number(editorsNotes[i][1]) : 0
    tempRecord = {record: editorsNotes[i][0], endBy: tempEndBy}
    tempObject = {record: editorsNotes[i][0], note: tempNote, line: tempLine}
    if(editorsNotes[i][4]){
      state.notes.push(tempObject)
    }
    if(!state.notesRecordMatch){
      state.notesRecord.push(tempRecord)
    }
    state.notesRecordMatch = false
  }
  for(i = 0; i < editorsNotesScene.length; i++){
    for(ii = 0; ii < state.notesRecord.length; ii++){
      if(state.notesRecord[ii].record == editorsNotesScene[i][0]){
        state.notesRecordMatch = true
      }
    }
    if(/\{\d*e\/?ns\d+:\s+\}\n?/i.test(editorsNotesScene[i][0])){
      editorsNotesScene[i][4] = ""
    }
    tempNote = editorsNotesScene[i][0].replace(`{${editorsNotesScene[i][1]}${editorsNotesScene[i][2]}:`, "[Editor's note: this scene:<")
    tempNote = tempNote.replace("}\n", "}")
    tempNote = tempNote.replace("}", ">.]")
    tempLine = Number(editorsNotesScene[i][3])
    tempEndBy = Number(editorsNotesScene[i][1]) ? info.actionCount + Number(editorsNotesScene[i][1]) : 0
    tempRecord = {record: editorsNotesScene[i][0], endBy: tempEndBy}
    tempObject = {record: editorsNotesScene[i][0], note: tempNote, line: tempLine}
    if(editorsNotesScene[i][4]){
      state.notes.push(tempObject)
    }
    if(!state.notesRecordMatch){
      state.notesRecord.push(tempRecord)
    }
    state.notesRecordMatch = false
  }
  //this removes any empty author's notes
  //which can generate if the A/N field is used for Note++ notes
  tempText = tempText.replace(/\[Author's note:[\s\n]*\]\n?/g, "")
  text = tempText
}

//This injects the reformatted Note++ objects into the context
function noteTextInjector (){
  for (i = 0; i < state.notes.length; i++){
    for (ii = 0; ii < state.notesRecord.length; ii++){
      if(state.notes[i].record == state.notesRecord[ii].record){
        state.notesEndBy = state.notesRecord[ii].endBy
      }
    }
    if(state.notesEndBy && info.actionCount < state.notesEndBy){
      if(state.notes[i].line > 0){
        if(lines.length > (state.notes[i].line - 1)){
          lines.splice(-(state.notes[i].line), 0, state.notes[i].note)
        } 
      } else if (state.notes[i].line == 0) {
        lines.push(state.notes[i].note)
      }
    } else if (!state.notesEndBy){
      if(state.notes[i].line > 0){
        if(lines.length > (state.notes[i].line - 1)){
          lines.splice(-(state.notes[i].line), 0, state.notes[i].note)
        } 
      } else if (state.notes[i].line == 0) {
        lines.push(state.notes[i].note)
      }
    }
    state.notesEndBy = 0
  }
}
