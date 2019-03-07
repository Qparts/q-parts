import React from 'react'
import Responsive from 'react-responsive';

const SmallScreen = props => <Responsive {...props} maxWidth={767} />;
const MediumScreen = props => <Responsive {...props} minWidth={768} />;
const LargeScreen = props => <Responsive {...props} minWidth={992} />;
const CustomScreen = props => <Responsive {...props} />;
const XLargeScreen = props => <Responsive {...props} minWidth={1200} />;
const NavSm = props => <Responsive {...props} maxWidth={1169} />;
const NavLg = props => <Responsive {...props} minWidth={1170} />;



const DownSmallScreen = props => <Responsive {...props} maxWidth={576} />;
const UpSmallScreen = props => <Responsive {...props} minWidth={576} />;

const DownMediumScreen = props => <Responsive {...props} maxWidth={768} />;

const DownLargeScreen = props => <Responsive {...props} maxWidth={992} />;
export {DownSmallScreen, UpSmallScreen, DownMediumScreen,  SmallScreen, MediumScreen, LargeScreen, XLargeScreen, DownLargeScreen, CustomScreen, NavSm, NavLg}
