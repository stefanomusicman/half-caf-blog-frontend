import { Fragment, useState, useEffect } from "react";
import MobileNavigation from "./MobileNavigation";
import NavBar from "./NavBar";

const Navigation = () => {

    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect((): void => {
        if(window.innerWidth <= 1000) {
            setIsMobile(true)
        }
    }, []);

    return(
        <Fragment>
            {isMobile ? <MobileNavigation /> : <NavBar />}
        </Fragment>
    )

}

export default Navigation;