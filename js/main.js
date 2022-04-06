import './map.js';
import { showSendSuccessMsg, showSendError } from './network.js';
import { setUserFormSubmit } from './form.js';

setUserFormSubmit(showSendSuccessMsg, showSendError);
