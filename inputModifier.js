//implements Notes++ commands
notesCommands ()

//modifies input with Notes++ special input formats
noteInputSpecial()

const modifier = (text) => {
  let modifiedText = text
  const lowered = text?.toLowerCase()

  return { text: modifiedText }
}

modifier(text)
