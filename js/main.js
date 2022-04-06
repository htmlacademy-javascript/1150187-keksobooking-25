import { showSendSuccessMsg, showSendError } from './network.js';
import { deactivateForm, setUserFormSubmit } from './form.js';
import { initMap } from './map.js';

deactivateForm();
initMap();
setUserFormSubmit(showSendSuccessMsg, showSendError);
