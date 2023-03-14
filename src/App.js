import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

    const [curVal, setcurVal] = useState("0");
    const [fullVal, setfullVal] = useState("");

    const handleSetFullVal = (prop) => {
        console.log(fullVal[fullVal.length-1]);
        if(prop == "Del") {
            if(/[0-9\.]/.test(fullVal[fullVal.length-1])) {
                setfullVal(fullVal.substring(0, fullVal.length - 1));
            }
        } else if(fullVal[fullVal.length-1] == "0") {
            if(/[-+/*]/.test(fullVal[fullVal.length-2]) && prop != ".") setfullVal(fullVal.substring(0, fullVal.length-1) + prop);
            else setfullVal(fullVal + prop);
        } else if(/[+/*]/.test(prop)) {
            if(/[+/*]/.test(fullVal[fullVal.length-1])) setfullVal(fullVal.substring(0, fullVal.length - 1) + prop);
            else if(fullVal[fullVal.length-1] == "-") setfullVal(fullVal);
            else setfullVal(fullVal + prop);
        } else if(prop == "-") {
            if(/[-+/*]/.test(fullVal[fullVal.length-1])) {
                if(/[-+/*]/.test(fullVal[fullVal.length-2])) {
                    setfullVal(fullVal.substring(0, fullVal.length - 1) + prop);
                } else {
                    setfullVal(fullVal + prop);
                }
            } else {
                setfullVal(fullVal + prop);
            }
        } else {
            setfullVal(fullVal + prop);
        }
    }

    const handleSetCurVal = (prop) => {
        if(curVal == '') {
            if(/[0-9]/.test(prop)) {
                handleSetFullVal(prop);
                return prop;
            } else {
                return '';
            }
        } else if(prop == "Del") {
            if(curVal.length > 0) {
                if(/[0-9\.]/.test(curVal[curVal.length-1])) {
                    handleSetFullVal(prop);
                    return curVal.substring(0, curVal.length - 1);
                }
                else return curVal;
            } else {
                return '';
            }
        } else if(/[0-9]/.test(prop)) {
            if((curVal == "0")
            || /[-+/*]/.test(curVal)) {
                handleSetFullVal(prop);
                return prop;
            } else {
                handleSetFullVal(prop);
                return curVal + prop;
            }
        } else if(/[-+/*]/.test(prop)) {
            handleSetFullVal(prop);
            return prop;
        } else if(prop == ".") {
            if(!/[-+/*\.]/.test(curVal)) {
                handleSetFullVal(prop);
                return curVal + prop;
            } else {
                return curVal;
            }
        }
    }

    return(
        <div id="calc-container">
            <div id="display">
                <div id="equation">{fullVal}</div>
                <div id="main-screen">{curVal}</div>
            </div>
            <button id="clear" onClick={() => setcurVal("0")}>AC</button>
            <button id="delete" onClick={() => setcurVal(handleSetCurVal("Del"))}>Del</button>
            <button id="divide" onClick={() => setcurVal(handleSetCurVal("/"))}>/</button>
            <button id="seven" onClick={() => setcurVal(handleSetCurVal("7"))}>7</button>
            <button id="eight" onClick={() => setcurVal(handleSetCurVal("8"))}>8</button>
            <button id="nine" onClick={() => setcurVal(handleSetCurVal("9"))}>9</button>
            <button id="multiply" onClick={() => setcurVal(handleSetCurVal("*"))}>*</button>
            <button id="four" onClick={() => setcurVal(handleSetCurVal("4"))}>4</button>
            <button id="five" onClick={() => setcurVal(handleSetCurVal("5"))}>5</button>
            <button id="six" onClick={() => setcurVal(handleSetCurVal("6"))}>6</button>
            <button id="subtract" onClick={() => setcurVal(handleSetCurVal("-"))}>-</button>
            <button id="one" onClick={() => setcurVal(handleSetCurVal("1"))}>1</button>
            <button id="two" onClick={() => setcurVal(handleSetCurVal("2"))}>2</button>
            <button id="three" onClick={() => setcurVal(handleSetCurVal("3"))}>3</button>
            <button id="add" onClick={() => setcurVal(handleSetCurVal("+"))}>+</button>
            <button id="zero" onClick={() => setcurVal(handleSetCurVal("0"))}>0</button>
            <button id="decimal" onClick={() => setcurVal(handleSetCurVal("."))}>.</button>
            <button id="equals">=</button>
        </div>
    );
}

export default App;