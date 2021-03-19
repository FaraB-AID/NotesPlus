# Notes++
This script allows you to create custom blocks of text (notes) anywhere, and specify both how they are formatted and where they will be inserted into the context. This allows you to change how far back your memory and WI get placed (instead of them always defaulting to the end of the context). It allows you to split your memory and WI, where parts are placed in different locations; it allows you to create editor's notes (more on these later); it allows you to tie author's notes or editor's notes to WI.

**Notes++** also adds a single command, `/lmi` which when input shows you the last full context sent to the AI. This shows you the text injected by this script, as well as other text that is normally hidden, such as Author's notes, Memory, and WI. This lets you check to make sure all of your notes get formatted and injected as you expect they should.

## How to Install
The easiest way to install this script is to download the zip file, then upload that file in the scripts section of the edit/create screen of one of your scenarios. Scripts can currently only be added to your own scenarios, while you are editing or creating them.

You can also copy the text from `shared` to the `shared` tab of scripts, and so on for `inputModifier` and `contextModifier`. 

## How to Create a Note
Notes can be placed anywhere (prompt, input text, memory, author's note, WI), but always follow the following pattern:

Notes must be enclosed with curly brackets `{ }`

A format code is then placed directly inside the brackets, followed by a number that determines how many lines back in the context the note will be placed, and a colon. Here are the currently available format codes and the formatting they produce (where *text* represents where the main text of your note will be placed):

`{an#: text}` gets formatted then injected as `[Author's note: text]`

`{en#: text}` gets formatted then injected as `[Editor's note: text]`

`{ens#: text}` gets formatted then injected as `[Editor's note: this scene:< text>.]`

If no format code is included, the note will be left unformatted.

`{#: text}` does not get formatted, then gets injected as `text`


The *#* after the format code must be included. It can be any integer greater than or equal to 0. 

If the *#* is 0, the note will be injected directly after (in front of) the most recent user text.

If the *#* is 1 or more, the note will be injected directly behind *#* lines in the context.


Everything after the *:* and before the closing *}* is the *text*.

If *text* is empty or only spaces, the note will be removed from the context but not injected back in (keeping blank notes from taking up characters and throwing off the AI).

If multiple notes request injection at the same line, they will be injected by formatting code in the following order: `{an#: text}`, `{#: text}`, `{en#: text}`, `{ens#: text}`. If multiple notes with the same formatting are injected, they will be injected in the order they are encountered in the context (typically: WI, memory, prompt/previous inputs, A/N, input text).

## Example
The following are an example prompt, input text, memory, author's note, and WI, as well as the context they produce (which would be shown with /lmi).

**Prompt**
```
You are Gordita, a wizard's apprentice.
You are an animate taco, who flies around on clouds of cheese puffs.
Your wizard, Master Bell, has gone missing from the tower of Tel Nacho.
You must go on a quest to rescue Master Bell.
{an2: this is a story about cheese and betrayal.}
```

**Input Text**

`You cautiously look around the tower. {en1: describe the tower layout}`

**Memory**
```
You and Master Bell have lived in the tower alone for nearly a decade. 
However, last week, Master Bell brought home a kitten named Fluffles.
{3: [ Fluffles is an evil kitten who lurks around the tower.]}
```

**Author's Note**

`{an4: scene: fantasy, wizard, tower; genre: murder mystery}`

**WI**
```
Keys: tower, kitten, fluffles
Entry:
Fluffles is actually a literal demon pretending to be a cat. Fluffles has secretly killed Master Bell.
{ens0: Fluffles will leap from the shadows and attack you}
```

**Result / Context / LMI**
```
Fluffles is actually a literal demon pretending to be a cat. Fluffles has secretly killed Master Bell.
You and Master Bell have lived in the tower alone for nearly a decade. 
However, last week, Master Bell brought home a kitten named Fluffles.
You are Gordita, a wizard's apprentice.
[Author's note: scene: fantasy, wizard, tower; genre: murder mystery]
You are an animate taco, who flies around on clouds of cheese puffs.
[ Fluffles is an evil kitten who lurks around the tower.]
Your wizard, Master Bell, has gone missing from the tower of Tel Nacho.
[Author's note: this is a story about cheese and betrayal.]
You must go on a quest to rescue Master Bell.
[Editor's note: describe the tower layout]
You cautiously look around the tower. 
[Editor's note: this scene:< Fluffles will leap from the shadows and attack you>.]
```

## Editor's Notes
Editor's notes are basically super focused Author's notes that can be used to narrowly focus the AI's attention. For a more detailed rundown on how to use them, see the google doc about them here:
https://docs.google.com/document/d/12HDSN4wm9hMF4nRGWtkuT_RUkwx2Gqr2qhNSOORbSMk/edit?usp=sharing
