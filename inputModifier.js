const modifier = (text) => {
  let modifiedText = text
  const lowered = text.toLowerCase()

  //this implements a command to display the last model input
  if(/\n? ?(> You |> You say "|)(\/lmi)/i.test(text)) {
    modifiedText = "\n" + state.lmi
    state.lmiToggle = true
  }

  return { text: modifiedText }
}

modifier(text)
