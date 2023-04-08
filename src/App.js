import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

    const [curVal, setcurVal] = useState("0");
    const [fullVal, setfullVal] = useState("");

    const handleEquals = () => {
        if(fullVal == '') {
            return;
        }
        let final = 0;
        let curEquation = [];
        let workingEquation = fullVal.split(/(?=[-+/*])/g);
        let numToDel = 0;

        if(/=/g.test(fullVal)) {
            return;
        }

        for(let i = 0; i < workingEquation.length; i++) {
            let elem = workingEquation[i];
            if(elem == NaN) {
                setcurVal("NaN");
                setfullVal(fullVal + " = " + "NaN");
                return;
            } else if(elem[elem.length-1] == "e") {
                curEquation.push(parseFloat(elem + workingEquation[i+1] + workingEquation[i+2]));
                i++;
            } else if(/[+/*]/.test(elem[0]) && elem.length > 1) {
                curEquation.push(elem[0]);
                curEquation.push(parseFloat(elem.substring(1)));
            } else if(/[0-9]/.test(elem)) {
                curEquation.push(parseFloat(elem));
            } else {
                curEquation.push(elem);
            }
        }

        if(/[-+/*]/.test(curEquation[curEquation.length - 1][0])) {
            curEquation.pop();
            numToDel++;
            if(/[-+/*]/.test(curEquation[curEquation.length - 1][0])) {
                curEquation.pop();
                numToDel++;
            }
        }

        let conjunctionFunction = (conjunction) => {
            while(curEquation.indexOf(conjunction) != -1) {
                let curIndex = curEquation.indexOf(conjunction);
                let val;
                switch(conjunction){
                    case '*':
                        val = curEquation[curIndex-1] * curEquation[curIndex+1];
                        break;
                    case '/':
                        val = curEquation[curIndex-1] / curEquation[curIndex+1];
                        break;
                    case '+':
                        val = curEquation[curIndex-1] + curEquation[curIndex+1];
                        break;
                    case '-':
                        val = curEquation[curIndex-1] - curEquation[curIndex+1];
                        break;
                }
                curEquation.splice(curIndex-1, 3);
                curEquation.splice(curIndex-1, 0, val)
            }
        }
        
        conjunctionFunction("*");
        conjunctionFunction("/");
        conjunctionFunction("+");
        conjunctionFunction("-");

        curEquation.forEach(elem => {
            final += elem;
        });

        final = Math.round((final + Number.EPSILON) * 10000) / 10000;

        setcurVal(final);
        setfullVal(fullVal.substring(0,fullVal.length-numToDel) + " = " + final);
    }

    const handleSetFullVal = (prop) => {
        if(fullVal == "0") {
            if(/[+/*-]/.test(prop)) setfullVal(fullVal + prop);
            if(prop == "0") {
                setfullVal("0");
            } else if(/[0-9]/.test(prop)) {
                setfullVal(prop);
            }
        } else if(prop == "Del") {
            if(/[0-9\.]/.test(fullVal[fullVal.length-1])) {
                setfullVal(fullVal.substring(0, fullVal.length - 1));
            }
        } else if(fullVal[fullVal.length-1] == "0") {
            if(/[-+/*]/.test(fullVal[fullVal.length-2]) && !/[+/*-]/.test(prop) && prop != ".") setfullVal(fullVal.substring(0, fullVal.length-1) + prop);
            else setfullVal(fullVal + prop);
        } else if(/[+/*]/.test(prop)) {
            if(fullVal == '') setfullVal('');
            else if(/[+/*]/.test(fullVal[fullVal.length-1])) setfullVal(fullVal.substring(0, fullVal.length - 1) + prop);
            else if(fullVal[fullVal.length-1] == "-") {
                if(/[-+/*]/.test(fullVal[fullVal.length-2])) setfullVal(fullVal.substring(0, fullVal.length - 2) + prop);
                else setfullVal(fullVal.substring(0, fullVal.length - 1) + prop);
            }
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
        if(/=/g.test(fullVal)) {
            if(/[0-9]/.test(prop)) {
                setfullVal(prop);
                return prop;
            } else if(prop == ".") {
                setfullVal("0.");
                return "0.";
            } else if(prop == "Del") {
                return curVal;
            } else {
                setfullVal(curVal + prop);
                return prop;
            }
        }
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
            if(curVal == '0') {
                handleSetFullVal("0.");
                return "0.";
            }

            if(!/[-+/*\.]/.test(curVal)) {
                handleSetFullVal(prop);
                return curVal + prop;
            } else if(/[-+/*]/.test(curVal)) {
                handleSetFullVal("0.");
                return "0.";
            } else {
                return curVal;
            }
        }
    }

    return(
        <div id="calc-container">
            <div id="main-screen">
                <div id="equation">{fullVal}</div>
                <div id="display">{curVal}</div>
            </div>
            <div id="buttons">
                <button id="clear" onClick={() => {
                    setcurVal("0");
                    setfullVal("");
                }}>AC</button>
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
                <button id="equals" onClick={() => handleEquals()}>=</button>
            </div>
        </div>
    );
}

export default App;