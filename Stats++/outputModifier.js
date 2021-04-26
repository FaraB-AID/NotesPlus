//modifies output with Notes++ special output formats
noteOutputSpecial()

const modifier = (text) => {
  let modifiedText = text
  const lowered = text?.toLowerCase()
  
  statProgressor()
  
  return { text: modifiedText }
}

modifier(text)
