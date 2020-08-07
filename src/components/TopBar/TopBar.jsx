import React from 'react'

import DesktopMenu from '../DesktopMenu/DesktopMenu';
import MobileMenu from '../MobileMenu/MobileMenu';
import './TopBar.scss'

export default function TopBar() {
    return (
        <div className="topbar">
            {window.innerWidth > 653 ? 
                <DesktopMenu />: 
                <MobileMenu />
            }
        </div>
    )
}