import React, { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import { DisplayOption, DISPLAYOPTIONS, Instrument, INSTRUMENTS, Message, Mode, MODES, Pitch, PITCHES, Scale, SCALES } from '../types/types'
import { HEADER, SPACING } from './config-layout';

export interface BodyProps {
    setMessage: Function,
    setStatus: Function
}
export default function Body(props: BodyProps) {

    const [scale, setScale] = useState<Scale>(SCALES[0]);
    const [mode, setMode] = useState<Mode>(MODES[0]);
    const [instrument, setInstrument] = useState<Instrument>(INSTRUMENTS[0]);
    const [pitch, setPitch] = useState<Pitch>(PITCHES[0]);
    const [displayOption, setDisplayOption] = useState<DisplayOption>(DISPLAYOPTIONS[0]);
    // initialize all parameters
    useEffect(() => {
        props.setMessage({ error: false, text: 'Welcome to Instrument Notes' });
        UpdateStatus();
    })

    function UpdateStatus() {
        // this will update the display based on the current props values
        props.setStatus(`Instrument: ${instrument.name}, scale: ${scale}, mode: ${mode.name}, pitch: ${pitch}, display: ${displayOption}`);
    }

    function HandleInstrumentChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        const instName: string = event.target.value;
        const instrument: Instrument | undefined = INSTRUMENTS.find((i) => i.name == instName);
        if (instrument !== undefined) {
            setInstrument(instrument);
            UpdateStatus();
        } else {
            props.setMessage({ error: true, text: `instrument error - ${instName} not found` });
        }
    }

    function HandleScaleChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        const scaleName: string = event.target.value;
        const scale: Scale | undefined = SCALES.find((s) => s == scaleName);
        if (scale !== undefined) {
            setScale(scale);
            UpdateStatus();
        } else {
            props.setMessage({ error: true, text: `scale error - ${scaleName} not found` });
        }
    }

    function HandleModeChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        const modeName: string = event.target.value;
        const mode: Mode | undefined = MODES.find((m) => m.name == modeName);
        if (mode !== undefined) {
            setMode(mode);
            UpdateStatus();
        } else {
            props.setMessage({ error: true, text: `mode error - ${modeName} not found` });
        }
    }

    function HandlePitchChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        const pitchName: string = event.target.value;
        const pitch: Pitch | undefined = PITCHES.find((p) => p == pitchName);
        if (pitch !== undefined) {
            setPitch(pitch);
            UpdateStatus();
        } else {
            props.setMessage({ error: true, text: `pitch error - ${pitchName} not found` });
        }
    }

    function HandleDisplayChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        const displayName: string = event.target.value;
        const displayOption: DisplayOption | undefined = DISPLAYOPTIONS.find((d) => d == displayName);
        if (displayOption !== undefined) {
            setDisplayOption(displayOption);
            UpdateStatus();
        } else {
            props.setMessage({ error: true, text: `display error - ${displayName} not found` });
        }
    }

    return (
        <Box
            component='main'
            sx={{
                flexGrow: 1,
                minHeight: 1,
                display: 'flex',
                flexDirection: 'column',
                px: 2,
                py: `${HEADER.H_DESKTOP} + ${SPACING}px`
            }}
        >
            {/* layout 
            Select Instrument 
            Select Scale
            Select Mode
            Select Pitch
            Select Display Option
            Display Notes (clickable)
            Play selected notes
            */}
            <Grid container direction='row'>
                <Grid item>
                    {/* select instrument */}
                    <label htmlFor='instrument'>&nbsp;Instrument: </label>
                    <select
                        id='instrument'
                        value={instrument.name}
                        onChange={((event: React.ChangeEvent<HTMLSelectElement>) =>
                            HandleInstrumentChange(event))}
                    >
                        {INSTRUMENTS.map((i) => (
                            <option key={i.name} value={i.name}>{i.name}</option>
                        ))}
                    </select>
                </Grid>
                <Grid item>
                    {/* select scale */}
                    <label htmlFor='scale'>&nbsp;Scale: </label>
                    <select
                        id='scale'
                        value={scale}
                        onChange={((event: React.ChangeEvent<HTMLSelectElement>) =>
                            HandleScaleChange(event))}
                    >
                        {SCALES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </Grid>
                <Grid item>
                    {/* select mode */}
                    <label htmlFor='mode'>&nbsp;Mode: </label>
                    <select
                        id='mode'
                        value={mode.name}
                        onChange={((event: React.ChangeEvent<HTMLSelectElement>) =>
                            HandleModeChange(event))}
                    >
                        {MODES.map((m) => (
                            <option key={m.name} value={m.name}>{m.name}</option>
                        ))}
                    </select>
                </Grid>
                <Grid item>
                    {/* select pitch */}
                    <label htmlFor='pitch'>&nbsp;Mode: </label>
                    <select
                        id='pitch'
                        value={pitch}
                        onChange={((event: React.ChangeEvent<HTMLSelectElement>) =>
                            HandlePitchChange(event))}
                    >
                        {PITCHES.map((p) => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </Grid>
                <Grid item>
                    {/* select display option */}
                    <label htmlFor='display'>&nbsp;Mode: </label>
                    <select
                        id='display'
                        value={displayOption}
                        onChange={((event: React.ChangeEvent<HTMLSelectElement>) =>
                            HandleDisplayChange(event))}
                    >
                        {DISPLAYOPTIONS.map((d) => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </Grid>
            </Grid>
        </Box>
    )
}