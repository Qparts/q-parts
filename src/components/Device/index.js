import React from 'react'
import Responsive from 'react-responsive';

const SmallScreen = props => <Responsive {...props} maxWidth={767} />;
const MediumScreen = props => <Responsive {...props} minWidth={768} />;
const LargeScreen = props => <Responsive {...props} minWidth={992} />;
const XLargeScreen = props => <Responsive {...props} minWidth={1200} />;

export {SmallScreen, MediumScreen, LargeScreen, XLargeScreen}