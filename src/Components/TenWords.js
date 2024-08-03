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
    const [currentUser, setCurrentUser] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [lastTenWords, setLastTenWords] = useState({primero: ["notLoadedYet", "notLoadedYet"]});
    const [translate, setTranslate] = useState("nederlands");
    const [btnText, setBtnText] = useState("Nederlands naar Español");
    const [btnSubmit, setBtnSubmit] = useState("Submit")
    const [borderColor, setBorderColor] = useState(["grey", "grey", "grey", "grey", "grey", "grey", "grey", "grey", "grey", "grey"]);

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
            return setLastTenWords(arr[0].palabras);
        });
    }

    const checkLastTenWords = (event) => {
        event.preventDefault()
        let num = 0;
        const borderArray = [];
        if (btnSubmit === "Again") {
            event.target[0].value = "";
            event.target[1].value = "";
            event.target[2].value = "";
            event.target[3].value = "";
            event.target[4].value = "";
            event.target[5].value = "";
            event.target[6].value = "";
            event.target[7].value = "";
            event.target[8].value = "";
            event.target[9].value = "";
            setBorderColor(["grey", "grey", "grey", "grey", "grey", "grey", "grey", "grey", "grey", "grey"]);
            return setBtnSubmit("Submit")
        } else {
            setBtnSubmit("Again");
        }
        if (translate === "nederlands") {
            num = 1;
        }
        // check if the answers are true or not
        if (event.target[0].value === lastTenWords.primero[num]) {
            borderArray.push("green");
        } else {
            let test = event.target[0].value + ` : ${lastTenWords.primero[num]}`;
            event.target[0].value = test;
            borderArray.push("red");
        }
        if (event.target[1].value === lastTenWords.segundo[num]) {
            borderArray.push("green");
        } else {
            let test = event.target[1].value + ` : ${lastTenWords.segundo[num]}`;
            event.target[1].value = test;
            borderArray.push("red");
        }
        if (event.target[2].value === lastTenWords.segundo[num]) {
            borderArray.push("green");
        } else {
            let test = event.target[2].value + ` : ${lastTenWords.tercero[num]}`;
            event.target[2].value = test;
            borderArray.push("red");
        }
        if (event.target[3].value === lastTenWords.segundo[num]) {
            borderArray.push("green");
        } else {
            let test = event.target[3].value + ` : ${lastTenWords.cuarto[num]}`;
            event.target[3].value = test;
            borderArray.push("red");
        }
        if (event.target[4].value === lastTenWords.segundo[num]) {
            borderArray.push("green");
        } else {
            let test = event.target[4].value + ` : ${lastTenWords.quinto[num]}`;
            event.target[4].value = test;
            borderArray.push("red");
        }
        if (event.target[5].value === lastTenWords.segundo[num]) {
            borderArray.push("green");
        } else {
            let test = event.target[5].value + ` : ${lastTenWords.sexto[num]}`;
            event.target[5].value = test;
            borderArray.push("red");
        }
        if (event.target[6].value === lastTenWords.segundo[num]) {
            borderArray.push("green");
        } else {
            let test = event.target[6].value + ` : ${lastTenWords.séptimo[num]}`;
            event.target[6].value = test;
            borderArray.push("red");
        }
        if (event.target[7].value === lastTenWords.segundo[num]) {
            borderArray.push("green");
        } else {
            let test = event.target[7].value + ` : ${lastTenWords.octavo[num]}`;
            event.target[7].value = test;
            borderArray.push("red");
        }
        if (event.target[8].value === lastTenWords.segundo[num]) {
            borderArray.push("green");
        } else {
            let test = event.target[8].value + ` : ${lastTenWords.noveno[num]}`;
            event.target[8].value = test;
            borderArray.push("red");
        }
        if (event.target[9].value === lastTenWords.décimo[num]) {
            borderArray.push("green");
        } else {
            let test = event.target[9].value + ` : ${lastTenWords.segundo[num]}`;
            event.target[9].value = test;
            borderArray.push("red");
        }
        setBorderColor(borderArray); // make the borders red or green

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


    // if nederlands, translate to spanish. visa versa
    const formPracticeTenWords = () => {
        if (lastTenWords.primero[0] !== "notLoadedYet") {
            if (translate === "nederlands") {
                return (
                    <div className='practiceNlToE' style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <form className='PractiveNlAE' onSubmit={checkLastTenWords} style={{display: 'flex', flexDirection: 'column', alignItems: "end", gap: "2px"}}>
                            <label> {lastTenWords.primero[0]}: <input type="text" style={{ borderColor: borderColor[0] }} required/></label>
                            <label> {lastTenWords.segundo[0]}: <input type="text" style={{ borderColor: borderColor[1] }} required/></label>
                            <label> {lastTenWords.tercero[0]}: <input type="text" style={{ borderColor: borderColor[2] }} required/></label>
                            <label> {lastTenWords.cuarto[0]}: <input type="text" style={{ borderColor: borderColor[3] }} required/></label>
                            <label> {lastTenWords.quinto[0]}: <input type="text" style={{ borderColor: borderColor[4] }} required/></label>
                            <label> {lastTenWords.sexto[0]}: <input type="text" style={{ borderColor: borderColor[5] }} required/></label>
                            <label> {lastTenWords.séptimo[0]}: <input type="text" style={{ borderColor: borderColor[6] }} required/></label>
                            <label> {lastTenWords.octavo[0]}: <input type="text" style={{ borderColor: borderColor[7] }} required/></label>
                            <label> {lastTenWords.noveno[0]}: <input type="text" style={{ borderColor: borderColor[8] }} required/></label>
                            <label> {lastTenWords.décimo[0]}: <input type="text" style={{ borderColor: borderColor[9] }} required/></label>
                            <button>{btnSubmit}</button>
                        </form>
                </div>
                )
            } else {
                return(
                    <div className='practiceEToNl' style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <form className='PractiveEANl' onSubmit={checkLastTenWords} style={{display: 'flex', flexDirection: 'column', alignItems: "end", gap: "2px"}}>
                            <label> {lastTenWords.primero[1]}: <input type="text" style={{ borderColor: borderColor[0] }} required/></label>
                            <label> {lastTenWords.segundo[1]}: <input type="text" style={{ borderColor: borderColor[1] }} required/></label>
                            <label> {lastTenWords.tercero[1]}: <input type="text" style={{ borderColor: borderColor[2] }} required/></label>
                            <label> {lastTenWords.cuarto[1]}: <input type="text" style={{ borderColor: borderColor[3] }} required/></label>
                            <label> {lastTenWords.quinto[1]}: <input type="text" style={{ borderColor: borderColor[4] }} required/></label>
                            <label> {lastTenWords.sexto[1]}: <input type="text" style={{ borderColor: borderColor[5] }} required/></label>
                            <label> {lastTenWords.séptimo[1]}: <input type="text" style={{ borderColor: borderColor[6] }} required/></label>
                            <label> {lastTenWords.octavo[1]}: <input type="text" style={{ borderColor: borderColor[7] }} required/></label>
                            <label> {lastTenWords.noveno[1]}: <input type="text" style={{ borderColor: borderColor[8] }} required/></label>
                            <label> {lastTenWords.décimo[1]}: <input type="text" style={{ borderColor: borderColor[9] }} required/></label>
                            <button>{btnSubmit}</button>
                        </form>
                </div>
                )
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
                <button onClick={() => {handleIdioma()}}>{btnText}</button>
                {formPracticeTenWords()}
            </div>
        </div>
    )
}

export default TenWords