export type Message = {text: string, error: boolean}

export type Pitch = string
export const PITCHES: Pitch[] = [
    'Concert',
    'Instrument'
]

// note numbers from C to B
export const CHROMATIC: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
// note numbers from C to B
export const DIATONIC: number[] = [1, 3, 5, 6, 8, 10, 11]
// note numbers from C to B
export const PENTATONIC: number[] = [1, 3, 5, 8, 10]

// list is the cicrle of fifths
export type Key = {name: string, start: number, flats?:number[], sharps?:number[]}
export const KEYS: Key[] = 
    [
        {name: 'C', start: 1},
        {name: 'a', start: 10},
        {name: 'G', start: 8, sharps: [6]}, // F
        {name: 'e', start: 5, sharps: [6]},
        {name: 'D', start: 3, sharps: [6, 1]}, // F C
        {name: 'b', start: 12, sharps: [6, 1]},
        {name: 'A', start: 10, sharps: [6, 1, 8]}, // F C G
        {name: 'f♯', start: 7, sharps: [6, 1, 8]},
        {name: 'E', start: 5, sharps: [6, 1, 8, 3]}, // F C G D
        {name: 'c♯', start: 2, sharps: [6, 1, 8, 3]},
        {name: 'B', start: 12, sharps: [6, 1, 8, 3, 10]}, // F C G D A
        {name: 'g♯', start: 9, sharps: [6, 1, 8, 3, 10]},
        {name: 'F♯', start: 7, sharps: [6, 1, 8, 3, 10, 5]}, // F C G D A E
        {name: 'd♯', start: 4, sharps: [6, 1, 8, 3, 10, 5]},
        {name: 'G♭', start: 7, flats: [12, 5, 10, 3, 8, 1]}, // B E A D G C
        {name: 'eb', start: 4, flats: [12, 5, 10, 3, 8, 1]},
        {name: 'D♭', start: 2, flats: [12, 5, 10, 3, 8]}, // B E A D G
        {name: 'b♭', start: 11, flats: [12, 5, 10, 3, 8]},
        {name: 'A♭', start: 9, flats: [12, 5, 10, 3]}, // B E A D
        {name: 'f', start: 6, flats: [12, 5, 10, 3]},
        {name: 'E♭', start: 4, flats: [12, 5, 10]}, // B E A
        {name: 'c', start: 1, flats: [12, 5, 10]},
        {name: 'B♭', start: 11, flats: [12, 5]}, // B E
        {name: 'g', start: 8, flats: [12, 5]},
        {name: 'F', start: 6, flats: [12]}, // B
        {name: 'd', start: 2, flats: [12]},  
]
export type Note = {
    name: string,
    value: number,
}
export const Notes: Note[] = [
    {name: 'B♯', value: 1},
    {name: 'C', value: 1},
    {name: 'C♯', value: 2},
    {name: 'D♭', value: 2},
    {name: 'D', value: 3},
    {name: 'D♯', value: 4},
    {name: 'E♭', value: 4},
    {name: 'E', value: 5},
    {name: 'F♭', value: 5},
    {name: 'E♯', value: 6},
    {name: 'F', value: 6},
    {name: 'F♯', value: 7},
    {name: 'G♭', value: 7},
    {name: 'G', value: 8},
    {name: 'G♯', value: 9},
    {name: 'A♭', value: 9},
    {name: 'A', value: 10},
    {name: 'A♯', value: 11},
    {name: 'B♭', value: 11},
    {name: 'B', value: 12},
    {name: 'C♭', value: 12},
]

export type Mode = {
    name: string,
    ascending: number[],
    descending?: number[],
}
export const MODES: Mode[] = [
    {name: 'Ionian', ascending: [1,3,5,6,8,10,12]},
    {name: 'Dorian', ascending: [3,5,6,8,10,12,13]},
    {name: 'Phrygian', ascending: [5,6,8,10,12,13,15]},
    {name: 'Lydian', ascending: [6,8,10,12,13,15,17]},
    {name: 'Mixolydian', ascending: [8,10,12,13,15,17,18]},
    {name: 'Aeolian (natural minor)', ascending: [10,12,13,15,17,18,20]},
    {name: 'Locrian', ascending: [12,13,15,17,18,20,22]},
    {name: 'Harmonic Minor', ascending: [1,3,4,6,8,9,12]},
    {name: 'Melodic Minor', ascending: [1,3,4,6,8,10,12], descending: [11,9,8,6,4,3,1]},
]

export type Instrument = {
    name: string,
    lowNote: {note: string, octave: number},
    highNote: {note: string, octave: number},
    pitch: Note['name']
}

export const INSTRUMENTS: Instrument[] = [
    {
        name: 'Soprano Recorder', 
        lowNote: {note: 'C', octave: 3},
        highNote: {note: 'C', octave: 6},
        pitch: 'C'
    },
    {name: 'Alto Recorder', 
        lowNote: {note: 'F', octave: 2},
        highNote: {note: 'F', octave: 5},
        pitch: 'C'
    },
]

export type Scale = string

export const SCALES:Scale[] = [
    'Diatonic',
    'Pentatonic',
    'Thirds',
    'Fourths',
    'Fifths',
    'Chromatic',
]

export type DisplayOption = string
export const DISPLAYOPTIONS: DisplayOption[] = [
    'Ascending',
    'Descending',
    'Ascending and Descending',
]

