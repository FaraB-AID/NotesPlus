# Notes++
This script allows you to create custom blocks of text (notes) anywhere, and specify both how they are formatted and where they will be inserted into the context. This allows you to change how far back your memory and WI get placed (instead of them always defaulting to the end of the context). It allows you to split your memory and WI, where parts are placed in different locations; it allows you to create editor's notes (more on these later); it allows you to tie author's notes or editor's notes to WI.

**Note++** also adds a single command, `/lmi` which when submitted shows you the last full input sent to the AI (including the hidden text within your context). This lets you check to make sure all of your notes get formatted and injected as you expect they should.

## How to Create a Note
Notes can be placed anywhere (prompt, input text, memory, author's note, WI), but always follow the following pattern:

Notes must be enclosed with curly brackets `{ }`

A format code is then placed directly inside the brackets, followed by a number that determines how many lines back in the context the note will be placed, and a colon. Here are the currently available format codes and the formatting they produce (where *text* represents where the main text of your note will be placed):

`{an#: text}` gets formatted then injected as `[Author's note: text]`

`{en#: text}` gets formatted then injected as `[Editor's note: text]`

`{ens#: text}` gets formatted then injected as `[Editor's note:< text>.]`

If no format code is included, the note will be left unformatted.

`{#: text}` does not get formatted, then gets injected as `text`


The *#* after the format code must be included. It can be any integer greater than or equal to 0. 

If the *#* is 0, the note will be injected directly after (in front of) the most recent user text.

If the *#* is 1 or more, the note will be injected directly behind *#* lines in the context.


Everything after the *:* and before the closing *}* is the *text*.

If *text* is empty or only spaces, the note will be removed from the context but not injected back in (keeping blank notes from taking up characters and throwing off the AI).

## Example
The following are an example prompt, input text, memory, author's note, and WI, as well as the context they produce (which would be shown with /lmi).

**Prompt**

```You are Gordita, a wizard's apprentice.
You are an animate taco, who flies around on clouds of cheese puffs.
Your wizard, Master Bell, has gone missing from the tower of Tel Nacho.
You must go on a quest to rescue Master Bell.```






