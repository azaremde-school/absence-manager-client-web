const email = [
  (str) => !!str || 'E-mail ist erforderlich',
  (str) => str === 'admin' || /.+@.+\..+/.test(str) || 'E-mail muss gültig sein',
];

const password = [
  (str) => !!str || 'Passwort ist erforderlich',
  (str) => (str || '').length >= 4 || 'Das Passwort ist zu kurz',
  (str) => (str || '').length <= 16 || 'Das Passwort ist zu lang',
  (str) => (str || '').indexOf(' ') < 0 || 'Leerzeichen sind nicht erlaubt',
];

export { email, password };
