  //this is a function for creating the pronoun-swapper mini-script
  function pronounSwapper(){
    if(/\{ppl:[^\{\}]*\}/i.test(text)){
      pronounText = [...text.match(/\{ppl:([^\{\}]*)\}/i)]
      text = text.replace(pronounText[0], "")
      pronounNeut = false
      pronounFem = false
      pronounMasc = false
      if(/they|them|their|theirs|themselves|neuter|neutral|neutroi|nonbinary|other/i.test(pronounText[1])){
        pronounNeut = true
      } else if(/she|her|hers|herself|feminine|female|fem|woman/i.test(pronounText[1])){
        pronounFem = true
      } else if(/he|him|his|himself|masculine|male|masc|man/i.test(pronounText[1])){
        pronounMasc = true
      } else {
        pronounNeut = true
      }
      if(pronounNeut){
        text = text.replace(/\{sp\}/g, `they`)
        text = text.replace(/\{op\}/g, `them`)
        text = text.replace(/\{pa\}/g, `their`)
        text = text.replace(/\{pp\}/g, `theirs`)
        text = text.replace(/\{rp\}/g, `themselves`)
        text = text.replace(/\{Sp\}/g, `They`)
        text = text.replace(/\{Op\}/g, `Them`)
        text = text.replace(/\{Pa\}/g, `Their`)
        text = text.replace(/\{Pp\}/g, `Theirs`)
        text = text.replace(/\{Rp\}/g, `Themselves`)
      }
      if(pronounFem){
        text = text.replace(/\{sp\}/g, `she`)
        text = text.replace(/\{op\}/g, `her`)
        text = text.replace(/\{pa\}/g, `her`)
        text = text.replace(/\{pp\}/g, `hers`)
        text = text.replace(/\{rp\}/g, `herself`)
        text = text.replace(/\{Sp\}/g, `She`)
        text = text.replace(/\{Op\}/g, `Her`)
        text = text.replace(/\{Pa\}/g, `Her`)
        text = text.replace(/\{Pp\}/g, `Hers`)
        text = text.replace(/\{Rp\}/g, `Herself`)
      }
      if(pronounMasc){
        text = text.replace(/\{sp\}/g, `he`)
        text = text.replace(/\{op\}/g, `him`)
        text = text.replace(/\{pa\}/g, `his`)
        text = text.replace(/\{pp\}/g, `his`)
        text = text.replace(/\{rp\}/g, `himself`)
        text = text.replace(/\{Sp\}/g, `He`)
        text = text.replace(/\{Op\}/g, `Him`)
        text = text.replace(/\{Pa\}/g, `His`)
        text = text.replace(/\{Pp\}/g, `His`)
        text = text.replace(/\{Rp\}/g, `Himself`)
      }
    }
  }

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
  state.notesM = []
  state.notesD = []
  state.statNotes = []
  pronounSwapper()
  state.notesInitialize = true
}
//this function creates a continue(output)-only action count
function noteTimeKeeper(){
  state.outputCount = 0
  for (i = 0; i < history.length; i++){
    if (history[i].type == "continue"){
      state.outputCount++
    }
  }
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
    tempBeginAt = tempDelay ? tempDelay + state.outputCount : state.outputCount
    tempEndBy = tempDuration ? tempBeginAt + tempDuration : 1000000    
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
    tempBeginAt = tempDelay ? tempDelay + state.outputCount : state.outputCount
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
function noteRecorderDisplay(noteType, stateName){
  tempDisplayObject = {line: Number(noteType[i][5]), key: noteType[i][6], value: noteType[i][7], color: noteType[i][8]}
  tempDuration = Number(noteType[i][1])
  tempDelay = Number(noteType[i][3])
  if ((tempDuration || tempDelay) && !state.notesRecordMatch){ 
    tempBeginAt = tempDelay ? tempDelay + state.outputCount : state.outputCount
    tempEndBy = tempDuration ? tempBeginAt + tempDuration : 1000000
    tempRecord = {record: noteType[i][0], beginAt: tempBeginAt, endBy: tempEndBy}
    if(tempDuration == 1){
      tempRecord.once = 1
    }
  }
  if (tempDuration || tempDelay){
    tempDisplayObject.record = noteType[i][0]
  }

  state[stateName].push(tempDisplayObject)

  if((tempDuration || tempDelay) && noteType[i][6] && !state.notesRecordMatch){
    state.notesRecord.push(tempRecord)
  }
  state.notesRecordMatch = false
}
function statValue(statName){
  statReg = new RegExp(`${statName}:\\s?([1-5])`, "i")
  statText = statNotes[i][2].match(statReg) ? statNotes[i][2].match(statReg) : []
  return Number(statText[1]) ? Number(statText[1]) : 0
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
  state.notesM = []
  state.notesD = []
  state.statNotes = []


  //this finds and caches Notes++ formatted Notes in text
  authorsNotes = [...text.matchAll(/\{(\d*)(\+?(\d*))(a\/?n(\d+)):([^\{\}]*)\}\n?/gi)]
  unformattedNotes = [...text.matchAll(/\{(\d*)(\+?(\d*))([\s-,\.]?(\d+)):([^\{\}]*)\}\n?/gi)]
  editorsNotes = [...text.matchAll(/\{(\d*)(\+?(\d*))(e\/?n(\d+)):([^\{\}]*)\}\n?/gi)]
  editorsNotesScene = [...text.matchAll(/\{(\d*)(\+?(\d*))(e\/?ns(\d+)):([^\{\}]*)\}\n?/gi)]
  outputOverrideNotes = [...text.matchAll(/\{(\d*)(\+?(\d*))(o\/?o)(:)([^\{\}]*)\}\n?/gi)]
  inputOverrideNotes = [...text.matchAll(/\{(\d*)(\+?(\d*))(i\/?o)(:)([^\{\}]*)\}\n?/gi)]
  outputPrefixNotes = [...text.matchAll(/\{(\d*)(\+?(\d*))(o\/?p)(:)([^\{\}]*)\}\n?/gi)]
  inputPrefixNotes = [...text.matchAll(/\{(\d*)(\+?(\d*))(i\/?p)(:)([^\{\}]*)\}\n?/gi)]
  outputSuffixNotes = [...text.matchAll(/\{(\d*)(\+?(\d*))(o\/?s)(:)([^\{\}]*)\}\n?/gi)]
  inputSuffixNotes = [...text.matchAll(/\{(\d*)(\+?(\d*))(i\/?s)(:)([^\{\}]*)\}\n?/gi)]
  messageNotes = [...text.matchAll(/\{(\d*)(\+?(\d*))(m)(:)([^\{\}]*)\}\n?/gi)]
  displayNotes = [...text.matchAll(/\{(\d*)(\+?(\d*))(d)(\d?):\s*([^\{\}:]*):\s*([^\{\}:]*):?\s*([^\{\}]*)\}\n?/gi)]
  statNotes = [...text.matchAll(/\{\s*(.*)\sstats:([^\{\}]*)\}\n?/gi)]
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
      messageNotesTemp = [...worldInfo[i].entry.matchAll(/\{(\d*)(\+?(\d*))(m)(:)([^\{\}]*)\}\n?/gi)]
      messageNotes = messageNotes.concat(messageNotesTemp)
      displayNotesTemp = [...worldInfo[i].entry.matchAll(/\{(\d*)(\+?(\d*))(d)(\d?):\s*([^\{\}:]*):\s*([^\{\}:]*):?\s*([^\{\}]*)\}\n?/gi)]
      displayNotes = displayNotes.concat(displayNotesTemp)
      statNotesTemp = [...worldInfo[i].entry.matchAll(/\{\s*(.*)\sstats:([^\{\}]*)\}\n?/gi)]
      statNotes = statNotes.concat(statNotesTemp)
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
  noteTextRemover (messageNotes)
  noteTextRemover (displayNotes)
  noteTextRemover (statNotes)

  //these arrays define "terms" used to convey stat values to the AI
  statStrength = ["", "< pathetically weak>/", "< weak>/", "< fit>/", "< brawny>/", "< incredibly brawny>/"]
  statDexterity = ["", "< complete klutz>/", "< uncoordinated>/", "< deft>/", "< nimble& graceful>/", "< impossibly nimble>/"]
  statConstitution = ["", "< sickly& unwell>/", "< frail>/", "< healthy>/", "< robust>/", "< pinnacle of health>/"]
  statIntelligence = ["", "< vegetative>/", "< stupid>/", "< clever>/", "< very smart>/", "< genius>/"]
  statWisdom = ["", "< irrational>/", "< clueless>/", "< rational>/", "< wise>/", "< nearly prescient>/"]
  statCharisma = ["", "< tactless>/", "< boring>/", "< likable>/", "< charismatic>/", "< irresistible charm>/"]
  stat = ["", "< >/", "< >/", "< >/", "< >/", "< >/"]
  statFemininty = ["", "< butch>/", "< androgynous>/", "< feminine>/", "< high fem>/", "< hyperfeminine>/"]
  statMasculinity = ["", "< soft>/", "< androgynous>/", "< masculine>/", "< masculine& macho>/", "< hypermasculine>/"]
  statDemonic = ["", "", "< demon blooded>/", "< half demon>/", "< demon>/", "< archdemon>/"]
  statAngelic = ["", "", "< angel blooded>/", "< half angel>/", "< angel>/", "< archangel>/"]
  statFeline = ["", "", "< cat ears>/", "< feline features>/", "< neko>/", "< anthro cat>/"]
  statCanine = ["", "", "< dog ears>/", "< canine features>/", "< inu>/", "< anthro dog>/"]
  statLupine = ["", "", "< wolf ears>/", "< lupine features>/", "< okami>/", "< anthro wolf>/"]
  statVulpine = ["", "", "< fox ears>/", "< vulpine features>/", "< kitsune>/", "< anthro fox>/"]
  statEquine = ["", "", "< horse tail>/", "< equine features>/", "< uma>/", "< anthro horse>/"]
  statWillpower = ["", "< mindlessly obedient>/", "< pliant>/", "< willful>/", "< steadfast>/", "< unbreakable will>/"]
  statCorruption = ["", "< pure>/", "< chaste>/", "< modest>/", "< lecherous>/", "< debauched>/"]
  statLust = ["", "< celibate>/", "< chaste>/", "< normal sex drive>/", "< lustful>/", "< sex addict>/"]
  statFear = ["", "< completely fearless>/", "< unafraid>/", "< trepidatious>/", "< fearful>/", "< terrified>/"]
  statConfidence = ["", "< nervous wreck>/", "< timid>/", "< self-assured>/", "< confident>/", "< absolutely confident>/"]
  statSadism = ["", "< sadism≡ gentle>/", "< sadism≡ demanding>/", "< sadism≡ sadistic>/", "< sadism≡ cruel>/", "< sadism≡ extreme& cruel>/"]
  statMasochism = ["", "< masochism≡ pain averse>/", "< masochism≡ demure>/", "< masochism≡ masochistic>/", "< masochism≡ painslut>/", "< masochism≡ extreme& painslut>/"]
  statKinkiness = ["", "< kinkiness≡ vanilla>/", "< kinkiness≡ intrigued>/", "< kinkiness≡ kinky>/", "< kinkiness≡ fetishist>/", "< kinkiness≡ extreme kinkster>/"]
  statStability = ["", "< shattered mind>/", "< disturbed>/", "< mentally stable>/", "< serene>/", "< transcendently calm>/"]
  statSenseOfSelf = ["", "< one with the world>/", "< indistinct>/", "< self-aware>/", "< narcicistic>/", "< solipsistic>/"]
  statSelfishness = ["", "< selfless>/", "< generous>/", "< self-interested>/", "< selfish>/", "< egoist& egotistical>/"]
  statPainSensitivity = ["", "< pain≡ numbed>/", "< pain≡ dulled>/", "< pain≡ receptive>/", "< pain≡ sensitive>/", "< pain≡ hypersensitive>/"]
  statPleasureSensitivity = ["", "< pleasure≡ numbed>/", "< pleasure≡ dulled>/", "< pleasure≡ receptive>/", "< pleasure≡ sensitive>/", "< pleasure≡ hypersensitive>/"]
  statElasticity = ["", "< elasticity≡ rigid>/", "< elasticity≡ taut>/", "< elasticity≡ malleable>/", "< elasticity≡ very stretchy>/", "< elasticity≡ completely elastic>/"]
  statAttractiveness = ["", "< hideous>/", "< unattractive>/", "< average looking>/", "< hot& attractive>/", "< irresistibly attractive>/"]
  statFitness = ["", "< horribly unfit>/", "< unfit>/", "< fit>/", "< well fit& shapely>/", "< paragon of fitness>/"]
  statHeight = ["", "< height≡ miniscule& 6\" tall>/", "< height≡ tiny& 2' tall>/", "< height≡ average>/", "< height≡ giant& 9' tall>/", "< height≡ gargiantuan& 20' tall>/"]
  statPenisSize = ["", "< penis≡ micropenis>/", "< penis≡ small>/", "< penis≡ average>/", "< penis≡ massive& thick>/", "< penis≡ arm-sized>/", "< penis≡ leg-sized& gargantuon>/"]
  statBreastSize = ["", "< breasts≡ flat-chested>/", "< beasts≡ small>/", "< breasts≡ average>/", "< breasts≡ voluptuous>/", "< breasts≡ unwieldy& massive>/"]
  statAssSize = ["", "< ass≡ flat>/", "< ass≡ tight>/", "< ass≡ round>/", "< ass≡ large& curvy>/", "< ass≡ massive& bulbous>/"]  
  //this reformats the cached Note++ text into an array of 
  //objects ready to be injected into the context later
  state.statNotes = []
  for(i = 0; i < statNotes.length; i++){
    tempName = statNotes[i][1]
    tempStatNote = [statNotes[i][1], statNotes[i][0]]
    state.statNotes.push(tempStatNote)
    tempNote = `[ ${tempName} summary:${statDemonic[statValue("demonic")]}${statAngelic[statValue("angelic")]}${statFeline[statValue("feline")]}${statCanine[statValue("canine")]}${statLupine[statValue("lupine")]}${statVulpine[statValue("vulpine")]}${statEquine[statValue("equine")]}${statMasculinity[statValue("masculinity")]}${statFemininty[statValue("femininity")]}${statCharisma[statValue("charisma")]}${statConstitution[statValue("constitution")]}${statCorruption[statValue("corruption")]}${statLust[statValue("lust")]}${statSelfishness[statValue("selfishness")]}]
[ ${tempName} body:${statHeight[statValue("height")]}${statStrength[statValue("strength")]}${statDexterity[statValue("dexterity")]}${statFitness[statValue("fitness")]}${statAttractiveness[statValue("attractiveness")]}${statBreastSize[statValue("breast size")]}${statAssSize[statValue("ass size")]}${statPenisSize[statValue("penis size")]}]
[ ${tempName} mental:${statIntelligence[statValue("intelligence")]}${statWisdom[statValue("wisdom")]}${statWillpower[statValue("willpower")]}${statFear[statValue("fear")]}${statSenseOfSelf[statValue("sense of self")]}${statStability[statValue("stability")]}${statConfidence[statValue("confidence")]}]
[ ${tempName} traits:${statSadism[statValue("sadism")]}${statMasochism[statValue("masochism")]}${statKinkiness[statValue("kinkiness")]}${statPainSensitivity[statValue("pain sensitivity")]}${statPleasureSensitivity[statValue("pleasure sensitivity")]}${statElasticity[statValue("elasticity")]}]`
    tempNote = tempNote.replace(/\>\/\]/g, ">.]")
    tempNote = tempNote.replace(`[ ${tempName} summary:]\n`, "")
    tempNote = tempNote.replace(`[ ${tempName} body:]\n`, "")
    tempNote = tempNote.replace(`[ ${tempName} mental:]\n`, "")
    tempNote = tempNote.replace(`[ ${tempName} traits:]`, "")
    tempNote = tempNote.replace(/\n(?!.)/g, "")
    tempObject = {note: tempNote, line: 3}
    if(tempNote){
      state.notes.push(tempObject)
    }
  }
  for(i = 0; i < unformattedNotes.length; i++){
    noteRecordCheck(unformattedNotes)
    if(/\{\d*\+?\d*[\s-,\.]?\d+:\s+\}\n?/i.test(unformattedNotes[i][0])){
      unformattedNotes[i][6] = ""
    }
    tempNote = unformattedNotes[i][6]
    noteRecorder(unformattedNotes)
  }
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
  for(i = 0; i < messageNotes.length; i++){
    noteRecordCheck(messageNotes)
    if(/\{\d*\+?\d*m:\s+\}\n?/i.test(messageNotes[i][0])){
      messageNotes[i][6] = ""
    }
    noteRecorderSpecial(messageNotes, "notesM")
  }
  for(i = 0; i < displayNotes.length; i++){
    noteRecordCheck(displayNotes)
    noteRecorderDisplay(displayNotes, "notesD")
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
          if(state.outputCount < state.notesRecord[ii].endBy && state.outputCount >= state.notesRecord[ii].beginAt && !state.notesRecord[ii].once){
            if(lines.length > (state.notes[i].line - 1)){
              lines[state.notes[i].line] += `\n${state.notes[i].note}`
            }
          } else if (state.notesRecord[ii].once){
            if (state.outputCount <= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 2) {
              state.notesRecord[ii].once = 1
            }
            if (state.outputCount >= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 1){
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
          if((state.outputCount - 1) < state.notesRecord[ii].endBy && (state.outputCount - 1) >= state.notesRecord[ii].beginAt && !state.notesRecord[ii].once){
            notesTextTemp += state.notesIO[i].note 
          } else if (state.notesRecord[ii].once){
            if ((state.outputCount - 1) <= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 2) {
              state.notesRecord[ii].once = 1
            }
            if ((state.outputCount - 1) >= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 1){
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
          if((state.outputCount - 1) < state.notesRecord[ii].endBy && (state.outputCount - 1) >= state.notesRecord[ii].beginAt && !state.notesRecord[ii].once){
            notesPrefixTemp += state.notesIP[i].note
          } else if (state.notesRecord[ii].once){
            if ((state.outputCount - 1) <= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 2) {
              state.notesRecord[ii].once = 1
            }
            if ((state.outputCount - 1) >= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 1){
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
          if((state.outputCount - 1) < state.notesRecord[ii].endBy && (state.outputCount - 1) >= state.notesRecord[ii].beginAt && !state.notesRecord[ii].once){
            notesSuffixTemp += state.notesIS[i].note
          } else if (state.notesRecord[ii].once){
            if ((state.outputCount - 1) <= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 2) {
              state.notesRecord[ii].once = 1
            }
            if ((state.outputCount - 1) >= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 1){
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
          if(state.outputCount < state.notesRecord[ii].endBy && state.outputCount >= state.notesRecord[ii].beginAt && !state.notesRecord[ii].once){
            notesTextTemp += state.notesOO[i].note 
          } else if (state.notesRecord[ii].once){
            if (state.outputCount <= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 2) {
              state.notesRecord[ii].once = 1
            }
            if (state.outputCount >= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 1){
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
          if(state.outputCount < state.notesRecord[ii].endBy && state.outputCount >= state.notesRecord[ii].beginAt && !state.notesRecord[ii].once){
            notesPrefixTemp += state.notesOP[i].note
          } else if (state.notesRecord[ii].once){
            if (state.outputCount <= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 2) {
              state.notesRecord[ii].once = 1
            }
            if (state.outputCount >= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 1){
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
          if(state.outputCount < state.notesRecord[ii].endBy && state.outputCount >= state.notesRecord[ii].beginAt && !state.notesRecord[ii].once){
            notesSuffixTemp += state.notesOS[i].note
          } else if (state.notesRecord[ii].once){
            if (state.outputCount <= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 2) {
              state.notesRecord[ii].once = 1
            }
            if (state.outputCount >= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 1){
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

function noteMessageInjector(){
  state.message = ""
  for (i = 0; i < state.notesM.length; i++){
    if (state.notesM[i].record){
      for (ii = 0; ii < state.notesRecord.length; ii++){
        if(state.notesM[i].record == state.notesRecord[ii].record){
          if(state.outputCount < state.notesRecord[ii].endBy && state.outputCount >= state.notesRecord[ii].beginAt && !state.notesRecord[ii].once){
            if(i === 0){
              state.message = state.notesM[i].note
            } else if (i > 0){
              state.message += `\n${state.notesM[i].note}`
            }
          } else if (state.notesRecord[ii].once){
            if (state.outputCount <= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 2) {
              state.notesRecord[ii].once = 1
            }
            if (state.outputCount >= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 1){
              state.notesRecord[ii].once = 2
              if(i === 0){
                state.message = state.notesM[i].note
              } else if (i > 0){
                state.message += `\n${state.notesM[i].note}`
              }
            }
          }
        }
      }
    } else if(i === 0){
      state.message = state.notesM[i].note
    } else if (i > 0){
      state.message += `\n${state.notesM[i].note}`
    }
  }
}

function noteDisplayInjector(){
  state.displayStats = []
  tempDisplay = {0:{},1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{}}
  for (i = 0; i < state.notesD.length; i++){
    tempDisplayLine = Number(state.notesD[i].line) ? Number(state.notesD[i].line) : 0
    if (state.notesD[i].record){
      for (ii = 0; ii < state.notesRecord.length; ii++){
        if(state.notesD[i].record == state.notesRecord[ii].record){
          if(state.outputCount < state.notesRecord[ii].endBy && state.outputCount >= state.notesRecord[ii].beginAt && !state.notesRecord[ii].once){
            if (tempDisplayLine === 0){
              tempDisplay[tempDisplayLine].key = state.notesD[i].key
            } else {
              tempDisplay[tempDisplayLine].key = `\n${state.notesD[i].key}`
            }
            tempDisplay[tempDisplayLine].value = state.notesD[i].value
            tempDisplay[tempDisplayLine].color = state.notesD[i].color ? state.notesD[i].color : ""
          } else if (state.notesRecord[ii].once){
            if (state.outputCount <= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 2) {
              state.notesRecord[ii].once = 1
            }
            if (state.outputCount >= state.notesRecord[ii].beginAt && state.notesRecord[ii].once == 1){
              state.notesRecord[ii].once = 2
              if (tempDisplayLine === 0){
                tempDisplay[tempDisplayLine].key = state.notesD[i].key
              } else {
                tempDisplay[tempDisplayLine].key = `\n${state.notesD[i].key}`
              }
              tempDisplay[tempDisplayLine].value = state.notesD[i].value
              tempDisplay[tempDisplayLine].color = state.notesD[i].color ? state.notesD[i].color : ""
            }
          }
        }
      }
    } else {
      if (tempDisplayLine === 0){
        tempDisplay[tempDisplayLine].key = state.notesD[i].key
      } else {
        tempDisplay[tempDisplayLine].key = `\n${state.notesD[i].key}`
      }
      tempDisplay[tempDisplayLine].value = state.notesD[i].value
      tempDisplay[tempDisplayLine].color = state.notesD[i].color ? state.notesD[i].color : ""
    }
  }
  var x
  for (x in tempDisplay){
    if (tempDisplay[x].key && tempDisplay[x].value){
      state.displayStats.push(tempDisplay[x])
    }
  }
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
//these functions allow keys detected in outputs to generate stat experience and modify stats
function statValueProgressor(statName){
  statReg = new RegExp(`${statName}:\\s?([1-5])`, "i")
  statText = state.statNotes[i][1].match(statReg) ? state.statNotes[i][1].match(statReg) : []
  return Number(statText[1]) ? Number(statText[1]) : 0
}
function statModifier(){
  statKeysArray = statExperience[iii][5].split(", ")
  statKeysString = statKeysArray.join("||")
  statCheckReg = new RegExp(statKeysString,"ig")
  statExperienceCurrent = Number(statExperience[iii][3])
  statExperienceNeeded = Number(statExperience[iii][4])
  if(statCheckReg.test(text)){
    statExperienceCurrent++
  }
  if(statExperienceCurrent >= statExperienceNeeded){
    statLevel = statValueProgressor(statExperience[iii][1])
    statExperienceProgressorReg = new RegExp(`${statExperience[iii][1]}[\\+-]\\sexperience:\\s?(\\d*)\\/\\d*`, "i")
    statExperienceProgressorArray = [...state.statNotes[i][1].match(statExperienceProgressorReg)]
    statExperienceProgressorNewNumber = statExperienceProgressorArray[0].replace(statExperienceProgressorArray[1], `0`)
    statReplacementEntry = statReplacementEntry.replace(statExperienceProgressorArray[0], statExperienceProgressorNewNumber)
    if(statExperience[iii][2] == "-"){
      if(statLevel > 1){
        statValueProgressorReg = new RegExp(`${statExperience[iii][1]}:\\s?([1-5])`, "i")
        statValueProgressorArray = [...state.statNotes[i][1].match(statValueProgressorReg)]
        statValueProgressorNewLevel = statValueProgressorArray[0].replace(statValueProgressorArray[1], `${(Number(statValueProgressorArray[1])-1)}`)
        statReplacementEntry = statReplacementEntry.replace(statValueProgressorArray[0], statValueProgressorNewLevel)
        if (statName.toLowerCase() == "you"){
          state.message = `Your ${statExperience[iii][1]} has decreased.`
        } else {
          state.message = `${statName}'s ${statExperience[iii][1]} has decreased.`
        }
      } else {
        if (statName.toLowerCase() == "you"){
          state.message = `Your ${statExperience[iii][1]} would have decreased, but is already at minimum level.`
        } else {
          state.message = `${statName}'s ${statExperience[iii][1]} would have decreased, but is already at minimum level.`
        }
      }
    } else if (statExperience[iii][2] == "+") {
      if(statLevel < 5){
        statValueProgressorReg = new RegExp(`${statExperience[iii][1]}:\\s?([1-5])`, "i")
        statValueProgressorArray = [...state.statNotes[i][1].match(statValueProgressorReg)]
        statValueProgressorNewLevel = statValueProgressorArray[0].replace(statValueProgressorArray[1], `${(Number(statValueProgressorArray[1])+1)}`)
        statReplacementEntry = statReplacementEntry.replace(statValueProgressorArray[0], statValueProgressorNewLevel)
        if (statName.toLowerCase() == "you"){
          state.message = `Your ${statExperience[iii][1]} has increased.`
        } else {
          state.message = `${statName}'s ${statExperience[iii][1]} has increased.`
        }
      } else {
        if (statName.toLowerCase() == "you"){
          state.message = `Your ${statExperience[iii][1]} would have increased, but is already at maximum level.`
        } else {
          state.message = `${statName}'s ${statExperience[iii][1]} would have increased, but is already at maximum level.`
        }
      }
    }
  } else {
    statExperienceProgressorReg = new RegExp(`${statExperience[iii][1]}[\\+-]\\sexperience:\\s?(\\d*)\\/\\d*`, "i")
    statExperienceProgressorArray = [...state.statNotes[i][1].match(statExperienceProgressorReg)]
    statExperienceProgressorNewNumber = statExperienceProgressorArray[0].replace(statExperienceProgressorArray[1], statExperienceCurrent)
    statReplacementEntry = statReplacementEntry.replace(statExperienceProgressorArray[0], statExperienceProgressorNewNumber)
  }
}
function statInjector (){
  statExperience = [...worldInfo[ii].entry.matchAll(/\n(.*)([\+-])\sexperience:\s?(\d*)\/(\d*),\s?(?:keys)?:?\s?(.*)/gi)]
  for(iii = 0; iii < statExperience.length; iii++){
    statModifier()
  }
}
function statProgressor(){
  for(i = 0; i < state.statNotes.length; i++){
    statName = state.statNotes[i][0]
    statNameReg = new RegExp(`${statName}\\sstats:`, "i")
    statReplacementEntry = state.statNotes[i][1]
    for (ii = 0; ii < worldInfo.length; ii++){
      if(statNameReg.test(worldInfo[ii].entry)){
        statInjector()
        worldInfo[ii].entry = worldInfo[ii].entry.replace(state.statNotes[i][1], statReplacementEntry)
      }
    }
  } 
}
