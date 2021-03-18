# Notes++
This script allows you to create custom blocks of text (notes) anywhere, and specify both how they are formatted and where they will be inserted into the context. This allows you to change how far back your memory and WI get placed (instead of them always defaulting to the end of the context). It allows you to split your memory and WI, where parts are placed in different locations; it allows you to create editor's notes (more on these later); it allows you to tie author's notes or editor's notes to WI.

## How to Create a Note
Notes can be placed anywhere (input text, memory, author's note, WI), but always follow the following pattern:

Notes must be enclosed with curly brackets `{ }`

A format code is then placed directly inside the brackets, followed by a number that indicated how many lines back in the context the note will be placed, and a colon. Here are the currently available format codes and the formatting they produce (where *text* represents where the main text of your note will be placed):
`an#:` produces **[Author's note:***text*, `en` (editor's note formatting), `ens` (editor's note formatting - "this scene" variant). If no format code is included, the note will be left unformatted.


