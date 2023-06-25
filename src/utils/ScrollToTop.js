import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    // useLocation finds the path we are going to 
    const { pathname } = useLocation();
    useEffect(() => {
        // useEffect will automatically have the window scroll to
        // the top of the page using (0,0)
        window.scrollTo(0, 0);
    }, [pathname]);
    return null
}