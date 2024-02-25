import React from 'react';

import { Tooltip } from 'primereact/tooltip';

import './input-error-message.scss';

const InputErrorMessage = props => {
    const { error, name } = props;
    return(
        <div className="input_error_message">
            <i className={`pi pi-question-circle error_msg_${name}`} data-pr-tooltip={error.message}></i>
            <Tooltip target={`.error_msg_${name}`}/>
        </div>
    )
}

export default InputErrorMessage;