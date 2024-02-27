"use client"


import {useState} from "react";
import {Input, Button, Alert} from "@material-tailwind/react";
import {AiOutlinePlusSquare, AiOutlineMinusSquare} from "react-icons/ai";
import {HiOutlineSquaresPlus, HiOutlineXCircle} from "react-icons/hi2";
import {LuCopy} from "react-icons/lu";
import ProjectHeader from "@/Components/ProjectHeader";
import InputsComp from "@/Components/InputsComp";
import OutputComp from "@/Components/OutputComp";

export default function Home() {
    const [items, setItems] = useState([{key: "", value: ""}]);



    const [alertInfo, setAlertInfo] = useState({open: false, type: ''});

    const copyJson = () => {
        const output = JSON.stringify(generateOutput(), null, 2);
        navigator.clipboard.writeText(output).then(() => {
            setAlertInfo({open: true, type: 'success'});
            setTimeout(() => {
                setAlertInfo({open: false, type: ''});
            }, 2500);
        }).catch(err => {
            setAlertInfo({open: true, type: 'error'});
            setTimeout(() => {
                setAlertInfo({open: false, type: ''});
            }, 2500);
        });
    };



    const generateOutput = () => {
        let output = {};
        items.forEach(({key, value}) => {
            if (key) output[key] = value;
        });
        return output;
    };

    return (
        <div className="w-full h-screen bg-slate-100 md:p-16 px-5 py-10">
            <div className="text-center w-full text-amber-500 mb-5 relative">
                <ProjectHeader/>
                <Alert open={alertInfo.open}
                       onClose={() => setAlertInfo({open: false, type: ''})}
                       animate={{
                           mount: {y: 100},
                           unmount: {y: 0},
                       }}
                       color={alertInfo.type === 'success' ? "green" : "red"}
                       className="absolute w-96 text-center right-0 -top-28">
                    {alertInfo.type === 'success' ? "Copied Successfully." : "Something went wrong."}
                </Alert>
            </div>
            <div className="grid md:grid-cols-2 grid-rows-2 gap-8">
                <div className="bg-gray-50 shadow-inner p-4 rounded-xl h-fit">
                    <InputsComp items={items} setItems={setItems}/>
                </div>
                <div className="bg-gray-50 shadow-inner p-4 rounded-xl h-fit md:min-h-[148px] ">
                    <OutputComp copyJson={copyJson} generateOutput={generateOutput}/>
                </div>
            </div>
        </div>
    );
}
