/* No forms, personal data, payment requests, or network calls. */
const element = id => document.getElementById(id);
function notifyGame(action) {
  if (window.parent !== window) window.parent.postMessage({ simulationAction: action }, '*');
}
function panel(name, step) {
  for (const id of ['confirm', 'payment', 'identity', 'complete']) element(`${id}-panel`).hidden = id !== name;
  for (const id of ['one', 'two', 'three']) element(`step-${id}`).removeAttribute('aria-current');
  if (step) element(`step-${step}`).setAttribute('aria-current', 'step');
  element(`${name}-panel`).focus();
}
element('confirm-reservation').addEventListener('click', () => panel('payment', 'two'));
element('simulate-payment').addEventListener('click', () => {
  notifyGame('pay');
  element('reservation-status').textContent = '仮決済済み（模擬）・本人確認待ち';
  panel('identity', 'three');
});
element('simulate-identity').addEventListener('click', () => {
  notifyGame('identity');
  element('reservation-status').textContent = '確認受付済み（模擬）';
  element('return-chat').textContent = 'チャットへ戻る';
  panel('complete');
});
element('return-chat').addEventListener('click', () => {
  if (window.parent === window) window.location.href = 'index.html';
  else notifyGame('return');
});
