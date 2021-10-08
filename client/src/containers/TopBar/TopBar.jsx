import React from 'react'

import DesktopMenu from '../../components/DesktopMenu';
import MobileMenu from '../../components/MobileMenu/MobileMenu';
import './TopBar.scss'

export default function TopBar() {
    return (
        <div className="topbar">
            <DesktopMenu />
            <MobileMenu />
        </div>
    )
}