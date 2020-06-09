import { reasons } from "@/util/reasons";
import { normalizeArray } from "@/util/objects";
import extractTranslationList from "@/util/extract-translation-list";

function absenceWindowToAbsence(lessonsChecked, reasonsChecked, excusedChecked, selectedDate, $vuetify) {
  lessonsChecked = normalizeArray(lessonsChecked);
  reasonsChecked = normalizeArray(reasonsChecked);
  excusedChecked = normalizeArray(excusedChecked);

  const reasonsList = extractTranslationList(
    $vuetify,
    "$vuetify.absences",
    reasons
  );

  for (var i = 0; i < reasonsChecked.length; i++) {
    const convertedReason = reasonsList.indexOf(reasonsChecked[i]);
    reasonsChecked[i] = convertedReason === -1 ? 0 : convertedReason;
  }

  const pairs = [];
  const parsed = [];

  if (lessonsChecked.length) {
    const maxLength = lessonsChecked.reduce((a, b) => Math.max(a, b)) + 1;
  
    for (var i = reasonsChecked.length - maxLength; i < maxLength; i++) {
      reasonsChecked.push(0);
    }
  }

  for (var i = 0; i < reasonsChecked.length; i++) {
    if (lessonsChecked.includes(i)) {
      pairs.push({
        lesson: i + 1,
        reason: reasonsChecked[i],
        excused: excusedChecked.includes(i)
      });
    }
  }

  for (var i = 0; i < pairs.length; i++) {
    const date = selectedDate;
    const reason = pairs[i].reason;
    const excused = pairs[i].excused;
    const lessons = pairs
      .filter(pair => pair.reason === reason && pair.excused === excused)
      .map(el => el.lesson);

    if (
      !parsed.find(
        el => el.lessons.reason === reason && el.lessons.excused === excused
      )
    ) {
      parsed.push({
        date,
        lessons: {
          numbers: lessons,
          reason: reason,
          excused
        }
      });
    }
  }

  const absence = {
    items: []
  };

  parsed.forEach(element => {
    absence.date = element.date;

    const items = absence.items.find(
      el => el.reason === element.lessons.reason
    );

    if (!items) {
      absence.items.push({
        reason: element.lessons.reason,
        lessons: element.lessons.numbers.map(el => ({
          n: el,
          excused: element.lessons.excused
        }))
      });
    } else {
      for (var i = 0; i < element.lessons.numbers.length; i++) {
        (items.length ? items : items.lessons).push({
          n: element.lessons.numbers[i],
          excused: element.lessons.excused
        });
      }
    }
  });

  absence.date = selectedDate;

  return absence;
}

export default absenceWindowToAbsence;
