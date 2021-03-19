# Notes++
This script allows you to create custom blocks of text (notes) anywhere, and specify how they are formatted, where they will be inserted into the context, and how long they will last. This allows you to change how far back your memory and WI get placed (instead of them always defaulting to the end of the context). It allows you to split your memory and WI, where parts are placed in different locations; it allows you to create editor's notes (more on these later); it allows you to tie author's notes or editor's notes to WI, and optionally allows those notes to only persist for a set number of actions after the WI is first called.

**Notes++** also adds a single command, `/lmi` which when input shows you the last full context sent to the AI. This shows you the text injected by this script, as well as other text that is normally hidden, such as Author's notes, Memory, and WI. This lets you check to make sure all of your notes get formatted and injected as you expect they should.

## How to Install
The easiest way to install this script is to download the zip file, then upload that file in the scripts section of the edit/create screen of one of your scenarios. Scripts can currently only be added to your own scenarios, while you are editing or creating them.

You can also copy the text from `shared` to the `shared` tab of scripts, and so on for `inputModifier` and `contextModifier`. 

## How to Create a Note
Notes can be placed anywhere (prompt, input text, memory, author's note, WI), but must have the following pattern:

**Enclose notes with curly brackets** `{ }`

**Put a note code on the left side of the brackets**, constructed as such:

**An optional duration *#* gets placed first.** 

If included, the note will only be injected in the context while the action count is less than the action count where the note was first recorded plus the duration (so with a duration of 3, a note will be present for the current action and the next two actions). 

If the duration *#* is left out or 0, the note will get injected in the context indefinitely (so long as the note remains). For instance, a duration 0 note put in a WI will still stop getting injected once the WI stops getting loaded into the context (and thus its note stops being read). Notes with a duration *#* will *also* stop getting injected if the note is removed before their duration ends.

**Next place an optional format shorthand**, comprised of a few letters, indicating how the note will be formated. See the formats below.

**Next place a mandatory location *#*** that determines how many lines back in the context the note will be placed

If the location *#* is 0, the note will be injected directly after (in front of) the most recent user text. If the location *#* is 1 or more, the note will be injected directly behind *#* lines in the context.

**Finally place a mandatory colon `:`** to separate the note code from the text.

**Formats** (included in note codes, where *text* represents the main text of your note):

`{an#: text}` or `{#an#: text}` gets formatted then injected as `[Author's note: text]`

`{en#: text}` or `{#en#: text}` gets formatted then injected as `[Editor's note: text]`

`{ens#: text}` or `{#ens#: text}` gets formatted then injected as `[Editor's note: this scene:< text>.]`

If no format is included, the note will be left unformatted.

`{#: text}` or `{#-#: text}` does not get formatted, then gets injected as `text`


**Additional info:**

For unformatted notes with a duration, separate the duration *#* and the location *#* with a `-`. 

If *text* is empty or only spaces, the note will be removed from the context but not injected back in (keeping blank notes from taking up characters and throwing off the AI).

Notes with location *#* > 0 will only be injected if *#* or more lines of text exist for them to be placed behind.

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
{3-3: [ Fluffles is an evil kitten who lurks around the tower.]}
```

**Author's Note**

`{an4: scene: fantasy, wizard, tower; genre: murder mystery}`

**WI**
```
Keys: tower, kitten, fluffles
Entry:
Fluffles is actually a literal demon pretending to be a cat. Fluffles has secretly killed Master Bell.
{2ens0: Fluffles will leap from the shadows and attack you}
```

**Result / Context / LMI -- Action Count: 2**
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

**Result / Context / LMI -- Action Count: 3**
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
The shadows rustle menacingly. You turn around, but are too late. Fluffles leaps at you!
```

**Result / Context / LMI -- Action Count: 4**
```
Fluffles is actually a literal demon pretending to be a cat. Fluffles has secretly killed Master Bell.
You and Master Bell have lived in the tower alone for nearly a decade. 
However, last week, Master Bell brought home a kitten named Fluffles.
You are Gordita, a wizard's apprentice.
[Author's note: scene: fantasy, wizard, tower; genre: murder mystery]
You are an animate taco, who flies around on clouds of cheese puffs.
Your wizard, Master Bell, has gone missing from the tower of Tel Nacho.
[Author's note: this is a story about cheese and betrayal.]
You must go on a quest to rescue Master Bell.
[Editor's note: describe the tower layout]
You cautiously look around the tower. 
The shadows rustle menacingly. You turn around, but are too late. Fluffles leaps at you!
You blast Fluffles away from you with the power of cheesy goodness.
```

## Editor's Notes
Editor's notes are basically super focused Author's notes that can be used to narrowly focus the AI's attention. For a more detailed rundown on how to use them, see the google doc about them here:
https://docs.google.com/document/d/12HDSN4wm9hMF4nRGWtkuT_RUkwx2Gqr2qhNSOORbSMk/edit?usp=sharing
