import {LuCopy} from "react-icons/lu";

const OutputComp = ({copyJson,generateOutput}) => {
  return (
      <>
          <div className="flex justify-between items-center mb-4 px-2 text-amber-600">
              <div className=" font-bold">
                  Output
              </div>
              <button onClick={copyJson}>
                  <LuCopy size={22}/>
              </button>
          </div>
          <div className="bg-black md:text-base text-sm  text-white p-4 rounded-xl">
              <pre>{JSON.stringify(generateOutput(), null, 2)}</pre>
          </div>
      </>
  )
}

export default OutputComp