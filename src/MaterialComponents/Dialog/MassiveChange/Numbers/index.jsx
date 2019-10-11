import React, { useState } from 'react';

import MassiveChangeDialog from '..';
import InputField from '../../../../InputField';


function MassiveChangeNumbersDialog({ onYesClicked, warningLabel="Warning threshold", criticalLabel="Critical threshold", ...rest }) {
	const [warning, setWarning] = useState(0);
	const [critical, setCritical] = useState(0);

	const onWarningChanged = ({ target }) => {
		if (target.value <= 100 && target.value >= 0) {
			setWarning(target.value)
		}
	};

	const onCriticalChanged = ({ target }) => {
		if (target.value <= 100 && target.value >= 0) {
			setCritical(target.value)
		}
	};

	return (
		<div>
			<MassiveChangeDialog onYesClicked={()=>{onYesClicked({critical,warning})}} {...rest}>
				<InputField
					type="number"
					label={warningLabel}
					onChange={onWarningChanged}
					name="prompt-input"
					inputSize="big"
					value={warning}
				/>
				<InputField
					type="number"
					label={criticalLabel}
					onChange={onCriticalChanged}
					name="prompt-input"
					inputSize="big"
					value={critical}
				/>
			</MassiveChangeDialog>
		</div>
	);
}

export default MassiveChangeNumbersDialog;
