export type Message = { text: string, error: boolean }

export type Pitch = string
export const PITCHES: Pitch[] = [
    'Concert',
    'Instrument'
]

// note numbers from C to B for chromatic scale
export const CHROMATIC: number[] = Array.from(Array(12).keys())
// note numbers from C to B for diatonic scale
export const DIATONIC: number[] = [1, 3, 5, 6, 8, 10, 11]
// note numbers from C to B for pentatonic scale
export const PENTATONIC: number[] = [1, 3, 5, 8, 10]

// The basic note values and their depending on whether the key signature has sharp, flat, or no accidentals
export type BaseNote = { value: number, naturalName?: string, flatName?: string, sharpName?: string }

// build the entire keyboard
function generateBaseNotes(): BaseNote[] {
    let notes: BaseNote[] = []
    const noteBaseNames: BaseNote[] = [
        { value: 0, naturalName: 'C'},
        { value: 1, flatName: 'Db', sharpName: 'C#' },
        { value: 2, naturalName: 'D'},
        { value: 3, flatName: 'Eb', sharpName: 'D#' },
        { value: 4, naturalName: 'E'},
        { value: 5, naturalName: 'F', sharpName: 'E#' },
        { value: 6, flatName: 'Gb', sharpName: 'F#' },
        { value: 7, naturalName: 'G'}, 
        { value: 8, flatName: 'Ab', sharpName: 'G#' },
        { value: 9, naturalName: 'A'},
        { value: 10, flatName: 'Bb', sharpName: 'A#' },
        { value: 11, naturalName: 'B', flatName: 'Cb'},
    ]
    for (let octave = 1; octave < 8; octave++) {
        for (let i = 0; i < 12; i++) {
            const thisNote = noteBaseNames[i]
            // add the octave to each of the possible note names
            const note: BaseNote = { value: i + (octave - 1) * 12 }
            if (thisNote.naturalName != undefined)
                note.naturalName = `${thisNote.naturalName}/${octave}`
            if (thisNote.sharpName != undefined)
                note.sharpName = `${thisNote.sharpName}/${octave}`
            // sepcial handling for note 11, when flatted
            if (i != 11) {
                if (thisNote.flatName != undefined)
                    note.flatName = `${thisNote.flatName}/${octave}`
            } else {
                if (thisNote.flatName != undefined)
                    note.flatName = `${thisNote.flatName}/${octave+1}`
            }
            notes.push(note)
        }
    }
    return notes
}

// The note names for the entire keyboard
export const KEYBOARD: BaseNote[] = generateBaseNotes()

// a key either has flats, sharps, or no accidentals
export enum ACCIDENTAL {
    'none',
    'flat',
    'sharp'
}

// a minor key may be natural, harmonic, or melodic
export enum MINORTYPE {
    'natural',
    'harmonic',
    'melodic'
}

// the key signature has a name, accidental, a list of ascending and descending tones, a root key name (for minor keys), and accidentals
// there are 7 accidentals ordered from C to B
export type KeySignature = { name: string, keyAccidental: ACCIDENTAL, ascendingValues: number[], descendingValues: number[], rootKeyName: string, accidentals: string }

