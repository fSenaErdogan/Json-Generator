"use client"


import { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import {HiOutlineSquaresPlus, HiOutlineXCircle} from "react-icons/hi2";

export default function Home() {
    const [items, setItems] = useState([{key: "", value: ""}]);

    const newItem = () => {
        setItems([...items, { id: Date.now(), key: '', value: '' }]);
    };

    const updateItem = (id, part, newValue) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, [part]: newValue } : item
        ));
    };

    const deleteItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const generateOutput = () => {
        let output = {};
        items.forEach(({ key, value }) => {
            if (key) output[key] = value;
        });
        return output;
    };

    return (
        <div className="w-full h-screen bg-slate-100 md:p-16 px-5 py-10">
            <div className="text-center w-full text-amber-500 mb-5">
                <h5 className="text-xl">
                    You`re Welcome
                </h5>
                <p className="md:text-5xl text-3xl mt-1"><code>Json Generator</code></p>
            </div>

            <div className="grid md:grid-cols-2 grid-rows-2 gap-8">
                <div className="bg-gray-50 shadow-inner p-4 rounded-xl h-fit">
                    <div className="mb-4 text-amber-600 font-bold px-2">Input</div>
                    <div className="flex flex-col gap-2">
                        {items.map(({id, key, value}) => (
                            <div key={id} className="flex md:gap-2 gap-1 items-center">
                                <div className="w-full grid md:grid-cols-2 grid-row-2 gap-2 md:mb-0 mb-3 md:pe-0 pe-2 md:border-none border-r-2 rounded border-red-400">
                                    <Input type="text" value={key}
                                           onChange={(e) => updateItem(id, 'key', e.target.value)} label="Key"
                                           className="bg-white"/>
                                    <Input type="text" value={value}
                                           onChange={(e) => updateItem(id, 'value', e.target.value)} label="Value"
                                           className="bg-white"/>
                                </div>
                                <button onClick={() => deleteItem(id)} className="text-red-500">
                                    <HiOutlineXCircle size={26}/>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="my-2 relative text-black h-[20px]">
                        <button onClick={newItem} className="absolute left-0 top-[5px] px-1 text-blue-700">
                            <HiOutlineSquaresPlus size={25} />
                        </button>
                    </div>
                </div>
                <div className="bg-gray-50 shadow-inner p-4 rounded-xl h-fit md:min-h-[148px] ">
                    <div className="mb-4 text-amber-600 font-bold px-2">
                        Output
                    </div>
                    <div className="bg-black text-white p-4 rounded-xl">
                        <pre>{JSON.stringify(generateOutput(), null, 2)}</pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
