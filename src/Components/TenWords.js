import React, { useState, useEffect } from 'react';
import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
    serverTimestamp,
  } from 'firebase/firestore';

  const db = getFirestore();

const TenWords = (props) => {
    const [display, setDisplay] = useState({
        displayForm: "none", // voeg tien woorden toe
        displayTenWords: "none", // oefen de laatste tien woorden
        displayBtnAddWords: "inline"
    });
    const [displayBtn, setDisplayBtn] = useState("inline")
    const [startPractice, setStartPractice] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [lastTenWords, setLastTenWords] = useState({primero: ["notLoadedYet", "notLoadedYet"]});
    const [palabra, setPalabra] = useState([]);
    const [currentPalabra, setCurrentPalabra] = useState("primero");
    const [translate, setTranslate] = useState("nederlands");
    const [btnText, setBtnText] = useState("Nederlands naar Español");
    const [btnSubmit, setBtnSubmit] = useState("Submit")
    const [borderColor, setBorderColor] = useState(["grey"]);
    const [terminar, setTerminar] = useState(false);

    // update uid
    useEffect(() => {
        setCurrentUser(props.currentUser.uid);
  }, []);

    // handle display of form
    const changeDisplay = (num) => {
        if (num === 1) {
            if (display.displayForm === "none") {
                setDisplay({
                    ...display, // Copy the old fields
                    displayForm: "inline", // But override this one
                    displayTenWords: "none"
                });
            } else {
                setDisplay({
                    ...display, // Copy the old fields
                    displayForm: "none" // But override this one
                });
            }
        } else if (num === 2) {
            if (display.displayTenWords === "none") {
                setDisplay({
                    ...display, // Copy the old fields
                    displayTenWords: "inline", // But override this one
                    displayForm: "none"
                });
            } else {
                setDisplay({
                    ...display, // Copy the old fields
                    displayTenWords: "none" // But override this one
                });
            }
        }
    }

    // handle form data and sent data to function
    const handleForm = async(event) => {
        event.preventDefault()
        uploadTenWords(
            [event.target[0].value, event.target[1].value],
            [event.target[2].value, event.target[3].value],
            [event.target[4].value, event.target[5].value],
            [event.target[6].value, event.target[7].value],
            [event.target[8].value, event.target[9].value],
            [event.target[10].value, event.target[11].value],
            [event.target[12].value, event.target[13].value],
            [event.target[14].value, event.target[15].value],
            [event.target[16].value, event.target[17].value],
            [event.target[18].value, event.target[19].value],
        )
        event.target[0].value = '';
        event.target[1].value = '';
        event.target[2].value = '';
        event.target[3].value = '';
        event.target[4].value = '';
        event.target[5].value = '';
        event.target[6].value = '';
        event.target[7].value = '';
        event.target[8].value = '';
        event.target[9].value = '';
        event.target[10].value = '';
        event.target[11].value = '';
        event.target[12].value = '';
        event.target[13].value = '';
        event.target[14].value = '';
        event.target[15].value = '';
        event.target[16].value = '';
        event.target[17].value = '';
        event.target[18].value = '';
        event.target[19].value = '';
    }
    

    // Saves form to database
    async function uploadTenWords(uno, dos, tres, cuatro, cinco, seis, siete, ocho, nuevo, diez) {
        try {
        await addDoc(collection(db, 'users', currentUser, 'diezPalabras'), {
            "palabras": {
                primero: uno,
                segundo: dos,
                tercero: tres,
                cuarto: cuatro,
                quinto: cinco,
                sexto: seis,
                séptimo: siete,
                octavo: ocho,
                noveno: nuevo,
                décimo: diez
            },
            Timestamp: serverTimestamp()
        });
        setErrMsg("Je hebt 10 woorden toegevoegd aan de database");
            setDisplay({
                ...display, // Copy the old fields
                displayForm: "none" // But override this one
            });
        }
        catch(error) {
        setErrMsg('Error writing new message to Firebase Database');
        }
    }

    function loadLastTenWords() {
        // Create the query to load the last 10 words.
        const recentMessagesQuery = query(collection(db, 'users', currentUser, 'diezPalabras'), orderBy('Timestamp', 'desc'), limit(1));
        let arr = [];
        // Start listening to the query.
        onSnapshot(recentMessagesQuery, function(snapshot) {
            snapshot.forEach(function(doc) {
            arr.push(doc.data());
            });
            setPalabra(arr[0].palabras.primero);
            return setLastTenWords(arr[0].palabras);
        });
    }


    const handleIdioma = () => {
        if (translate === "nederlands") {
            setTranslate("spaans")
            return setBtnText("Español naar Nederlands");
        } else {
            setTranslate("nederlands")
            return setBtnText("Nederlands naar Español");
        }
    }

    const handleDisplayBtn = () => {
        setDisplayBtn("none");

    }

    const handleStart = () => {
        if (!startPractice) {
            return setStartPractice(true);
        } else {
            return setStartPractice(false);
        }
    }

    const getPalabra = (num) => {
        if (currentPalabra === "primero") {
            if (num === 0) {
                return lastTenWords.primero
            } else {
                setCurrentPalabra("segundo");
                return lastTenWords.segundo
            }
        } else if (currentPalabra === "segundo") {
            if (num === 0) {
                return lastTenWords.segundo;
            } else {
                setCurrentPalabra("tercero");
                return lastTenWords.tercero
            }
        } else if (currentPalabra === "tercero") {
            if (num === 0) {
                return lastTenWords.tercero;
            } else {
                setCurrentPalabra("cuarto");
                return lastTenWords.cuarto
            }
        } else if (currentPalabra === "cuarto") {
            if (num === 0) {
                return lastTenWords.cuarto;
            } else {
                setCurrentPalabra("quinto");
                return lastTenWords.quinto
            }
        } else if (currentPalabra === "quinto") {
            if (num === 0) {
                return lastTenWords.quinto;
            } else {
                setCurrentPalabra("sexto");
                return lastTenWords.sexto
            }
        } else if (currentPalabra === "sexto") {
            if (num === 0) {
                return lastTenWords.sexto;
            } else {
                setCurrentPalabra("séptimo");
                return lastTenWords.séptimo
            }
        } else if (currentPalabra === "séptimo") {
            if (num === 0) {
                return lastTenWords.séptimo;
            } else {
                setCurrentPalabra("octavo");
            return lastTenWords.octavo
            }
        } else if (currentPalabra === "octavo") {
            if (num === 0) {
                return lastTenWords.octavo;
            } else {
                setCurrentPalabra("noveno");
                return lastTenWords.noveno
            }
        } else if (currentPalabra === "noveno") {
            if (num === 0) {
                return lastTenWords.noveno;
            } else {
                setCurrentPalabra("décimo");
                return lastTenWords.décimo;
            }
        } else if (currentPalabra === "décimo") {
            if (num === 0) {
                return lastTenWords.décimo
            } else {
                setCurrentPalabra("terminar");
                return "terminar";
            }

        }
    }

    const checkPalabra = (event) => {
        event.preventDefault()
        let num = 0;
        const borderArray = [];
        let checkPalabra = getPalabra(0);
        if (btnSubmit === "Next") {
            event.target[0].value = "";
            setBorderColor(["grey"]);
            let nextPalabra = getPalabra(1);
            if (nextPalabra === "terminar") {
                setTerminar(true);
                return setBtnSubmit("Done");
            }
            setPalabra(nextPalabra);
            return setBtnSubmit("Submit")
        } else {
            setBtnSubmit("Next");
        }
        if (translate === "nederlands") {
            num = 1;
        }
        // check if the answers are true or not
        if (event.target[0].value === checkPalabra[num]) {
            borderArray.push("green");
        } else {
            let test = event.target[0].value + ` : ${checkPalabra[num]}`;
            event.target[0].value = test;
            borderArray.push("red");
        }
        setBorderColor(borderArray); // make the borders red or green
    }

    const practiceAgain = () => {
        setTerminar(false);
        setCurrentPalabra("primero");
        setBorderColor(["grey"]);
    }

    const practiceTenWords = () => {
        if (lastTenWords.primero[0] !== "notLoadedYet") {
            if (!startPractice) {
                return (
                    <div className='practiceTenWords'>
                    <button onClick={() => {handleIdioma();}} style={{display: displayBtn}}>{btnText}</button>
                    <button onClick={() => {handleDisplayBtn(); handleStart()}} style={{display: displayBtn}}>Start</button>
                </div>
                )
            } else if (terminar) {
                return (
                    <div className='practiceTerminar' style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                        <p>Good Job</p>
                        <button onClick={() => {practiceAgain()}}>Again</button>
                    </div>
                )
            } else {
                if (translate === "nederlands") {
                    return (
                        <div className='practiceNlToE' style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <form className='PractiveNlAE' onSubmit={checkPalabra} style={{display: 'flex', flexDirection: 'column', alignItems: "end"}}>
                                <label> {palabra[0]}: <input type="text" className='practiceInput' style={{ borderColor: borderColor[0] }} required/></label>
                                <button>{btnSubmit}</button>
                            </form>
                    </div> 
                    )
                } else {
                    return (
                        <div className='practiceNlToE' style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <form className='PractiveNlAE' onSubmit={checkPalabra} style={{display: 'flex', flexDirection: 'column', alignItems: "end"}}>
                                <label> {palabra[1]}: <input type="text" className='practiceInput' style={{ borderColor: borderColor[0] }} required/></label>
                                <button>{btnSubmit}</button>
                            </form>
                    </div> 
                    )
                }
            }
        }
    }


    return(
        <div className="TenWords" style={{maxWidth: "100vw"}}>
            <button onClick={() => {changeDisplay(1)}} >Voeg tien woorden toe</button>
            <button onClick={() => {changeDisplay(2); loadLastTenWords()}}>Oefen de laatste tien woorden</button>
            <div className='formAddWords' style={{display: display.displayForm}}>
                <h3 style={{textAlign: 'center'}}>Voeg hier tien woorden toe, links in het nederlands en rechts in het spaans.</h3>
                <form className="formTenWords" id="formTenWords" onSubmit={handleForm} style={{display: "flex", flexDirection: "column", alignItems: "center", gap: '10px'}}>
                        <div className='formTenWordsInput'>
                            <label> Eerste: <input type="text" name="Eerste" required/></label>
                            <label> Primero: <input type="text" name="Primero" required/></label>
                        </div>
                        <div className='formTenWordsInput'>
                            <label> Tweede: <input type="text" name="Tweede" required/></label>
                            <label> Segundo: <input type="text" name="Segundo" required/></label>
                        </div>
                        <div className='formTenWordsInput'>
                            <label> Derde: <input type="text" name="Derde" required/></label>
                            <label> Tercero: <input type="text" name="Tercero" required/></label>
                        </div>
                        <div className='formTenWordsInput'>
                            <label> Vierde: <input type="text" name="Vierde" required/></label>
                            <label> Cuarto: <input type="text" name="Cuarto" required/></label>
                        </div>
                        <div className='formTenWordsInput'>
                            <label> Vijfde: <input type="text" name="Vijfde" required/></label>
                            <label> Quinto: <input type="text" name="Quinto" required/></label>
                        </div>
                        <div className='formTenWordsInput'>
                            <label> Zesde: <input type="text" name="Zesde" required/></label>
                            <label> Sexto: <input type="text" name="Sexto" required/></label>
                        </div>
                        <div className='formTenWordsInput'>
                            <label> Zevende: <input type="text" name="Zevende" required/></label>
                            <label> Séptimo: <input type="text" name="Séptimo" required/></label>
                        </div>
                        <div className='formTenWordsInput'>
                            <label> Achtste: <input type="text" name="Achtste" required/></label>
                            <label> Octavo: <input type="text" name="Octavo" required/></label>
                        </div>
                        <div className='formTenWordsInput'>
                            <label> Negende: <input type="text" name="Negende" required/></label>
                            <label> Noveno: <input type="text" name="Noveno" required/></label>
                        </div>
                        <div className='formTenWordsInput'>
                            <label> Tiende: <input type="text" name="Tiende" required/></label>
                            <label> Décimo: <input type="text" name="Décimo" required/></label>
                        </div>
                        <button >Toevoegen / agregar</button>
                        {errMsg}
                    </form>
            </div>
            <div className='PracticeTenLastWords' style={{display: display.displayTenWords}}>
                {practiceTenWords()}
            </div>
        </div>
    )
}

export default TenWords