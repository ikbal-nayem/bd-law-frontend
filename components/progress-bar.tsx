'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const NextNProgressBar = () => {
	return <ProgressBar height='4px' color='#10b981' options={{ showSpinner: true }} shallowRouting />;
};

export default NextNProgressBar;