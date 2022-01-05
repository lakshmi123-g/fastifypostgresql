import React from 'react'

const Progress_bar = ({ bgcolor, progress, height }) => {

	const Parentdiv = {
		height: 21,
		width: '53%',
		backgroundColor: 'whitesmoke',
		borderRadius: 40,
		margin: 5
	}

	const Childdiv = {
		height: '21px',
		width: `${progress}%`,
		backgroundColor: bgcolor,
		borderRadius: 50,
		textAlign: 'center'
	}

	const progresstext = {
		padding: 80,
		color: 'black',
		fontWeight: 500
	}

	return (
		<div style={Parentdiv}>
			<div style={Childdiv}>
				<span style={progresstext}>{`${progress}%`}</span>
			</div>
		</div>
	)
}

export default Progress_bar;
