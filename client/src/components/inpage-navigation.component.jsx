import { useEffect, useRef, useState } from "react";

export let activeTabLineRef;
export let activeTabRef;

const InPageNavigation = ({routes, defaultActiveIndex = 0, children}) => {

    let [inPageNavIndex, setInPageNavIndex] = useState(defaultActiveIndex);

    activeTabLineRef = useRef();
    activeTabRef = useRef();

    const changePageState = (btn, i) => {
        let { offsetWidth, offSetLeft } = btn;

        activeTabLineRef.current.style.width = offsetWidth + "px";
        activeTabLineRef.current.style.left = offSetLeft + "px";
        setInPageNavIndex(i);
    }

    useEffect(() => {
        changePageState(activeTabRef.current, defaultActiveIndex);
    }, [])
  return (
    <>
      <div className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto"> 
      {
        routes.map((route, i) => {
            return (
                <button ref={i===defaultActiveIndex ? activeTabRef : null} key={i} onClick={(e) => {changePageState(e.target, i)}} className={"p-4 px-5 capitalize " + (inPageNavIndex === i ? "text-black " : "text-dark-grey")}>
                    {route}
                </button>
            );
        })
      }
      <hr ref={activeTabLineRef} className="absolute bottom-1 duration-300"/>
      </div>

      {children}
    </>
  );
};

export default InPageNavigation;