// each key signature has a scale type (major or one of the minors) which starts on one of the nominal tones
function generateKeySignature(name: string, startNominal: number, scaleType: string, rootKeyName: string, keyAccidental: ACCIDENTAL, accidentals: string): KeySignature {
    const key: KeySignature = {
        name: name,
        keyAccidental: keyAccidental,
        ascendingValues: [],
        descendingValues: [],
        rootKeyName: rootKeyName,
        accidentals: accidentals
    };
    const majorAscendingSequence: number[] = [0, 2, 4, 5, 7, 9, 11];
    const majorDescendingSequence: number[] = [0, 2, 4, 5, 7, 9, 11];
    const naturalAscendingMinorSequence: number[] = [0, 2, 3, 5, 7, 8, 10];
    const naturalDescendingMinorSequence: number[] = [0, 2, 3, 5, 7, 8, 10];
    const harmonicAscendingMinorSequence: number[] = [0, 2, 3, 5, 7, 8, 11];
    const harmonicDescendingMinorSequence: number[] = [0, 2, 3, 5, 7, 8, 11];
    const melodicAscendingMinorSequence: number[] = [0, 2, 3, 5, 7, 9, 11];
    const melodicDescendingMinorSequence: number[] = naturalDescendingMinorSequence;
    switch (scaleType) {
        case 'major':
            key.ascendingValues = majorAscendingSequence.map((v) => (v + startNominal));
            key.descendingValues = majorDescendingSequence.map((v) => (v + startNominal));
            break;
        case 'naturalminor':
            key.ascendingValues = naturalAscendingMinorSequence.map((v) => (v + startNominal));
            key.descendingValues = naturalDescendingMinorSequence.map((v) => (v + startNominal));
            break;
        case 'harmonicminor':
            key.ascendingValues = harmonicAscendingMinorSequence.map((v) => (v + startNominal));
            key.descendingValues = harmonicDescendingMinorSequence.map((v) => (v + startNominal));
            break;
        case 'melodicminor':
            key.ascendingValues = melodicAscendingMinorSequence.map((v) => (v + startNominal));
            key.descendingValues = melodicDescendingMinorSequence.map((v) => (v + startNominal));
            break;
    }

    return key;
}

