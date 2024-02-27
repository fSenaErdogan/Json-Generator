import {Input} from "@material-tailwind/react";
import {HiOutlineSquaresPlus, HiOutlineXCircle} from "react-icons/hi2";
import {useEffect, useState} from "react";
import {IoWarningOutline} from "react-icons/io5";

const InputsComp = ({items, setItems}) => {
    const newItem = () => {
        setItems([...items, {id: Date.now(), key: '', value: ''}]);
    };

    const updateItem = (id, part, newValue) => {
        setItems(items.map(item =>
            item.id === id ? {...item, [part]: newValue} : item
        ));
    };

    const deleteItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const [duplicateKeyWarnings, setDuplicateKeyWarnings] = useState({});

    useEffect(() => {
        const keyCounts = items.reduce((acc, {key}) => {
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});

        const warnings = items.reduce((acc, {key}, index) => {
            if (key && keyCounts[key] > 1) {
                acc[index] = 'Bu key daha önce kullanıldı';
                console.log(acc)
            }
            return acc;
        }, {});

        setDuplicateKeyWarnings(warnings);
    }, [items]);

    return (
        <>
            <div className="mb-4 text-amber-600 font-bold px-2">Input</div>
            <div className="flex flex-col gap-2">
                {items.map(({id, key, value}, index) => (
                    <div key={id} className="flex md:gap-2 gap-1 items-center">
                        <div className=" w-full grid md:grid-cols-2 grid-row-2 gap-3 md:mb-1 mb-3 md:pe-0 pe-2
                            md:border-none border-r-2 rounded border-red-400">
                            <div className="relative">
                                <Input type="text" value={key} label="Key" className=""
                                       onChange={(e) => updateItem(id, 'key', e.target.value)}
                                       error={duplicateKeyWarnings.hasOwnProperty(index) ? duplicateKeyWarnings[index] : ''}
                                />
                                {duplicateKeyWarnings[index]&& (
                                    <span
                                        className="absolute right-5 -bottom-2 px-2 py-0.5 text-[13px]
                                        text-red-600 bg-gray-50 flex justify-center items-center md:gap-2 gap-1">
                                    <IoWarningOutline/>{duplicateKeyWarnings[index]}
                                </span>
                                )}
                            </div>
                            <Input type="text" value={value} label="Value" className=""
                                   onChange={(e) => updateItem(id, 'value', e.target.value)}
                            />
                        </div>
                        <button onClick={() => deleteItem(id)} className="text-red-500">
                            <HiOutlineXCircle size={26}/>
                        </button>
                    </div>
                ))}
            </div>
            <div className="my-2 relative text-black h-[20px]">
                <button onClick={newItem} className="absolute left-0 top-[5px] px-1 text-blue-700">
                    <HiOutlineSquaresPlus size={25}/>
                </button>
            </div>
        </>
    )
}

export default InputsComp