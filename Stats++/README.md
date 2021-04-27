# Stats++
Stats++ is a script for creating RPG-style character sheets with numeric values. These character sheets then get converted into Cat<nip> 3 character sheets and injected into the context 3 lines back (where Author's Notes go by default). Advanced featured of the script also allow you to define conditions by which character stats can increase or decrease through gameplay.

This script uses Notes++ as a codebase, and so contains all Notes++ features. Technicially, character sheets are a highly specialized Note format. Therefore, Stats++ sheets are usable for multiple characters at once, and will never have their raw text appear in the context.

Stats++ is based on and includes Notes++. Some knowledge of Notes++ may be useful for using this script.

https://github.com/FaraB-AID/NotesPlus/tree/main/Notes%2B%2B


## Stat Sheets
To create a Stat Sheet, format a block of text as described below. The text must be either in memory if you want the stat sheet permanently included in context, or in a WI if you want the stat sheet to only be included in context when that WI would be.  As a second option for a permanent Stat Sheet, put the sheet in a WI with `{notes}` as its key. It will operate in the same way as a Stat Sheet placed in memory.   

**Stat Sheet Formatting:**
```
{name stats: 
stat: #
stat: #
stat: #}
```
➤ Stat Sheets must be encapsulated (bracketed) with `{}`. 

➤ The first term inside the Stat Sheet after the bracket must be the *name* of the character the sheet is for. This can be multiple words. The *name* determines who the stats are attributed to, and can be for an NPC, like `Queen Madras`, or can refer to the PC by using `you` or `I` (if you're playing first person).

➤ `stats:` must always be included after the *name*, verbatim. This indicates to the script that the bracketed text is a Stat Sheet.

➤ For each instance of `stat: #`, *stat* should be replaced with the name of a valid stat and *#* with a number between 1-5. The *:* separating stat name and number must remain. Stat Sheets can have any number of stats, though it's recommended to use as few as needed. 

➤ Stats don't need to each be on their own line. They can be formatted in a variety of ways, and in fact don't need to be separated at all. Linebreaks, spaces, commas, etc, can be included in the Stat Sheet to separate stats to make it more human-readable, however. The following format is harder to read than the first, but conveys the same information to the script:

```
{name stats:stat:#stat:#stat:#}
```

Here is a list of the stats the script recognizes, grouped by category. See details on their Cat<nip> conversions at the end of the readme. For best results, use 3 or fewer stats from each category.

###### General Stats
Demonic - Angelic – Feline – Canine – Lupine – Vulpine – Equine – Masculinity – Femininity –  Corruption – Lust
###### Body Stats
Strength – Dexterity – Constitution – Fitness – Attractiveness – Height – Breast Size – Penis Size – Ass Size
###### Mental Stats
Intelligence – Wisdom – Charsima – Willpower – Fear – Sense of Self – Stability – Confidence – Selfishness
###### Trait Stats
Sadism – Masochism – Kinkiness – Pain Sensitivity – Pleasure Sensitivity – Elasticity

Here is a practical example of a Stats note:

```
{Queen Madras stats:
corruption: 4, lust: 4, selfishness: 5
breast size: 2
willpower: 5, confidence: 4
sadism: 5}
```

## Automatic Stat Progression
Stats++ can also be used to automatically increase or decrease stats based on an experience system. Experience is gained when the output contains terms from a user-defined list of keys.

**Automatic Stat Progression only works if the Stat Sheet is in a WI.** This is because Memory is not editable by scripts. If you want to set up a progression-enabled permanent Stat Sheet that functions like it would in Memory, create a WI with `{notes}` as the key. The script will always read Stat Sheets from it.  

To set up stat progression, include one or more line formatted as such in your Stats Sheet:

```stat+|- experience: #/#, keys: key, key, key```

➤ For each progression-enabled stat, it must start on its own new line.

➤ The first word(s) on the new line, *stat*, should be the name of the stat. Such as `strength`, `lust`, or `sense of self`.

➤ Immediately after the *stat* should be a `+` or `-`, indicating whether the stat will increase or decrease when experience fills.

➤ `experience:` must be included verbatim.

➤ `#/#` must be two integers separated by a `/`. The first `#`, current experience, should be less than the second `#`, experience required, such as: `0/5` or `4/12`. 

➤ When current experience matches or exceeds required experience, current experience will reset to 0 and the associated stat will accordingly increase or decrease. Stats cannot increase above 5 or decrease below 1.

➤ Each progression-enabled stat requires some number of keys. These are terms separated from `#/#` and one-another by commas. They can be multiple words. One experience point is gained whenever the script matches one or more keys (case insensitve) in the text of an output.

➤ The `keys:` term itself is optional. Keys can directly follow `#/#`, or have the `keys:` term intervening (for the sake of readability). 


**Example full Stat Sheet with progression:**

```{Queen Madras stats:
corruption: 4, lust: 4, selfishness: 5
breast size: 2
willpower: 5, confidence: 4
sadism: 5
lust+ experience: 0/5, keys: desire, lust, dripping wet, need you
willpower- experience: 4/10, doubt, fear, hesitate, reconsider, flinch, stumble
breast size+ experience: 0/1, enlargus breasticus}
```

## Stat Details
Stats get converted into a Cat<nip> sheet by including terms in that sheet which correspond to the stat's numeric value. Stats from different category get put on different Cat<nip> lines. Terms for each stat are presented from lowest (1) to highest (5).
  
###### General Stats
**[ name summary:< stat term>/< stat term>/< stat term>.]**

**Demonic:** \[blank\] – demon blooded – half demon – demon – archdemon

**Angelic:** \[blank\] – angel blooded – half angel – angel – archangel

**Feline:** \[blank\] – cat ears – feline features – neko – anthro cat

**Canine:** \[blank\] – dog ears – canine features – inu – anthro dog

**Lupine:** \[blank\] – wolf ears – lupine features – okami – anthro wolf

**Vulpine:** \[blank\] – fox ears – vulpine features – kitsune – anthro fox

**Equine:** \[blank\] – horse tail – equine features – uma – anthro horse

**Masculinity:** soft – androgynous – masculine – masculine& macho – hypermasculine

**Femininty:** butch – androgynous – feminine – high fem – hyperfeminine

**Corruption:** pure – chaste – modest – lecherous – debauched

**Lust:** celibate – chaste – normal sex drive – lustful – sex addict

###### Body Stats
**[ name body:< stat term>/< stat term>/< stat term>.]**

**Strength:** pathetically weak – weak – fit – brawny – incredibly brawny

**Dexterity:** complete klutz – uncoordinated – deft – nimble& graceful – impossibly nimble

**Constitution:** sickly& unwell – frail – healthy – robust – pinnacle of health

**Fitness:** horribly unfit – unfit – fit – well fit& shapely – paragon of fitness

**Attractiveness:** hideous – unattractive – average looking – hot& attractive – irresistibly attractive

**Height:** height≡ miniscule& 6\" tall – height≡ tiny& 2' tall – height≡ average – height≡ giant& 9' tall – height≡ gargiantuan& 20' tall

**Breast Size:** breasts≡ flat-chested – beasts≡ small – breasts≡ average – breasts≡ voluptuous – breasts≡ unwieldy& massive

**Penis Size:** penis≡ micropenis – penis≡ small – penis≡ average – penis≡ massive& thick – penis≡ arm-sized – penis≡ leg-sized& gargantuon

**Ass Size:** ass≡ flat – ass≡ tight – ass≡ round – ass≡ large& curvy – ass≡ massive& bulbous  

###### Mental Stats
**[ name mental:< stat term>/< stat term>/< stat term>.]**

**Intelligence:** vegetative – stupid – clever – very smart – genius

**Wisdom:** irrational – clueless – rational – wise – nearly prescient

**Charisma:** tactless – boring – likable – charismatic – irresistible charm

**Willpower:** mindlessly obedient – pliant – willful – steadfast – unbreakable will

**Fear:** completely fearless – unafraid – trepidatious – fearful – terrified

**Sense of Self:** one with the world – indistinct – self-aware – narcicistic – solipsistic

**Stability:** shattered mind – disturbed – mentally stable – serene – transcendently calm

**Confidence:** nervous wreck – timid – self-assured – confident – absolutely confident

**Selfishness:** selfless – generous – self-interested – selfish – egoist& egotistical

###### Trait Stats
**[ name traits:< stat term>/< stat term>/< stat term>.]**

**Sadism:** sadism≡ gentle – sadism≡ demanding – sadism≡ sadistic – sadism≡ cruel – sadism≡ extreme& cruel

**Masochism:** masochism≡ pain averse – masochism≡ demure – masochism≡ masochistic – masochism≡ painslut – masochism≡ extreme& painslut

**Kinkiness:** kinkiness≡ vanilla – kinkiness≡ intrigued – kinkiness≡ kinky – kinkiness≡ fetishist – kinkiness≡ extreme kinkster

**Pain Sensitivity:** pain≡ numbed – pain≡ dulled – pain≡ receptive – pain≡ sensitive – pain≡ hypersensitive

**Pleasure Sensitivity:** pleasure≡ numbed – pleasure≡ dulled – pleasure≡ receptive – pleasure≡ sensitive – pleasure≡ hypersensitive

**Elasticity:** elasticity≡ rigid – elasticity≡ taut – elasticity≡ malleable – elasticity≡ very stretchy – elasticity≡ completely elastic