// generate all of the key signatures 
function generateKeySignatures() {
    const keys: KeySignature[] = []

    // circle of fifths
    keys.push(
        generateKeySignature('C', 0, 'major',  'C', ACCIDENTAL.none, 'nnnnnnn'),
        generateKeySignature('a natural', 9, 'naturalminor', 'C', ACCIDENTAL.none, 'nnnnnnn'),
        generateKeySignature('a harmonic', 9, 'harmonicminor', 'C', ACCIDENTAL.none, 'nnnnnnn'),
        generateKeySignature('a melodic', 9, 'melodicminor', 'C', ACCIDENTAL.none, 'nnnnnnn'),
        generateKeySignature('G', 7, 'major', 'G', ACCIDENTAL.sharp, 'nnn#nnn'), // F#
        generateKeySignature('e natural', 4, 'naturalminor', 'G', ACCIDENTAL.sharp, 'nnn#nnn'),
        generateKeySignature('e harmonic', 4, 'harmonicminor', 'G', ACCIDENTAL.sharp, 'nnn#nnn'),
        generateKeySignature('e melodic', 4, 'melodicminor', 'G', ACCIDENTAL.sharp, 'nnn#nnn'),
        generateKeySignature('D', 2, 'naturalminor', 'D', ACCIDENTAL.sharp, '#nn#nnn'), // F# C#
        generateKeySignature('b natural', 11, 'naturalminor', 'D', ACCIDENTAL.sharp, '#nn#nnn'),
        generateKeySignature('b harmonic', 11, 'harmonicminor', 'D', ACCIDENTAL.sharp, '#nn#nnn'),
        generateKeySignature('b melodic', 11, 'melodicminor', 'D', ACCIDENTAL.sharp, '#nn#nnn'),
        generateKeySignature('A', 9, 'major', 'A', ACCIDENTAL.sharp, '#nn##nn'), // F# C# G#
        generateKeySignature('f♯ natural', 6, 'naturalminor', 'A', ACCIDENTAL.sharp, '#nn##nn'),
        generateKeySignature('f♯ harmonic', 6, 'harmonicminor', 'A', ACCIDENTAL.sharp, '#nn##nn'),
        generateKeySignature('f♯ melodic', 6, 'melodicminor', 'A', ACCIDENTAL.sharp, '#nn##nn'),
        generateKeySignature('E', 4, 'major', 'E', ACCIDENTAL.sharp, '##n##nn'), // F# C# G# D#
        generateKeySignature('c♯ natural', 1, 'naturalminor', 'E', ACCIDENTAL.sharp, '##n##nn'), 
        generateKeySignature('c♯ harmonic', 1, 'harmonicminor', 'E', ACCIDENTAL.sharp, '##n##nn'), 
        generateKeySignature('c♯ melodic', 1, 'melodicminor', 'E', ACCIDENTAL.sharp, '##n##nn'), 
        generateKeySignature('B', 11, 'major', 'B', ACCIDENTAL.sharp, '##n###n'), // F# C# G# D# A#
        generateKeySignature('g♯ natural', 8, 'naturalminor', 'B', ACCIDENTAL.sharp, '##n###n'),
        generateKeySignature('g♯ harmonic', 8, 'harmonicminor', 'B', ACCIDENTAL.sharp, '##n###n'),
        generateKeySignature('g♯ melodic', 8, 'melodicminor', 'B', ACCIDENTAL.sharp, '##n###n'),
        generateKeySignature('F♯', 6, 'major', 'F#', ACCIDENTAL.sharp, '######n'), // F# C# G# D# A# E#
        generateKeySignature('d♯ natural', 3, 'naturalminor', 'F#', ACCIDENTAL.sharp, '######n'),
        generateKeySignature('d♯ harmonic', 3, 'harmonicminor', 'F#', ACCIDENTAL.sharp, '######n'),
        generateKeySignature('d♯ melodic', 3, 'melodicminor', 'F#', ACCIDENTAL.sharp, '######n'),
        generateKeySignature('G♭', 6, 'major', 'Gb', ACCIDENTAL.flat, 'bbbnbbb'), // Bb Eb Ab, D6, Gb, Cb
        generateKeySignature('e♭ natural', 3, 'naturalminor', 'Gb', ACCIDENTAL.flat, 'bbbnbbb'),
        generateKeySignature('e♭ harmonic', 3, 'harmonicminor', 'Gb', ACCIDENTAL.flat, 'bbbnbbb'),
        generateKeySignature('e♭ melodic', 3, 'melodicminor', 'Gb', ACCIDENTAL.flat, 'bbbnbbb'),
        generateKeySignature('D♭', 1, 'major', 'Db', ACCIDENTAL.flat, 'nbbnbbb'), // Bb, Eb, Ab, D6, Gb
        generateKeySignature('b♭ natural', 10, 'naturalminor', 'Db', ACCIDENTAL.flat, 'nbbnbbb'),
        generateKeySignature('b♭ harmonic', 10, 'harmonicminor', 'Db', ACCIDENTAL.flat, 'nbbnbbb'),
        generateKeySignature('b♭ melodic', 10, 'melodicminor', 'Db', ACCIDENTAL.flat, 'nbbnbbb'),
        generateKeySignature('A♭', 8, 'major', 'Ab', ACCIDENTAL.flat, 'nbbnnbb'), // Bb, Eb, Ab, Db
        generateKeySignature('f natural', 5, 'naturalminor', 'Ab', ACCIDENTAL.flat, 'nbbnnbb'),
        generateKeySignature('f harmonic', 5, 'harmonicminor', 'Ab', ACCIDENTAL.flat, 'nbbnnbb'),
        generateKeySignature('f melodic', 5, 'melodicminor', 'Ab', ACCIDENTAL.flat, 'nbbnnbb'),
        generateKeySignature('E♭', 3, 'major', 'Eb', ACCIDENTAL.flat, 'nnbnnbb'),  // Bb Eb Ab
        generateKeySignature('c natural', 0, 'naturalminor', 'Eb', ACCIDENTAL.flat, 'nnbnnbb'),
        generateKeySignature('c harmonic', 0, 'harmonicminor', 'Eb', ACCIDENTAL.flat, 'nnbnnbb'),
        generateKeySignature('c melodic', 0, 'melodicminor', 'Eb', ACCIDENTAL.flat, 'nnbnnbb'),
        generateKeySignature('B♭', 10, 'major', 'Bb', ACCIDENTAL.flat, 'nnbnnnb'), // Bb Eb
        generateKeySignature('g natural', 7, 'naturalminor', 'Bb', ACCIDENTAL.flat, 'nnbnnnb'),
        generateKeySignature('g harmonic', 7, 'harmonicminor', 'Bb', ACCIDENTAL.flat, 'nnbnnnb'),
        generateKeySignature('g melodic', 7, 'melodicminor', 'Bb', ACCIDENTAL.flat, 'nnbnnnb'),
        generateKeySignature('F', 5, 'major', 'F', ACCIDENTAL.flat, 'nnnnnnb'), // Bb
        generateKeySignature('d natural', 2, 'naturalminor', 'F', ACCIDENTAL.flat, 'nnnnnnb'), 
        generateKeySignature('d harmonic', 2, 'harmonicminor', 'F', ACCIDENTAL.flat, 'nnnnnnb'), 
        generateKeySignature('d melodic', 2, 'melodicminor', 'F', ACCIDENTAL.flat, 'nnnnnnb'), 
    )
    return keys;
}

