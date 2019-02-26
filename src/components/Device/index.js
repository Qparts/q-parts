import React from 'react'
import Responsive from 'react-responsive';

const SmallScreen = props => <Responsive {...props} maxWidth={767} />;
const MediumScreen = props => <Responsive {...props} minWidth={768} />;
const LargeScreen = props => <Responsive {...props} minWidth={992} />;
const CustomScreen = props => <Responsive {...props} />;
const XLargeScreen = props => <Responsive {...props} minWidth={1200} />;
const NavSm = props => <Responsive {...props} maxWidth={1169} />;
const NavLg = props => <Responsive {...props} minWidth={1170} />;

export { SmallScreen, MediumScreen, LargeScreen, XLargeScreen, CustomScreen, NavSm, NavLg }