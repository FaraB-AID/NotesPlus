//configures initial states on startup
if(!state.notesInitialize){
  state.notesRecord = []
  state.notes = []
  state.notesOO = []
  state.notesIO = []
  state.notesOP = []
  state.notesIP = []
  state.notesOS = []
  state.notesIS = []
  state.notesInitialize = true
}

//these functions are needed by noteTextParser
function noteTextRemover (noteType){
  for (i = 0; i < noteType.length; i++){
    text = text.replace(noteType[i][0], "")
  }
}
function noteRecordCheck(noteType){
  if (noteType[i][1] || noteType[i][3]){  
    for(ii = 0; ii < state.notesRecord.length; ii++){
      if(state.notesRecord[ii].record == noteType[i][0]){
        state.notesRecordMatch = true
      }
    }
  }
}
function noteRecorder(noteType){
  tempLine = Number(noteType[i][5]) ? Number(noteType[i][5]) : 0
  tempObject = {note: tempNote, line: tempLine}
  tempDuration = Number(noteType[i][1])
  tempDelay = Number(noteType[i][3])
  if ((tempDuration  || tempDelay) && !state.notesRecordMatch){
    tempBeginAt = tempDelay ? tempDelay + info.actionCount : info.actionCount
    tempEndBy = tempDuration  ? tempBeginAt + tempDuration : 1000000    
    tempRecord = {record: noteType[i][0], beginAt: tempBeginAt, endBy: tempEndBy}
    if(tempDuration == 1){
      tempRecord.once = true
    }
  }
  if (tempDuration || tempDelay){
    tempObject.record = noteType[i][0]
  }
  if(noteType[i][6]){
    state.notes.push(tempObject)
  }
  if((tempDuration || tempDelay) && noteType[i][6] && !state.notesRecordMatch){
    state.notesRecord.push(tempRecord)
  }
  state.notesRecordMatch = false
}