// the entire set of key signatures
export const KEYSIGNATURES: KeySignature[] = generateKeySignatures();

// each mode starts on a note relative to the keys nominal
export type Mode = {
    name: string,
    nominal: number,
}
export const MODES: Mode[] = [
    { name: 'Ionian', nominal: 0 },
    { name: 'Dorian', nominal: 2 },
    { name: 'Phrygian', nominal: 4 },
    { name: 'Lydian', nominal: 5 },
    { name: 'Mixolydian', nominal: 7 },
    { name: 'Aeolian (natural minor)', nominal: 9 },
    { name: 'Locrian', nominal: 11 },
]

// each instrument has a name, its lowest and highest notes, a pitch, a clef, and a octave shift
export type Instrument = {
    name: string,
    lowNote: number,
    highNote: number,
    instrumentPitch: KeySignature,
    clef: { name: string, annotation?: string }
    octaveShift: number,
}

// the list of instruments supported
export const INSTRUMENTS: Instrument[] = [
    {
        name: 'Concert Flute',
        lowNote: 36, // C4
        highNote: 72, //C7
        instrumentPitch: KEYSIGNATURES.find((k) => k.name == 'C') as KeySignature,
        clef: { name: 'treble'},
        octaveShift: 1
    },
    {
        name: 'Bassoon',
        lowNote: 10, // Bb1
        highNote: 51, // Eb5
        instrumentPitch: KEYSIGNATURES.find((k) => k.name == 'C') as KeySignature,
        clef: { name: 'base'},
        octaveShift: 1
    },
    {
        name: 'Violin',
        lowNote: 31, // G3
        highNote: 83, // B7
        instrumentPitch: KEYSIGNATURES.find((k) => k.name == 'C') as KeySignature,
        clef: { name: 'treble'},
        octaveShift: 1
    },
    {
        name: 'Soprano Recorder',
        lowNote: 36, // C4 8va
        highNote: 62, // D6 8va
        instrumentPitch: KEYSIGNATURES.find((k) => k.name == 'C') as KeySignature,
        clef: { name: 'treble', annotation: '8va' },
        octaveShift: 1
    },
    {
        name: 'Alto Recorder',
        lowNote: 41, // F4
        highNote: 67, // G6
        instrumentPitch: KEYSIGNATURES.find((k) => k.name == 'C') as KeySignature,
        clef: { name: 'treble' },
        octaveShift: 0
    },
    {
        name: 'Tenor Recorder',
        lowNote: 36, // C4
        highNote: 62, // D6
        instrumentPitch: KEYSIGNATURES.find((k) => k.name == 'C') as KeySignature,
        clef: { name: 'treble' },
        octaveShift: 0
    },
    {
        name: 'Bass Recorder',
        lowNote: 17, // F3 8vb
        highNote: 43, // G5
        instrumentPitch: KEYSIGNATURES.find((k) => k.name == 'C') as KeySignature,
        clef: { name: 'bass', annotation: '8vb' },
        octaveShift: -1
    },
]

// The allowed scales and progressions
export type Scale = {name: string, nominalSequence: number[]}

export const SCALES: Scale[] = [
    {name: 'Diatonic', nominalSequence: [0, 3, 4, 5, 7, 9, 11]},
    {name: 'Pentatonic', nominalSequence: [0, 2, 4, 7, 9]},
    {name: 'Thirds', nominalSequence: [0, 4, 7, 11]},
    {name: 'Fourths', nominalSequence: [0, 5]},
    {name: 'Fifths', nominalSequence: [0, 7]},
    {name: 'Chromatic', nominalSequence: [0,1,2,3,4,5,6,7,8,9,11]}
]

// each scale can be displayed as ascending, descending, or ascending and descending
export type DisplayOption = string
export const DISPLAYOPTIONS: DisplayOption[] = [
    'Ascending',
    'Descending',
    'Ascending and Descending',
]

