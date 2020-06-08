function extractTranslationList($vuetify, path, keys) {
  var result = [];

  for (var i = 0; i < keys.length; i++) {
    result.push($vuetify.lang.t(`${path}.${keys[i]}`));
  }

  return result;
}

export default extractTranslationList;
