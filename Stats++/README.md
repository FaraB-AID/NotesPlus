## Stats++ Framework
This Notes++-based script allows for Stats notes that converts numeric stat sheets into backend catnip sheets. Usable for multiple characters at once; can be adjusted dynamically (though the script does not automatically do so, yet).

Stats++ is based on and includes Notes++. Some knowledge of Notes++ may be useful for using this script.

https://github.com/FaraB-AID/NotesPlus

To create a Stats note, place a Note formatted as follows anywhere a Note would normally be placed (memory, WI, {notes} WI, etc.):

```
{name stats: 
stat: #
stat: #
stat: #}
```
Importantly, the Stats note must be bracketed with `{}`. 

The first word inside those brackets, `name`, will be the name stats will be attributed to. The name can be an NPC name like `Jenny`, or can refer to the PC by using `you` or `I` (if you're playing first person).

`stats:` must always be included. This indicates to the script that the bracketed text is a Stats note.

Each `stat: #` should be replaced with the name of a valid stat and a number between 1-5. The `:` separating stat name and number must remain. Stats notes can have any number of stats, though it's recommended to use as few as needed to not overwhelm the AI with information. Stats don't need to be separated from eachother in the Note. Inlcude as few or as many linebreaks, spaces, commas, etc, in the Note as needed to make it readable and usable for you. The following format is harder to read than the first, but conveys the same information to the script:

```
{name stats:stat:#stat:#stat:#}
```

Here is a list of the stats the script recognizes, grouped by category. For best results, use no more than 3 stats from each category.

###### General Stats
Charisma – Constitution – Corruption – Lust – Selfishness
###### Body Stats
Strength – Dexterity – Height – Breast Size – Penis Size – Ass Size
###### Mental Stats
Intelligence – Wisdom – Willpower – Fear – Sense of Self – Stability – Confidence
###### Trait Stats
Sadism – Masochism – Pain Sensitivity – Pleasure Sensitivity – Elasticity

Here is a practical example of a Stats note:

```
{Queen Madras stats:
corruption: 4, lust: 4, selfishness: 5
breast size: 2
willpower: 5, confidence: 4
sadism: 5}
```
