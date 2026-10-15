import {
  assert,
  assertBanned,
  assertIncludes,
  assertRouteSourceSet,
  countMatches,
  sourceFor,
  routes,
} from "./verify-utils.mjs";

const requiredCopy = {
  index: [
    "יש דברים בחיים הדיגיטליים שלך שקל יותר להגיע אליהם ממה שנדמה לך.",
    "במצב של סכסוך, מישהו עלול להשתמש בהם נגדך.",
  ],
  "why-us": ["למה הקמתי את", "בעשרים שנות עשייה בסייבר", "לפרופיל המקצועי שלי"],
  "private-exposure-assessment": ["בדיקת חשיפה וסיכון דיגיטלי אישי"],
  "what-happens-during-the-visit": ["מה קורה במהלך הביקור"],
  pricing: ["צעד ראשון ברור"],
  "separation-divorce": ["פרידה וגירושין"],
  "business-dispute": ["סכסוך עסקי"],
  "inheritance-clash": ["סכסוך ירושה"],
  "leaving-controlling-relationship": [
    "אם את חוששת שהוא רואה יותר ממה שהוא אמור לראות, אל תמהרי לשנות הכול.",
  ],
  "commercial-spying": ["ריגול מסחרי"],
  "private-investigator": ["חוקר פרטי"],
  "they-know-something": ["הם יודעים משהו שלא היו אמורים לדעת"],
  faq: ["השאלות שאנשים שואלים לפני שהם פונים"],
  "not-it-support": ["זו אינה עזרה במחשב"],
  attorneys: ["לעורכי דין"],
};

assertRouteSourceSet("en");
assertRouteSourceSet("he");

for (const route of routes) {
  const source = sourceFor("he", route);
  const label = `he/${route}`;

  assert(/[\u0590-\u05FF]/.test(source), `${label}: no Hebrew text found`);
  assert(source.length >= 500, `${label}: copy is unexpectedly short`);
  assert(countMatches(source, /<h1(?:\s[^>]*)?>/g) === 1, `${label}: expected exactly one h1`);
  assert(countMatches(source, /<\/h1>/g) === 1, `${label}: h1 closing tag is missing or duplicated`);
  assert(source.includes('class="bidi-ltr"'), `${label}: no isolated LTR product, currency, or platform run`);
  assert(!/<(?:html|body)\b|<!doctype/i.test(source), `${label}: page must not duplicate the shared document shell`);
  assertBanned(/(?:את\/ה|טוזה|מנוף)/, source, label);

  for (const expected of requiredCopy[route]) {
    assertIncludes(source, expected, label);
  }
}

console.log("HE MIRROR COPY VERIFIED");
