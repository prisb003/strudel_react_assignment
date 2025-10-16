import './cors-redirect';
import './App.css';
import { initStrudel, note, hush, evalScope, getAudioContext, webaudioOutput, registerSynthSounds, initAudioOnFirstClick, transpiler } from "@strudel/web";
import { useEffect, useRef } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import Controls from './components/Controls';
let globalEditor = null;

export default function StrudelDemo() {

  const hasRun = useRef(false);

  useEffect(() => {
  if (!hasRun.current) {
    hasRun.current = true;

    (async () => {
      await initStrudel();

      globalEditor = new StrudelMirror({
        defaultOutput: webaudioOutput,
        getTime: () => getAudioContext().currentTime,
        transpiler,
        root: document.getElementById("editor"),
        prebake: async () => {
          initAudioOnFirstClick(); // needed to make the browser happy
          const loadModules = evalScope(
            import("@strudel/core"),
            import("@strudel/draw"),
            import("@strudel/mini"),
            import("@strudel/tonal"),
            import("@strudel/webaudio")
          );
          await Promise.all([
            loadModules,
            registerSynthSounds(),
            registerSoundfonts(),
          ]);
        },
      });

      // Wait a short moment to ensure StrudelMirror fully attaches, pre-processing will fail otherwise
      setTimeout(() => {
        document.getElementById("proc").value = stranger_tune;
        monitorProcess(); 
      }, 100);
    })();
  }
}, []);


  // ----- Monitor functions for buttons -----
  const parseText = (isMuted) => (isMuted ? "_" : "");

  const monitorProcess = () => {
    const procText = document.getElementById("proc").value;
    const replaced = procText.replaceAll("<p1_Radio>", parseText(isMutedRef.current));
    globalEditor?.setCode(replaced);
  };

  const monitorProcPlay = () => {
    monitorProcess();
    globalEditor?.evaluate();
  };

  const monitorPlay = () => globalEditor?.evaluate();
  const monitorStop = () => globalEditor?.stop();

  // Toggle function state
  const isMutedRef = useRef(false);
  const monitorToggleP1 = (mute) => {
    isMutedRef.current = mute;
    monitorProcPlay();
  };

  return (
    <div>
      <h2>Strudel Demo</h2>
      <main>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
              <textarea className="form-control" rows="15" id="proc" ></textarea>
            </div>
            <div className="col-md-4">
              {/* Controls element triggers monitor functions passed as props */}
              <Controls onProcess={monitorProcess} onProcPlay={monitorProcPlay} onPlay={monitorPlay} onStop={monitorStop} onToggleP1={monitorToggleP1}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
              <div id="editor" />
            </div>
          </div>
        </div>
      </main >
    </div >
  );


}