function noteRecorderSpecial(noteType, stateName){
  tempObject = {note: noteType[i][6]}
  tempDuration = Number(noteType[i][1])
  tempDelay = Number(noteType[i][3])
  if ((tempDuration || tempDelay) && !state.notesRecordMatch){ 
    tempBeginAt = tempDelay ? tempDelay + info.actionCount : info.actionCount
    tempEndBy = tempDuration ? tempBeginAt + tempDuration : 1000000
    tempRecord = {record: noteType[i][0], beginAt: tempBeginAt, endBy: tempEndBy}
    if(tempDuration == 1){
      tempRecord.once = 1
    }
  }
  if (tempDuration || tempDelay){
    tempObject.record = noteType[i][0]
  }
  if(noteType[i][6]){
    state[stateName].push(tempObject)
  }
  if((tempDuration || tempDelay) && noteType[i][6] && !state.notesRecordMatch){
    state.notesRecord.push(tempRecord)
  }
  state.notesRecordMatch = false
}
//this function finds, parses, and extracts Note++ notes
function noteTextParser (){
  state.notes = []
  state.notesOO = []
  state.notesIO = []
  state.notesOP = []
  state.notesIP = []
  state.notesOS = []
  state.notesIS = []


  //this finds and caches Notes++ formatted Notes in text
  authorsNotes = [...text.matchAll(/\{(\d*)(\+?(\d*))(a\/?n(\d+)):([^\{\}]*)\}\n?/gi)]
  unformattedNotes = [...text.matchAll(/\{(\d*)*(\+?(\d*))([\s-,\.]?(\d+)):([^\{\}]*)\}\n?/gi)]
  editorsNotes = [...text.matchAll(/\{(\d*)(\+?(\d*))(e\/?n(\d+)):([^\{\}]*)\}\n?/gi)]
  editorsNotesScene = [...text.matchAll(/\{(\d*)(\+?(\d*))(e\/?ns(\d+)):([^\{\}]*)\}\n?/gi)]
  outputOverrideNotes = [...text.matchAll(/\{(\d*)(\+?(\d*))(o\/?o)(:)([^\{\}]*)\}\n?/gi)]
  inputOverrideNotes = [...text.matchAll(/\{(\d*)(\+?(\d*))(i\/?o)(:)([^\{\}]*)\}\n?/gi)]
  outputPrefixNotes = [...text.matchAll(/\{(\d*)(\+?(\d*))(o\/?p)(:)([^\{\}]*)\}\n?/gi)]
  inputPrefixNotes = [...text.matchAll(/\{(\d*)(\+?(\d*))(i\/?p)(:)([^\{\}]*)\}\n?/gi)]
  outputSuffixNotes = [...text.matchAll(/\{(\d*)(\+?(\d*))(o\/?s)(:)([^\{\}]*)\}\n?/gi)]
  inputSuffixNotes = [...text.matchAll(/\{(\d*)(\+?(\d*))(i\/?s)(:)([^\{\}]*)\}\n?/gi)]

  //this finds and caches Notes++ formatted Notes in {notes} WIs
  for(i = 0; i < worldInfo.length; i++){
    if(/\{notes\}/i.test(worldInfo[i].keys)){
      authorsNotesTemp = [...worldInfo[i].entry.matchAll(/\{(\d*)(\+?(\d*))(a\/?n(\d+)):([^\{\}]*)\}\n?/gi)]
      authorsNotes = authorsNotes.concat(authorsNotesTemp)
      unformattedNotesTemp = [...worldInfo[i].entry.matchAll(/\{(\d*)(\+?(\d*))([\s-,\.]?(\d+)):([^\{\}]*)\}\n?/gi)]
      unformattedNotes = unformattedNotes.concat(unformattedNotesTemp)
      editorsNotesTemp = [...worldInfo[i].entry.matchAll(/\{(\d*)(\+?(\d*))(e\/?n(\d+)):([^\{\}]*)\}\n?/gi)]
      editorsNotes = editorsNotes.concat(editorsNotesTemp)
      editorsNotesSceneTemp = [...worldInfo[i].entry.matchAll(/\{(\d*)(\+?(\d*))(e\/?ns(\d+)):([^\{\}]*)\}\n?/gi)]
      editorsNotesScene = editorsNotesScene.concat(editorsNotesSceneTemp)
      outputOverrideNotesTemp = [...worldInfo[i].entry.matchAll(/\{(\d*)(\+?(\d*))(o\/?o)(:)([^\{\}]*)\}\n?/gi)]
      outputOverrideNotes = outputOverrideNotes.concat(outputOverrideNotesTemp)
      inputOverrideNotesTemp = [...worldInfo[i].entry.matchAll(/\{(\d*)(\+?(\d*))(i\/?o)(:)([^\{\}]*)\}\n?/gi)]
      inputOverrideNotes = inputOverrideNotes.concat(inputOverrideNotesTemp)
      outputPrefixNotesTemp = [...worldInfo[i].entry.matchAll(/\{(\d*)(\+?(\d*))(o\/?p)(:)([^\{\}]*)\}\n?/gi)]
      outputPrefixNotes = outputPrefixNotes.concat(outputPrefixNotesTemp)
      inputPrefixNotesTemp = [...worldInfo[i].entry.matchAll(/\{(\d*)(\+?(\d*))(i\/?p)(:)([^\{\}]*)\}\n?/gi)]
      inputPrefixNotes = inputPrefixNotes.concat(inputPrefixNotesTemp)
      outputSuffixNotesTemp = [...worldInfo[i].entry.matchAll(/\{(\d*)(\+?(\d*))(o\/?s)(:)([^\{\}]*)\}\n?/gi)]
      outputSuffixNotes = outputSuffixNotes.concat(outputSuffixNotesTemp)
      inputSuffixNotesTemp = [...worldInfo[i].entry.matchAll(/\{(\d*)(\+?(\d*))(i\/?s)(:)([^\{\}]*)\}\n?/gi)]
      inputSuffixNotes = inputSuffixNotes.concat(inputSuffixNotesTemp)
    }
  }
  //this removes Note++ formatted text from the context
  noteTextRemover (authorsNotes)
  noteTextRemover (unformattedNotes)
  noteTextRemover (editorsNotes)
  noteTextRemover (editorsNotesScene)
  noteTextRemover (outputOverrideNotes)
  noteTextRemover (inputOverrideNotes)
  noteTextRemover (outputPrefixNotes)
  noteTextRemover (inputPrefixNotes)
  noteTextRemover (outputSuffixNotes)
  noteTextRemover (inputSuffixNotes)

  //this reformats the cached Note++ text into an array of 
  //objects ready to be injected into the context later
  for(i = 0; i < authorsNotes.length; i++){
    noteRecordCheck(authorsNotes)
    if(/\{\d*\+?\d*a\/?n\d+:\s+\}\n?/i.test(authorsNotes[i][0])){
      authorsNotes[i][6] = ""
    }
    tempNote = authorsNotes[i][0].replace(`{${authorsNotes[i][1]}${authorsNotes[i][2]}${authorsNotes[i][4]}`, "[Author's note")
    tempNote = tempNote.replace("}\n", "}")
    tempNote = tempNote.replace("}", "]")
    noteRecorder(authorsNotes)
  }
  for(i = 0; i < unformattedNotes.length; i++){
    noteRecordCheck(unformattedNotes)
    if(/\{\d*\+?\d*[\s-,\.]?\d+:\s+\}\n?/i.test(unformattedNotes[i][0])){
      unformattedNotes[i][6] = ""
    }
    tempNote = unformattedNotes[i][6]
    noteRecorder(unformattedNotes)
  }
  for(i = 0; i < editorsNotes.length; i++){
    noteRecordCheck(editorsNotes)
    if(/\{\d*\+?\d*e\/?n\d+:\s+\}\n?/i.test(editorsNotes[i][0])){
      editorsNotes[i][6] = ""
    }
    tempNote = editorsNotes[i][0].replace(`{${editorsNotes[i][1]}${editorsNotes[i][2]}${editorsNotes[i][4]}`, "[Editor's note")
    tempNote = tempNote.replace("}\n", "}")
    tempNote = tempNote.replace("}", "]")
    noteRecorder(editorsNotes)
  }
  for(i = 0; i < editorsNotesScene.length; i++){
    noteRecordCheck(editorsNotesScene)
    if(/\{\d*\+?\d*e\/?ns\d+:\s+\}\n?/i.test(editorsNotesScene[i][0])){
      editorsNotesScene[i][6] = ""
    }
    tempNote = editorsNotesScene[i][0].replace(`{${editorsNotesScene[i][1]}${editorsNotesScene[i][2]}${editorsNotesScene[i][4]}:`, "[Editor's note: this scene:<")
    tempNote = tempNote.replace("}\n", "}")
    tempNote = tempNote.replace("}", ">.]")
    noteRecorder(editorsNotesScene)
  }
  for(i = 0; i < outputOverrideNotes.length; i++){
    noteRecordCheck(outputOverrideNotes)
    if(/\{\d*\+?\d*o\/?o:\s+\}\n?/i.test(outputOverrideNotes[i][0])){
      outputOverrideNotes[i][6] = ""
    }
    noteRecorderSpecial(outputOverrideNotes, "notesOO")
  }
  for(i = 0; i < inputOverrideNotes.length; i++){
    noteRecordCheck(inputOverrideNotes)
    if(/\{\d*\+?\d*i\/?o:\s+\}\n?/i.test(inputOverrideNotes[i][0])){
      inputOverrideNotes[i][6] = ""
    }
    noteRecorderSpecial(inputOverrideNotes, "notesIO")
  }
  for(i = 0; i < outputPrefixNotes.length; i++){
    noteRecordCheck(outputPrefixNotes)
    if(/\{\d*\+?\d*o\/?p:\s+\}\n?/i.test(outputPrefixNotes[i][0])){
      outputPrefixNotes[i][6] = ""
    }
    noteRecorderSpecial(outputPrefixNotes, "notesOP")
  }
  for(i = 0; i < inputPrefixNotes.length; i++){
    noteRecordCheck(inputPrefixNotes)
    if(/\{\d*\+?\d*i\/?p:\s+\}\n?/i.test(inputPrefixNotes[i][0])){
      inputPrefixNotes[i][6] = ""
    }
    noteRecorderSpecial(inputPrefixNotes, "notesIP")
  }
  for(i = 0; i < outputSuffixNotes.length; i++){
    noteRecordCheck(outputSuffixNotes)
    if(/\{\d*\+?\d*o\/?s:\s+\}\n?/i.test(outputSuffixNotes[i][0])){
      outputSuffixNotes[i][6] = ""
    }
    noteRecorderSpecial(outputSuffixNotes, "notesOS")
  }
  for(i = 0; i < inputSuffixNotes.length; i++){
    noteRecordCheck(inputSuffixNotes)
    if(/\{\d*\+?\d*i\/?s:\s+\}\n?/i.test(inputSuffixNotes[i][0])){
      inputSuffixNotes[i][6] = ""
    }
    noteRecorderSpecial(inputSuffixNotes, "notesIS")
  }
  //this removes any empty author's notes
  //which can generate if the A/N field is used for Note++ notes
  text = text.replace(/\[Author's note:[\s\n]*\]\n?/g, "")
}

//This injects the reformatted Note++ objects into the context
function noteTextInjector (){
  lines.reverse()
  for (i = 0; i < state.notes.length; i++){
    if (state.notes[i].record){
      for (ii = 0; ii < state.notesRecord.length; ii++){
        if(state.notes[i].record == state.notesRecord[ii].record){
          if(info.actionCount < state.notesRecord[ii].endBy && info.actionCount >= state.notesRecord[ii].beginAt && !state.notesRecord[ii].once){
            if(lines.length > (state.notes[i].line - 1)){
              lines[state.notes[i].line] += `\n${state.notes[i].note}`
            }
          } else if (state.notesRecord[ii].once){
            if (info.actionCount <= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 2) {
              state.notesRecord[ii].once = 1
            }
            if (info.actionCount >= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 1){
              state.notesRecord[ii].once = 2
              if(lines.length > (state.notes[i].line - 1)){
                lines[state.notes[i].line] += `\n${state.notes[i].note}`
              }
            }
          }
        }
      }
    } else if (lines.length > (state.notes[i].line - 1)){
      lines[state.notes[i].line] += `\n${state.notes[i].note}`
    }
  }
  lines.reverse()
  //this records the last model input for the /lmi command
  state.lmi = lines.join("\n").slice(-(info.maxChars))
}

//this modifies the input with the input special format notes
function noteInputSpecial(){
  notesTextTemp = ""
  notesPrefixTemp = ""
  notesSuffixTemp = ""
  for (i = 0; i < state.notesIO.length; i++){
    if (state.notesIO[i].record){
      for (ii = 0; ii < state.notesRecord.length; ii++){
        if(state.notesIO[i].record == state.notesRecord[ii].record){
          if((info.actionCount - 1) < state.notesRecord[ii].endBy && (info.actionCount - 1) >= state.notesRecord[ii].beginAt && !state.notesRecord[ii].once){
            notesTextTemp += state.notesIO[i].note 
          } else if (state.notesRecord[ii].once){
            if ((info.actionCount - 1) <= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 2) {
              state.notesRecord[ii].once = 1
            }
            if ((info.actionCount - 1) >= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 1){
              state.notesRecord[ii].once = 2
              notesTextTemp += state.notesIO[i].note 
            }
          }
        }
      }
    } else {
      notesTextTemp += state.notesIO[i].note 
    }
  }
  if (notesTextTemp){
    text = notesTextTemp
  }
  for (i = 0; i < state.notesIP.length; i++){
    if (state.notesIP[i].record){
      for (ii = 0; ii < state.notesRecord.length; ii++){
        if(state.notesIP[i].record == state.notesRecord[ii].record){
          if((info.actionCount - 1) < state.notesRecord[ii].endBy && (info.actionCount - 1) >= state.notesRecord[ii].beginAt && !state.notesRecord[ii].once){
            notesPrefixTemp += state.notesIP[i].note
          } else if (state.notesRecord[ii].once){
            if ((info.actionCount - 1) <= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 2) {
              state.notesRecord[ii].once = 1
            }
            if ((info.actionCount - 1) >= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 1){
              state.notesRecord[ii].once = 2
              notesPrefixTemp += state.notesIP[i].note 
            }
          }
        }
      }
    } else {
      notesPrefixTemp += state.notesIP[i].note
    }
  }
  text = notesPrefixTemp + text
  for (i = 0; i < state.notesIS.length; i++){
    if (state.notesIS[i].record){
      for (ii = 0; ii < state.notesRecord.length; ii++){
        if(state.notesIS[i].record == state.notesRecord[ii].record){
          if((info.actionCount - 1) < state.notesRecord[ii].endBy && (info.actionCount - 1) >= state.notesRecord[ii].beginAt && !state.notesRecord[ii].once){
            notesSuffixTemp += state.notesIS[i].note
          } else if (state.notesRecord[ii].once){
            if ((info.actionCount - 1) <= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 2) {
              state.notesRecord[ii].once = 1
            }
            if ((info.actionCount - 1) >= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 1){
              state.notesRecord[ii].once = 2
              notesSuffixTemp += state.notesIS[i].note
            }
          }
        }
      }
    } else {
      notesSuffixTemp += state.notesIS[i].note 
    }
  }
  text = text + notesSuffixTemp
}

//this modifies the output with the output special format notes
function noteOutputSpecial(){
  notesTextTemp = ""
  notesPrefixTemp = ""
  notesSuffixTemp = ""
  for (i = 0; i < state.notesOO.length; i++){
    if (state.notesOO[i].record){
      for (ii = 0; ii < state.notesRecord.length; ii++){
        if(state.notesOO[i].record == state.notesRecord[ii].record){
          if(info.actionCount < state.notesRecord[ii].endBy && info.actionCount >= state.notesRecord[ii].beginAt && !state.notesRecord[ii].once){
            notesTextTemp += state.notesOO[i].note 
          } else if (state.notesRecord[ii].once){
            if (info.actionCount <= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 2) {
              state.notesRecord[ii].once = 1
            }
            if (info.actionCount >= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 1){
              state.notesRecord[ii].once = 2
              notesTextTemp += state.notesOO[i].note 
            }
          }
        }
      }
    } else {
      notesTextTemp += state.notesOO[i].note 
    }
  }
  if (notesTextTemp){
    text = notesTextTemp
  }
  for (i = 0; i < state.notesOP.length; i++){
    if (state.notesOP[i].record){
      for (ii = 0; ii < state.notesRecord.length; ii++){
        if(state.notesOP[i].record == state.notesRecord[ii].record){
          if(info.actionCount < state.notesRecord[ii].endBy && info.actionCount >= state.notesRecord[ii].beginAt && !state.notesRecord[ii].once){
            notesPrefixTemp += state.notesOP[i].note
          } else if (state.notesRecord[ii].once){
            if (info.actionCount <= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 2) {
              state.notesRecord[ii].once = 1
            }
            if (info.actionCount >= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 1){
              state.notesRecord[ii].once = 2
              notesPrefixTemp += state.notesOP[i].note
            }
          }
        }
      }
    } else {
      notesPrefixTemp += state.notesOP[i].note
    }
  }
  text = notesPrefixTemp + text
  for (i = 0; i < state.notesOS.length; i++){
    if (state.notesOS[i].record){
      for (ii = 0; ii < state.notesRecord.length; ii++){
        if(state.notesOS[i].record == state.notesRecord[ii].record){
          if(info.actionCount < state.notesRecord[ii].endBy && info.actionCount >= state.notesRecord[ii].beginAt && !state.notesRecord[ii].once){
            notesSuffixTemp += state.notesOS[i].note
          } else if (state.notesRecord[ii].once){
            if (info.actionCount <= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 2) {
              state.notesRecord[ii].once = 1
            }
            if (info.actionCount >= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 1){
              state.notesRecord[ii].once = 2
              notesSuffixTemp += state.notesOS[i].note
            }
          }
        }
      }
    } else {
      notesSuffixTemp += state.notesOS[i].note 
    }
  }
  text = text + notesSuffixTemp
}

function notesCommands(){
  state.message = ""

  //this is a command to display the last model input
  if(/\n? ?(> You |> You say "|)(\/lmi)/i.test(text)) {
    text = "\n" + state.lmi
    state.contextStop = true
  }

  //this is a command to display the last model input
  if(/\n? ?(> You |> You say "|)(\/reset)/i.test(text)) {
    state.message = "Your cache of duration notes has been cleared."
    state.notesRecord = []
    text = ""
    stop = true
  }

  //this is a command to toggle the AI
  if(/\n? ?(> You |> You say "|)(\/ai)/i.test(text)){
    state.noteAIOff = state.noteAIOff ? false : true
    state.message = state.noteAIOff ? "The AI has been turned off." : "The AI has been turned on."
    text = ""
    stop = true
  }
}
